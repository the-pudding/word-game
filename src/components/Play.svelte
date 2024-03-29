<script>
	import { dev } from "$app/env";
	import Guesses from "$components/play/Guesses.svelte";
	import Input from "$components/play/Input.svelte";
	import InputKeyboard from "$components/play/InputKeyboard.svelte";
	import Clock from "$components/play/Clock.svelte";
	import Clue from "$components/play/Clue.svelte";
	import Invalid from "$components/play/Invalid.svelte";
	import Countdown from "$components/helpers/Countdown.svelte";
	import {
		ended,
		guesses,
		lemmasPlayed,
		round,
		ROUNDS,
		possibleAnswers,
		active,
		gameId,
		gameNumber,
		totalScore,
		gameState,
		wordDuration,
		wod
	} from "$stores/misc.js";
	import lemmaExists from "$utils/lemmaExists.js";

	import { elapsed } from "$stores/timer.js";
	import { insert } from "$utils/supabase.js";
	import storage from "$utils/localStorage.js";

	export let clues;
	export let answers;

	let showStartCountdown = false;
	let showEndCountdown = false;
	let keyboardValue = "";
	let input;
	let release = false;
	let tracked = [];

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

		// if (!$wod && !dev && !$ended) {
		// 	const data = { game_id: $gameId, round: $round, text };
		// 	insert({ table: "wordgame_user-answers", data });
		// }
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

	const getRecords = () => {
		const records = storage.get("pudding_words_against_strangers") || [];
		return records;
	};

	const isReplay = (records = []) => {
		const played = !!records.find((d) => d.gameId === $gameId);
		return played;
	};

	const onRoundEnd = () => {
		if (!$wod && !dev) {
			const margin = $totalScore.user - $totalScore.wod;
			const records = getRecords();
			const replay = isReplay(records);
			const data = { game_id: $gameId, round: $round, margin, replay };

			if (!tracked[$round]) {
				if (!$ended) insert({ table: "wordgame_user-results", data });
				tracked[$round] = true;
			}

			if ($round === ROUNDS - 1) {
				if (!replay) {
					records.push({ gameId: $gameId, gameNumber: $gameNumber, margin });
					storage.set("pudding_words_against_strangers", records);
				}
			}
		}
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
