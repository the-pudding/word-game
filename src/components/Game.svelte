<script>
	import { onMount } from "svelte";
	import WodBot from "$components/WodBot.svelte";
	import Play from "$components/Play.svelte";
	import Modal from "$components/Modal.svelte";
	import {
		gameId,
		gameState,
		inModal,
		wod,
		wodId,
		round
	} from "$stores/misc.js";
	import loadClues from "$utils/loadClues.js";
	import loadAnswers from "$utils/loadAnswers.js";
	import loadJson from "$utils/loadJson.js";

	let clues;
	let answers;
	let loaded;

	const getId = async () => {
		if ($wod) return $wodId;

		const timestamp = Date.now();
		const url = `https://pudding.cool/games/words-against-strangers-data/games.json?version=${timestamp}`;
		const { updated, games } = await loadJson(url);
		console.log("updated:", updated);
		const match = games.find((d) => d.live);
		if (match) return match.id;
		return undefined;
	};

	$: readyToPlay = loaded && clues && answers && $round >= 0;
	$: playVisible = $gameState === "mid" && !$inModal;
	$: modalVisible = $inModal || ["pre", "post"].includes($gameState);

	onMount(async () => {
		$gameId = await getId();
		if ($gameId) {
			const clueData = await loadClues($gameId);
			clues = clueData.map((d) => d.clue);
			answers = await loadAnswers(clueData.map((d) => d.clueId));
		}
		loaded = true;
	});
</script>

{#if $gameId}
	<WodBot />
{/if}

{#if readyToPlay && $gameState !== "post"}
	<section id="play">
		<Play {clues} {answers} />
	</section>
{/if}

<section id="modal" class:visible={modalVisible}>
	<Modal {loaded} />
</section>

<style>
	#modal {
		visibility: hidden;
	}
	#modal.visible {
		visibility: visible;
	}
</style>
