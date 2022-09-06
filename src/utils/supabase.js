import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// public
export const signIn = async ({ email, password }) => {
	const response = await supabase.auth.signIn({
		email,
		password
	});
	if (response.error) {
		console.log(response.error);
		throw new Error("signIn failed");
	}
	else if (response.user) return true;
	else throw new Error("no user found");
};

export const signOut = async () => {
	const response = await supabase.auth.signOut();
	if (response.error) {
		console.log(response.error);
		throw new Error("signOut failed");
	}
	else return true;
};

export const getQuestions = async (gameId) => {
	const response = await supabase
		.from("wordgame_wod-questions");

	if (response.error) {
		console.log(response.error);
		throw new Error("getQuestions failed");
	} else if (response.data.length) {
		return response.data;
	}
	throw new Error("no questions matching that game id");
}

export const getGameColumn = async ({ gameId, column }) => {
	const response = await supabase
		.from("wordgame_games")
		.select(column)
		.eq("game_id", gameId);

	if (response.error) {
		console.log(response.error);
		throw new Error("getGameColumn failed");
	}
	else if (response.data.length) return response.data[0][column];
	else throw new Error("no games matching this id");
};

export const update = async ({ table, column, value, gameId }) => {
	const response = await supabase
		.from(table)
		.update({ [column]: value })
		.eq("game_id", gameId);

	if (response.error) {
		console.log(response.error);
		throw new Error("update failed");
	}
	else if (response.data) return response.data;
	return undefined;
}

export const insert = async ({ table, data }) => {
	const opts = { returning: "minimal" };
	const response = await supabase.from(table).insert(data, opts);
	if (response.error) {
		console.log(response.error);
		throw new Error("insert failed");
	}
	return true;
};