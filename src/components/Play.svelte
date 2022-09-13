<script>
	import Guesses from "$components/Play/Guesses.svelte";
	import Input from "$components/Play/Input.svelte";
	import InputKeyboard from "$components/Play/InputKeyboard.svelte";
	import Clock from "$components/Play/Clock.svelte";
	import Clue from "$components/Play/Clue.svelte";
	import Invalid from "$components/Play/Invalid.svelte";
	import Countdown from "$components/helpers/Countdown.svelte";
	import {
		guesses,
		lemmasPlayed,
		round,
		possibleAnswers,
		active,
		gameId,
		totalScore,
		gameState,
		wordDuration
	} from "$stores/misc.js";
	import lemmaExists from "$utils/lemmaExists.js";

	import { elapsed } from "$stores/timer.js";
	import { insert } from "$utils/supabase.js";

	export let clues;
	export let answers;

	let showStartCountdown = false;
	let showEndCountdown = false;
	let keyboardValue = "";
	let input;
	let release = false;

	const lookupLemmas = (text) => {
		const match = roundData.find((d) => d.word === text);
		return match ? match.lemmas : "";
	};

	const isWordlist = (text) => !validWords.includes(text);

	const isTaken = ({ text, lemmas }) => {
		const corpus = $lemmasPlayed;
		return lemmaExists({ lemmas, corpus });
	};

	const isDuplicate = ({ text, lemmas }) => {
		const corpus = $guesses.user[$round].map((d) => d.lemmas);
		return lemmaExists({ lemmas, corpus });
	};

	const isNotAlpha = (text) => new RegExp(/([^a-z])/, "g").test(text);

	const validate = ({ text, lemmas }) => {
		let valid = true;
		let reason;
		if (text.length < 4) {
			valid = false;
			reason = 1;
		} else if (isNotAlpha(text)) {
			valid = false;
			reason = 2;
		} else if (isWordlist(text)) {
			valid = false;
			reason = 3;
		} else if (isDuplicate({ text, lemmas })) {
			valid = false;
			reason = 4;
		} else if (isTaken({ text, lemmas })) {
			valid = false;
			reason = 0;
		}

		return { valid, reason };
	};

	const getPoints = ({ text, timestamp }) => {
		const { points } = roundData.find((d) => d.word === text);
		return +points;
	};

	const onSubmit = async ({ detail }) => {
		const text = detail;
		const lemmas = lookupLemmas(text);
		const { valid, reason } = validate({ text, lemmas });
		const timestamp = $elapsed;
		const points = valid ? getPoints({ text, timestamp }) : undefined;
		const guess = {
			text,
			lemmas,
			points,
			timestamp,
			round: $round,
			valid,
			reason
		};
		$guesses.user[$round] = [...$guesses.user[$round], guess];

		const data = { game_id: $gameId, round: $round, text };
		insert({ table: "wordgame_user-answers", data });
	};

	const roundChange = () => {
		showStartCountdown = true;
		release = false;
	};

	const startRound = () => {
		$active = true;
		keyboardValue = "";
		showStartCountdown = false;
		showEndCountdown = false;
	};

	const onRoundEnd = () => {
		const margin = $totalScore.user - $totalScore.wod;
		const data = { game_id: $gameId, round: $round, margin };
		insert({ table: "wordgame_user-results", data });
	};

	$: currentClue = clues[$round];
	$: roundData = answers[$round];
	$: $possibleAnswers = roundData;
	$: validWords = roundData.map((d) => d.word);
	$: $round, roundChange();
	$: if (!$active && input) input.reset();
	$: if ($gameState === "post") $wordDuration = 0;
</script>

<div>
	<Clue clue={currentClue} {release} />
	<Input on:submit={onSubmit} value={keyboardValue} bind:this={input} />
	{#if showStartCountdown}
		<Countdown
			--color="var(--color-fg-light)"
			text="begin!"
			on:end={startRound}
			on:beforeend={() => (release = true)}
		/>
	{/if}
	{#if showEndCountdown}
		<Countdown
			--color="var(--color-mark-bg)"
			on:end={() => (showEndCountdown = false)}
		/>
	{/if}
	<Invalid />
	<Guesses />
	<Clock on:beforeend={() => (showEndCountdown = true)} on:end={onRoundEnd} />
	<InputKeyboard on:submit={onSubmit} bind:value={keyboardValue} />
</div>

<style>
	div {
		position: relative;
		width: 100%;
		height: 100%;
		max-height: 800px;
		display: flex;
		flex-direction: column;
		margin: 0 auto;
	}
</style>
