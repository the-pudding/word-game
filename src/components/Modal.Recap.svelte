<script>
	import { gameState, totalScore, round, wod, wodInfo } from "$stores/misc.js";
	import Highlights from "$components/Modal.Highlights.svelte";
	import Chunk from "$components/helpers/Chunk.svelte";

	$: userLead = $totalScore.user > $totalScore.wod;
	$: wodLead = $totalScore.user < $totalScore.wod;
	$: tied = $totalScore.user === $totalScore.wod;

	const getPostTitle = () => {
		const title = tied
			? `You tied ${$wodInfo?.name}!`
			: userLead
			? `You beat ${$wodInfo?.name}!`
			: `${$wodInfo?.name} wins!`;

		return `${title}`;
	};

	const getMidTitle = () => {
		const title = tied
			? `You and ${$wodInfo?.name} are tied!`
			: userLead
			? `You are leading ${$wodInfo?.name}.`
			: `${$wodInfo?.name} is in the lead.`;

		return title;
	};

	$: title = $gameState === "post" ? getPostTitle() : getMidTitle();
</script>

<div>
	{#if !$wod}
		<h2><Chunk text={title} max="15" className="combo-user" /></h2>
	{/if}

	{#if $gameState === "post" && !$wod && wodLead}
		<Chunk text={$wodInfo?.plug} max="15" className="combo-user" />
	{/if}

	<Highlights />
</div>

<style>
	h2 {
		font-size: 2em;
		text-align: center;
		max-width: 23em;
		margin: 1rem auto;
	}
	div {
		text-align: center;
	}
	h3 {
		font-size: 2em;
	}
</style>
