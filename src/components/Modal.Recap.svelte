<script>
	import { gameState, totalScore, round, wod, wodInfo } from "$stores/misc.js";
	import Highlights from "$components/Modal.Highlights.svelte";
	import Chunk from "$components/helpers/Chunk.svelte";

	const wodReactions = {
		ahead: [
			"Live look at her: 🤪.",
			"She says this is almost as good as a day with boba.",
			"She's really channeling her inner Jessie O'Connor.",
			"Nice try. Follow me on Twitter @mich_mcghee."
		],
		behind: [
			`Live look at ${$wodInfo.name}: 😭.`,
			`${$wodInfo.name} says this is almost as bad as a day without boba.`,
			`${$wodInfo.name} will try to channel her inner Jessie O'Connor this next round.`,
			"Ugh. Rematch?"
		]
	};

	$: userLead = $totalScore.user > $totalScore.wod;
	$: wodLead = $totalScore.user < $totalScore.wod;
	$: tied = $totalScore.user === $totalScore.wod;

	const getPostTitle = () => {
		const a = tied ? "Tie!" : userLead ? "You win!" : "You lose!";
		const b =
			userLead || tied
				? wodReactions.behind[$round]
				: wodReactions.ahead[$round];

		return `${a} A message from ${$wodInfo.name}: ${b}`;
	};

	const getMidTitle = () => {
		const a = tied
			? "It's all tied up."
			: userLead
			? "You're in the lead!"
			: `${$wodInfo.name}'s in the lead.`;
		const b =
			userLead || tied
				? wodReactions.behind[$round]
				: wodReactions.ahead[$round];

		return `${a} ${b}`;
	};

	$: title = $gameState === "post" ? getPostTitle() : getMidTitle();
</script>

<div>
	{#if !$wod}
		<h2><Chunk text={title} max="15" className="combo-user" /></h2>
	{/if}

	<Highlights />

	{#if $gameState === "post" && !$wod}
		<Chunk
			text="TODO what else to say after the game?"
			max="15"
			className="combo-user"
		/>
	{/if}
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
