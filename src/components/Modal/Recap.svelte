<script>
	import { Confetti } from "svelte-confetti";
	import {
		gameState,
		totalScore,
		round,
		wod,
		wodInfo,
		inModal
	} from "$stores/misc.js";
	import History from "$components/History.svelte";
	import Highlights from "$components/modal/Highlights.svelte";
	import Title from "$components/chunk/RecapTitle.svelte";
	import Plug from "$components/chunk/RecapPlug.svelte";
	import Goodbye from "$components/chunk/RecapGoodbye.svelte";

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
				x={[-3, 3]}
				y={[0, 0]}
				delay={[0, 3000]}
				duration="3000"
				amount="500"
				fallDistance="100vh"
				colorArray={[
					"#f8e34d",
					"#dfcc45",
					"#c6b63e",
					"#76a5d1",
					"#6a95bc",
					"#5e84a7",
					"#f1553b",
					"#d94d35",
					"#c1442f"
				]}
			/>
		</div>
	{/if}

	<Highlights />

	{#if $gameState === "post" && !$wod}
		<p class="signup">
			<a
				role="button"
				href="https://www.getrevue.co/profile/wordsagainststrangers/"
				target="_blank">Sign up to be the next stranger</a
			>
		</p>
		<History />
	{/if}
</div>

<style>
	.recap {
		text-align: center;
	}

	.confetti {
		position: absolute;
		display: flex;
		justify-content: center;
		top: calc(var(--header-height) * -1 - 32px);
		left: 50%;
		transform: translate(-50%, 0);
		height: 100vh;
		width: 100%;
		overflow: hidden;
		pointer-events: none;
	}

	p {
		margin: 16px auto;
	}

	p.signup {
		margin: 32px auto 48px auto;
	}
</style>
