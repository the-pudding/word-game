<script>
	import {
		gameState,
		totalScore,
		round,
		wod,
		wodInfo,
		inModal
	} from "$stores/misc.js";
	import Highlights from "$components/Modal/Highlights.svelte";
	import Title from "$components/Chunk/RecapTitle.svelte";
	import Plug from "$components/Chunk/RecapPlug.svelte";
	import Goodbye from "$components/Chunk/RecapGoodbye.svelte";

	let title;

	const getPostTitle = () => {
		title = tied
			? [`You and ${$wodInfo?.name}`, "tied!"]
			: userLead
			? ["You beat", `${$wodInfo?.name}!`]
			: [`${$wodInfo?.name}`, "beat you!"];
	};

	const getMidTitle = () => {
		title = tied
			? [`you and ${$wodInfo?.name}`, "are tied"]
			: userLead
			? ["you are ahead", `of ${$wodInfo?.name}`]
			: [`${$wodInfo?.name} is`, "in the lead"];
	};

	const updateTitle = () => {
		if ($gameState === "post") getPostTitle();
		else getMidTitle();
	};

	$: userLead = $totalScore.user > $totalScore.wod;
	$: wodLead = $totalScore.user < $totalScore.wod;
	$: tied = $totalScore.user === $totalScore.wod;
	$: winner = wodLead ? "wod" : "user";
	$: $gameState, $inModal, updateTitle();
</script>

<div>
	{#if !$wod}
		<Title lines={title} {winner} />
	{/if}

	{#if $gameState === "post" && !$wod && winner === "wod" && $wodInfo.plug}
		<Plug text={$wodInfo?.plug} {winner} />
	{/if}

	<Highlights />

	{#if $gameState === "post" && !$wod}
		<Goodbye
			text="thanks for playing. come back tomorrow for a new stranger!"
		/>
	{/if}
</div>

<style>
	div {
		text-align: center;
	}
</style>
