<script>
	import { dev } from "$app/env";
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
			text: "what is your name?",
			detail: "examples: <em>jane doe</em> OR <em>j. doe</em> OR <em>jane</em>",
			required: true
		},
		{
			id: "location",
			limit: 12,
			text: "where are from/living?",
			detail: "optional",
			required: false
		},
		{
			id: "pronoun",
			text: "what pronouns do you use?",
			required: true
		},
		{
			id: "plug",
			limit: 48,
			text: "what would you like to plug (about yourself, something, etc.) at the end of the game?",
			detail:
				"examples: <em>follow me on twitter @wordsagainststrangers</em> OR <em>I hope you have a great day!</em> OR <em>Let's go [sports team]!!",
			required: false
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
		if (dev) return;
		try {
			const row = { game_id: $wodId };
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

<div class="outer">
	<div class="intro">
		<h2>{wodReady ? "let's play!" : "welcome, stranger!"}</h2>
	</div>

	{#if !loaded}
		<p>loading...</p>
	{:else if loaded && !wodReady}
		<p>
			let's play a word game. before we start, please tell us about yourself.
		</p>
		<p>
			<mark class="combo-mark">note:</mark> anything you submit below may appear
			for the rest of the internet to see. we may lightly edit answers for brevity.
		</p>

		{#if error}
			<p>Error</p>
		{:else}
			<form on:submit|preventDefault={onSubmit}>
				{#each defaultQuestions as { id, text, detail, type, limit, required }, i}
					<div>
						<label class="combo-wod" for="question-{id}"
							>{text}
							{#if limit} ({limit} char. limit){/if}</label
						>
						{#if detail}<p class="detail">
								{@html detail}
							</p>{/if}
						{#if id === "pronoun"}
							<fieldset id="question-{id}">
								<input
									id="pronoun-1"
									type="radio"
									name="pronoun"
									value="they/them"
									required
									bind:group={defaultQuestions[i].answer}
								/>
								<label for="pronoun-1">they/them</label>
								<input
									id="pronoun-2"
									type="radio"
									name="pronoun"
									value="she/her"
									required
									bind:group={defaultQuestions[i].answer}
								/>
								<label for="pronoun-2">she/her</label>
								<input
									id="pronoun-3"
									type="radio"
									name="pronoun"
									value="he/him"
									required
									bind:group={defaultQuestions[i].answer}
								/>
								<label for="pronoun-3">he/him</label>
							</fieldset>
						{:else}
							<input
								{required}
								bind:value={defaultQuestions[i].answer}
								id="question-{id}"
								placeholder={id}
								maxlength={limit}
								data-limit={limit}
							/>
						{/if}
					</div>
				{/each}

				<div>
					<label class="combo-wod" for="question-bio"
						>{randomQuestion} (100 char. limit)</label
					>
					<p>
						<button class="random" type="button" on:click={getRandomQuestion}
							>give me a different question</button
						>
					</p>
					<p>
						<input
							required={false}
							bind:value={randomAnswer}
							id="question-bio"
							maxlength="100"
							placeholder="answer here"
						/>
					</p>
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
</div>

<style>
	.outer {
		padding: 0 8px;
	}

	.intro {
		margin-top: 32px;
	}

	h2,
	p {
		margin: 16px auto;
		line-height: 1.4;
	}

	label {
		display: inline-block;
		padding: 8px;
		margin-bottom: 8px;
	}

	p.detail {
		color: var(--color-default-fg);
		font-weight: 400;
		margin-top: 0;
	}

	form div,
	.cta div {
		margin-bottom: 48px;
	}

	form {
		padding-bottom: 64px;
	}

	input {
		width: 100%;
		position: relative;
	}

	input[type="radio"] {
		width: auto;
	}

	.play {
		font-size: var(--48px);
	}
</style>
