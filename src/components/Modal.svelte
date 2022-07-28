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
	import Countdown from "$components/helpers/Countdown.svelte";
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
		console.log("begin");
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
		<Pregame {loaded} {showCountdown} on:play={onPlay} on:start={startRound} />
	{/if}
{/if}

{#if $gameState !== "pre"}
	<Recap />
{/if}
{#if $gameState === "post"}
	{#if $wod}
		<PostgameWOD />
	{/if}
{/if}

{#if $gameState === "mid"}
	<div>
		<button on:click={onPlay}>
			{#if showCountdown}
				<Countdown text="Begin!" on:end={startRound} />
			{:else}
				next round
			{/if}
		</button>
	</div>
{/if}
