<script>
	import { inModal, round, gameState, wod, gameId } from "$stores/misc.js";
	import Recap from "$components/Modal/Recap.svelte";
	import Pregame from "$components/Modal/Pregame.svelte";
	import PregameWOD from "$components/Modal/PregameWOD.svelte";
	import PostgameWOD from "$components/Modal/PostgameWOD.svelte";
	import Feedback from "$components/Modal/Feedback.svelte";
	import { update } from "$utils/supabase.js";

	export let loaded;

	let wodReady;

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
	{/if}
{/if}

{#if $gameState === "mid"}
	<div class="mid">
		<button on:click={onPlay}> next round </button>
	</div>
{/if}

<style>
	.mid {
		margin-top: 16px;
		text-align: center;
	}

	button {
		font-size: var(--36px);
		width: 7.5em;
	}
</style>
