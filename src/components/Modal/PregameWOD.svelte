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

	const defaultQuestions = [
		{
			id: "name",
			limit: 12,
			text: "What is your name?",
			detail: "e.g., Jane Doe or J. Doe or Jane"
		},
		{
			id: "location",
			limit: 12,
			text: "Where are playing from?",
			detail: ""
		},
		{
			id: "pronoun",
			text: "What are your preferred pronouns?"
		},
		{
			id: "plug",
			limit: 48,
			text: "What would you like to plug (about yourself, something, etc) at the end of the game?",
			detail:
				"'Follow me on Twitter @wordsagainststrangers' or 'Have a great day!'"
		}
	];

	let questions = [];
	let error;
	let randomQuestion;
	let randomAnswer;

	const getRandomQuestion = () => {
		const r = Math.floor(Math.random() * questions.length);
		randomQuestion = questions[r].question;
	};

	const onSubmit = async () => {
		try {
			const row = { gameId: $wodId };
			const allQuestions = [
				...defaultQuestions,
				{ id: "bio", answer: formattedRandomAnswer }
			];
			allQuestions.forEach(({ id, answer }) => {
				row[id] = answer;
			});

			const data = [row];

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

	$: formattedRandomAnswer = `Q: ${randomQuestion}\nA: ${randomAnswer}`;
	onMount(async () => {
		try {
			const hasInfo = await getGameColumn({
				gameId: $wodId,
				column: "wod_info"
			});
			wodReady = hasInfo;
			if (!hasInfo) {
				questions = await getQuestions($wodId);
				getRandomQuestion();
			}
		} catch (err) {
			error = true;
		}
	});
</script>

<h2>welcome, stranger!</h2>
<p>let's play a word game.</p>

{#if !wodReady}
	<p>
		tell us about yourself. <strong
			>note: anything you submit below may appear for the rest of the internet
			to see. we may lightly edit answers for brevity.</strong
		>
	</p>

	{#if error}
		<p>Error</p>
	{:else}
		<form on:submit|preventDefault={onSubmit}>
			{#each defaultQuestions as { id, text, detail, type, limit }, i}
				<div>
					<label for="question-{id}">{text}</label>
					<p>{detail}</p>
					{#if id === "pronoun"}
						<fieldset id="question-{id}">
							<input
								id="pronoun-1"
								type="radio"
								name="pronoun"
								value="they/them"
								bind:group={defaultQuestions[i].answer}
							/>
							<label for="pronoun-1">they/them</label>
							<input
								id="pronoun-2"
								type="radio"
								name="pronoun"
								value="she/her"
								bind:group={defaultQuestions[i].answer}
							/>
							<label for="pronoun-2">she/her</label>
							<input
								id="pronoun-3"
								type="radio"
								name="pronoun"
								value="he/him"
								bind:group={defaultQuestions[i].answer}
							/>
							<label for="pronoun-3">he/him</label>
						</fieldset>
					{:else}
						<input
							required={true}
							bind:value={defaultQuestions[i].answer}
							id="question-{id}"
							placeholder={id}
							maxlength={limit}
						/>
					{/if}
				</div>
			{/each}

			<div>
				<button type="button" on:click={getRandomQuestion}
					>give me a different question</button
				>
				<label for="question-bio">{randomQuestion}</label>

				<input
					required={true}
					bind:value={randomAnswer}
					id="question-bio"
					maxlength="100"
					placeholder="..."
				/>
			</div>

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
