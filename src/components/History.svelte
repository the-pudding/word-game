<script>
	import { ascending, sum, range, max } from "d3";
	import { onMount } from "svelte";
	import ButtonSet from "$components/helpers/ButtonSet.svelte";
	import storage from "$utils/localStorage.js";
	import Chunk from "$components/helpers/Chunk.svelte";
	import loadCsv from "$utils/loadCsv.js";
	import { gameNumber, gameNumberRecent } from "$stores/misc.js";
	let games;
	let wins;
	let ties;
	let losses;
	let value;

	const getPercent = (game, margins) => {
		const { gameId, gameNumber, margin } = game;
		const curGame = margins.filter((d) => d.id === gameId);
		curGame.sort((a, b) => ascending(a.margin, b.margin));
		const total = sum(curGame, (d) => d.count) - 1;
		const above = curGame.filter((d) => d.margin < margin);
		const betterThan = sum(above, (d) => d.count);
		const percent = betterThan / total;
		return percent;
	};

	$: title =
		value === "internet"
			? "percentile compared to everyone"
			: "margin of <span class='combo-user chunk'>wins</span> and <span class='combo-wod chunk'>losses</span> to strangers";
	onMount(async () => {
		const url = `https://pudding.cool/games/words-against-strangers-data/user-results-unique-concat/all.csv?version=${Date.now()}`;
		const raw = await loadCsv(url);
		const margins = raw.map((d) => ({
			...d,
			margin: +d.margin,
			count: +d.count
		}));

		const stored = storage.get("pudding_words_against_strangers") || [];
		const data = stored.map((d) => ({
			...d,
			percent: getPercent(d, margins)
		}));

		wins = data.filter((d) => d.margin > 0).length;
		ties = data.filter((d) => d.margin === 0).length;
		losses = data.filter((d) => d.margin < 0).length;

		games = range(1, 101).map((d) => {
			const match = data.find((v) => v.gameNumber === d);
			return (
				match || {
					skip: d < $gameNumberRecent,
					today: d === $gameNumberRecent
				}
			);
		});
	});
</script>

<div class="history">
	<p>your record:</p>

	<p id="chunk-record">
		<Chunk text="wins: {wins}" className="combo-user" />
		<Chunk text="ties: {ties}" className="combo-default" />
		<Chunk text="losses: {losses}" className="combo-wod" />
	</p>

	{#if games}
		<div class="options">
			<ButtonSet
				bind:value
				legend="you vs. the"
				options={[{ value: "internet" }, { value: "strangers" }]}
			/>
		</div>
		<p class="title">{@html title}</p>
		<figure>
			<div class="chart">
				{#each games as game, i}
					{@const percent = game.percent || 0}
					{@const margin = game.margin}
					{@const skip = game.skip}
					{@const number = game.gameNumber}
					{@const today = game.today}
					{@const win = margin > 0}
					{@const tie = margin === 0}
					{@const loss = margin < 0}
					{@const text =
						value === "internet" ? Math.round(percent * 100) : Math.abs(margin)}
					{@const opacity = value === "internet" ? percent : 1}
					<div class="game {value}" class:skip class:win class:tie class:loss>
						{#if today}
							<span class="bg" style:opacity="0" />
							<span class="text">?</span>
						{:else if number}
							<span class="bg" style:opacity />
							<span class="text">{text}</span>
						{:else if skip}
							<span class="bg" style:opacity="0" />
							<span class="text">X</span>
						{/if}
					</div>
				{/each}
			</div>
			<figcaption>note: today's result will appear tomorrow.</figcaption>
		</figure>
	{/if}
</div>

<style>
	.history {
		min-height: 480px;
	}
	p {
		margin: 16px auto;
	}

	#chunk-record {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 16px 0 32px 0;
	}

	:global(#chunk-record .chunk:nth-of-type(1)) {
		z-index: 3;
		transform: translate(-15%, 0) rotate(1deg);
	}

	:global(#chunk-record .chunk:nth-of-type(2)) {
		z-index: 2;
		transform: translate(0, -2px);
	}

	:global(#chunk-record .chunk:nth-of-type(3)) {
		z-index: 1;
		transform: translate(5%, -4px) rotate(-2deg);
	}

	figure {
		width: 300px;
		margin: 0 auto;
	}

	.chart {
		display: flex;
		flex-wrap: wrap;
		user-select: none;
	}

	.game {
		width: 28px;
		height: 28px;
		margin: 1px;
		position: relative;
		border: 2px solid var(--color-default-border);
	}

	.game.strangers.win {
		border: 2px solid var(--color-user-border);
	}

	.game.strangers.loss {
		border: 2px solid var(--color-wod-border);
	}

	.game.skip {
		opacity: 0.5;
	}

	.bg {
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: var(--color-mark-bg);
	}

	.strangers.win .bg {
		background: var(--color-user-bg);
	}

	.strangers.loss .bg {
		background: var(--color-wod-bg);
	}

	.strangers.tie .bg {
		background: var(--color-default-bg);
	}

	.text {
		font-size: 12px;
		font-weight: bold;
		text-align: center;
		position: relative;
		color: var(--color-mark-fg);
		line-height: 1;
		display: block;
		transform: translate(0, 6px);
	}

	.strangers.win .text {
		color: var(--color-user-fg);
	}

	.strangers.loss .text {
		color: var(--color-wod-fg);
	}

	.strangers.tie .text {
		color: var(--color-default-fg);
	}

	figcaption {
		font-size: 12px;
		color: var(--color-fg-light);
		margin-top: 8px;
		text-align: center;
	}

	.options {
		text-align: center;
		margin-bottom: 16px;
	}

	.title {
		font-size: var(--12px);
		color: var(--color-fg-light);
		text-align: center;
		margin-bottom: 8px;
	}

	:global(.history .title span) {
		padding: 0 2px;
	}

	@media (min-width: 360px) {
		.game:first-of-type:before {
			content: "#1";
			display: block;
			position: absolute;
			top: 50%;
			left: -8px;
			font-size: 12px;
			transform: translate(-100%, -50%);
			color: var(--color-fg-light);
		}

		.game:last-of-type:before {
			content: "#100";
			display: block;
			position: absolute;
			top: 50%;
			left: 0px;
			font-size: 12px;
			transform: translate(100%, -50%);
			color: var(--color-fg-light);
		}
	}
</style>
