<script>
	import {
		ROUNDS,
		inModal,
		round,
		gameState,
		wod,
		gameId
	} from "$stores/misc.js";
	import Recap from "$components/modal/Recap.svelte";
	import Pregame from "$components/modal/Pregame.svelte";
	import PregameWOD from "$components/modal/PregameWOD.svelte";
	import PostgameWOD from "$components/modal/PostgameWOD.svelte";
	import PostgameTower from "$components/modal/PostgameTower.svelte";
	import Feedback from "$components/modal/Feedback.svelte";
	import { update } from "$utils/supabase.js";

	export let loaded;

	let wodReady;
	let buttonNext;
	let disabled;

	const onPlay = async () => {
		if ($wod && $gameState === "pre") {
			await update({
				table: "wordgame_games",
				column: "wod_started",
				value: true,
				gameId: $gameId
			});
		} else if ($gameState === "mid") $inModal = false;
		$round += 1;
	};

	$: hideButton = $wod && $gameState === "pre" && !wodReady;
	$: if ($gameState === "mid" && $inModal) {
		disabled = true;
		setTimeout(() => {
			disabled = false;
		}, 500);
	}
</script>

{#if $gameState === "pre"}
	{#if $wod}
		<PregameWOD bind:wodReady {loaded} {hideButton} on:play={onPlay} />
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
		<PostgameTower />
	{/if}
{/if}

{#if $gameState === "mid"}
	<div class="mid">
		<button {disabled} bind:this={buttonNext} on:click={onPlay}
			>next round</button
		>
		<p>round {$round + 2} of {ROUNDS}</p>
	</div>
{/if}

<style>
	.mid {
		margin-top: 16px;
		text-align: center;
	}

	button {
		font-size: var(--36px);
	}

	p {
		margin-top: 8px;
		font-size: var(--14px);
		color: var(--color-fg-light);
	}
</style>
