<script>
	import { onMount } from "svelte";
	import { insert, update } from "$utils/supabase.js";
	import { guesses, wodId } from "$stores/misc.js";

	let success;
	let error;

	$: message = success
		? "game successfully submitted. you'll receive an email if your game is approved."
		: "there was an error submitting your game. please contact the admin: words.against.strangers@pudding.cool.";

	onMount(async () => {
		try {
			const flat = [].concat(...$guesses.user);
			const data = flat
				.filter((d) => d.valid)
				.map((d) => ({
					game_id: $wodId,
					round: d.round,
					text: d.text,
					timestamp: d.timestamp,
					points: d.points,
					lemmas: d.lemmas
				}));
			const response = await insert({ table: "wordgame_wod-answers", data });
			if (response) {
				success = true;
				await update({
					table: "wordgame_games",
					column: "wod_played",
					value: true,
					gameId: $wodId
				});
			} else {
				success = false;
			}
		} catch (err) {
			success = false;
			error = err?.message;
		}
	});
</script>

<h3>thanks for playing!</h3>

{#if success === undefined}
	<p>Submitting responses...</p>
{:else if success === false}
	<p>
		Oops there was an error ({error}). Please let us know,
		words.against.strangers@pudding.cool.
	</p>
{:else}
	<p>{message}</p>
{/if}

<style>
	h3,
	p {
		text-align: center;
	}
</style>
