<script>
	import { ascending, sum, range, max } from "d3";
	import { onMount } from "svelte";
	import storage from "$utils/localStorage.js";
	import Chunk from "$components/helpers/Chunk.svelte";
	import loadCsv from "$utils/loadCsv.js";
	let games;
	let wins;
	let ties;
	let losses;

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

		const maxGameNumber = max(data, (d) => d.gameNumber);

		games = range(100).map((d) => {
			const match = data.find((v) => v.gameNumber === d + 1);
			return (
				match || {
					skip: d + 1 < maxGameNumber
				}
			);
		});
		wins = games.filter((d) => d.margin > 0).length;
		ties = games.filter((d) => d.margin === 0).length;
		losses = games.filter((d) => d.margin < 0).length;
	});
</script>

<p>your record:</p>

<p id="chunk-record">
	<Chunk text="wins: {wins}" className="combo-user" />
	<Chunk text="ties: {ties}" className="combo-default" />
	<Chunk text="losses: {losses}" className="combo-wod" />
</p>

{#if games}
	<p>your percentile vs. the internet</p>
	<figure>
		{#each games as { gameNumber, percent, margin, skip }}
			{@const suffix = margin < 0 ? "wod" : margin > 0 ? "user" : "default"}
			<div class:skip>
				{#if gameNumber}
					<span class="bg {suffix}" style:opacity={percent} />
					<span class="percent {suffix}">{Math.round(percent * 100)}</span>
				{:else if skip}
					<span class="bg" style:opacity="0" />
					<span class="percent">X</span>
				{/if}
			</div>
		{/each}
	</figure>
{/if}

<style>
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
		display: flex;
		flex-wrap: wrap;
		width: 300px;
		margin: 0 auto;
	}

	figure div {
		width: 28px;
		height: 28px;
		margin: 1px;
		position: relative;
		border: 2px solid var(--color-default-border);
	}

	figure div.skip {
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

	.percent {
		font-size: 12px;
		font-weight: bold;
		text-align: center;
		position: relative;
		color: var(--color-mark-fg);
		line-height: 1;
		display: block;
		transform: translate(0, 6px);
	}

	@media (min-width: 360px) {
		figure div:first-of-type:before {
			content: "#1";
			display: block;
			position: absolute;
			top: 50%;
			left: -8px;
			font-size: 12px;
			transform: translate(-100%, -50%);
			color: var(--color-fg-light);
		}

		figure div:last-of-type:before {
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
