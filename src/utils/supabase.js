import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const signin = async ({ email, password }) => {
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
}