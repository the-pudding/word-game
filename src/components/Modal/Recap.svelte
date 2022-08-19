<script>
	import { gameState, totalScore, round, wod, wodInfo } from "$stores/misc.js";
	import Highlights from "$components/Modal/Highlights.svelte";
	import Title from "$components/Chunk/RecapTitle.svelte";
	import Plug from "$components/Chunk/RecapPlug.svelte";

	$: userLead = $totalScore.user > $totalScore.wod;
	$: wodLead = $totalScore.user < $totalScore.wod;
	$: tied = $totalScore.user === $totalScore.wod;
	$: winner = wodLead ? "wod" : "user";

	const getPostTitle = () => {
		const title = tied
			? [`You and ${$wodInfo?.name}`, "tied!"]
			: userLead
			? ["You beat", `${$wodInfo?.name}!`]
			: [`${$wodInfo?.name}`, "beat you!"];

		return title;
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
		<Title lines={title} {winner} />
	{/if}

	{#if $gameState === "post" && !$wod && winner === "wod" && $wodInfo.plug}
		<Plug text="this is a 48 character sentence that will show." {winner} />
	{/if}

	<Highlights />
</div>

<style>
	div {
		text-align: center;
	}
</style>
