<script>
	import { onMount, getContext, createEventDispatcher } from "svelte";
	import { overlay, wodId } from "$stores/misc.js";
	import {
		getGameColumn,
		getQuestions,
		insert,
		update
	} from "$utils/supabase.js";

	export let wodReady;
	export let loaded;
	export let hideButton;

	const dispatch = createEventDispatcher();

	let questions = [];
	let error;

	const onSubmit = async () => {
		try {
			const data = questions.map((d) => ({
				game_id: $wodId,
				question_id: d.id,
				answer: d.answer
			}));
			await insert({ table: "wordgame_wod-info", data });
			await update({
				table: "wordgame_games",
				column: "wod_info",
				value: true,
				gameId: $wodId
			});
			wodReady = true;
		} catch (err) {
			// TODO visual message
			console.log(err);
		}
	};

	onMount(async () => {
		try {
			const hasInfo = await getGameColumn({
				gameId: $wodId,
				column: "wod_info"
			});
			wodReady = hasInfo;
			if (!hasInfo) questions = await getQuestions($wodId);
		} catch (err) {
			error = true;
		}
	});
</script>

<h2>Welcome, WOD!</h2>
<p>Let's play a word game!</p>

{#if !wodReady}
	<p>Tell us about yourself:</p>

	{#if error}
		<p>Error</p>
	{:else}
		<form on:submit|preventDefault={onSubmit}>
			{#each questions as { id, question, category }, i}
				{@const required = category === "standard"}
				<div>
					<label for="question-{id}">{question}</label>
					<input
						{required}
						bind:value={questions[i].answer}
						id="question-{id}"
						placeholder=""
					/>
				</div>
			{/each}
			<button type="submit">Submit</button>
		</form>
	{/if}
{:else if loaded && !hideButton}
	<div class="cta">
		<div class="rules">
			<button
				on:click={() => {
					$overlay = "rules";
				}}>How to Play</button
			>
		</div>

		<div class="play">
			<button on:click={() => dispatch("play")}>play</button>
		</div>
	</div>
{/if}

<style>
	h2 {
		font-size: 2em;
		text-align: center;
		max-width: 23em;
		margin: 1rem auto;
	}
</style>
