import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// private
const getQuestionText = async (questionIds) => {
	const response = await supabase
		.from("wod_questions")
		.select("question,id,category")
		.in("id", questionIds)

	if (response.error) {
		console.log(response.error);
		throw new Error("error getting question text");
	}
	else if (response.data) return response.data;
};

// public
export const signIn = async ({ email, password }) => {
	const response = await supabase.auth.signIn({
		email,
		password
	});
	if (response.error) {
		console.log(response.error);
		throw new Error("error signing into supabase");
	}
	else if (response.user) return true;
	else throw new Error("error signing into supabase");
};

export const signOut = async () => {
	const response = await supabase.auth.signOut();
	if (response.error) {
		console.log(response.error);
		throw new Error("error signing out of supabase");
	}
	else return true;
};

export const getQuestions = async (gameId) => {
	const response = await supabase
		.from("games")
		.select("question_ids")
		.eq("id", gameId);

	if (response.error) {
		console.log(response.error);
		throw new Error("error getting from supabase");
	} else if (response.data) {
		try {
			const questionIds = response.data[0].question_ids.split("|").map(d => +d);
			const questions = await getQuestionText(questionIds);
			return questions;
		} catch (err) {
			return err;
		}
	}
	throw new Error("silent error getting questions from supabase");
}

export const getWodStarted = async (gameId) => {
	const response = await supabase
		.from("games")
		.select("wod_started")
		.eq("id", gameId);

	if (response.error) {
		console.log(response.error);
		throw new Error("error getting game from supabase");
	}
	else if (response.data) return response.data[0].wod_started;
	else throw new Error("error getting game from supabase");
};

export const update = async ({ table, column, value, id }) => {
	const response = await supabase
		.from(table)
		.update({ [column]: value })
		.eq("id", id);

	if (response.error) {
		console.log(response.error);
		throw new Error("error updating game row in supabase");
	}
	else if (response.data) return response.data;
	return undefined;
}

export const upsert = async ({ table, data }) => {
	const response = await supabase.from(table).upsert(data);
	if (response.error) {
		console.log(response.error);
		throw new Error("error inserting into supabase");
	}
	else if (response.data) return response.data;
	return undefined;
};