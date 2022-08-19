<script>
	import { gameState, totalScore, round, wod, wodInfo } from "$stores/misc.js";
	import Highlights from "$components/Modal/Highlights.svelte";
	import Title from "$components/Chunk/RecapTitle.svelte";
	import Plug from "$components/Chunk/RecapPlug.svelte";

	$: userLead = $totalScore.user > $totalScore.wod;
	$: wodLead = $totalScore.user < $totalScore.wod;
	$: tied = $totalScore.user === $totalScore.wod;

	const getPostTitle = () => {
		const title = tied
			? [`You and ${$wodInfo?.name}`, "tied!"]
			: userLead
			? ["You beat", `${$wodInfo?.name}!`]
			: [`${$wodInfo?.name}`, "beat you!"];

		return `${title}`;
	};

	const getMidTitle = () => {
		const title = tied
			? [`you and ${$wodInfo?.name}`, "are tied"]
			: userLead
			? ["you are ahead", `of ${$wodInfo?.name}`]
			: [`${$wodInfo?.name} is`, "in the lead"];

		return title;
	};

	$: title = $gameState === "post" ? getPostTitle() : getMidTitle();
</script>

<div>
	{#if !$wod}
		<Title lines={title} />
	{/if}

	{#if $gameState === "post" && !$wod && wodLead && $wodInfo.plug}
		<Plug text={$wodInfo.plug} />
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
