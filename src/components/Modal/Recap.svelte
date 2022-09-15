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
	import { Confetti } from "svelte-confetti";

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
	$: showPlug =
		$gameState === "post" && !$wod && winner === "wod" && $wodInfo.plug;
	$: showConfetti = $gameState === "post" && !$wod && winner === "user";
</script>

<div class="recap">
	{#if $wod}
		<Title lines={[`end of round ${$round + 1}`]} {winner} />
	{:else}
		<Title lines={title} {winner} />
	{/if}

	{#if showPlug}
		<Plug text={$wodInfo?.plug} {winner} />
	{:else if showConfetti}
		<div class="confetti">
			<Confetti
				x={[-5, 5]}
				y={[0, 0.1]}
				delay={[500, 2000]}
				duration="5000"
				amount="400"
				fallDistance="100vh"
			/>
		</div>
	{/if}

	<Highlights />

	{#if $gameState === "post" && !$wod}
		<Goodbye
			text="thanks for playing. come back tomorrow for a new stranger!"
		/>
		<p>or</p>
		<a
			role="button"
			href="https://www.getrevue.co/profile/wordsagainststrangers/"
			target="_blank">Sign up to be the stranger</a
		>
	{/if}
</div>

<style>
	.recap {
		text-align: center;
	}

	.confetti {
		position: fixed;
		top: -50px;
		left: 0;
		height: 100vh;
		width: 100%;
		display: flex;
		justify-content: center;
		overflow: hidden;
		pointer-events: none;
	}

	p {
		margin: 16px auto;
	}
</style>
