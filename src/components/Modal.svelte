<script>
	import {
		active,
		round,
		roundScore,
		gameState,
		totalScore,
		wod,
		gameId
	} from "$stores/misc.js";
	import Countdown from "$components/Modal.Countdown.svelte";
	import Recap from "$components/Modal.Recap.svelte";
	import Pregame from "$components/Modal.Pregame.svelte";
	import PregameWOD from "$components/Modal.PregameWOD.svelte";
	import PostgameWOD from "$components/Modal.PostgameWOD.svelte";
	import Feedback from "$components/Modal.Feedback.svelte";
	import { update } from "$utils/supabase.js";

	export let loaded;

	let showCountdown = false;
	let wodReady;

	const onPlay = async () => {
		if ($wod && $gameState === "pre")
			await update({
				table: "wordgame_games",
				column: "wod_started",
				value: true,
				gameId: $gameId
			});
		showCountdown = true;
	};

	const startRound = () => {
		$active = true;
		$round += 1;
		showCountdown = false;
	};

	$: hideButton = $wod && $gameState === "pre" && !wodReady;
</script>

{#if $gameState === "pre"}
	{#if $wod}
		<PregameWOD bind:wodReady {loaded} {hideButton} />
	{:else}
		<Pregame {loaded} on:play={onPlay} />
	{/if}
{/if}

{#if $gameState !== "pre"}
	<Recap />
{/if}
{#if $gameState === "post"}
	{#if $wod}
		<PostgameWOD />
	{:else}
		<!-- <Postgame /> -->
		<Feedback />
	{/if}
{/if}

<!-- button to start round -->
{#if $gameState !== "pre"}
	<p>
		<button on:click={onPlay}>Next Round</button>
	</p>
{/if}

<!-- countdown timer -->
{#if showCountdown}
	<Countdown on:end={startRound} />
{/if}
