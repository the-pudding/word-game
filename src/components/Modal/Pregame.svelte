<script>
	import { onMount, getContext, createEventDispatcher } from "svelte";
	import { overlay, gameId, gameNumber, wodInfo } from "$stores/misc.js";
	import loadWodInfo from "$utils/loadWodInfo.js";
	import Title from "$components/chunk/Title.svelte";
	import Description from "$components/chunk/Description.svelte";
	import Info from "$components/chunk/Info.svelte";

	export let loaded;

	let number;
	let ended;

	const { title, description } = getContext("copy");

	const dispatch = createEventDispatcher();

	const load = async () => {
		const [data] = await loadWodInfo($gameId);
		$wodInfo = data;
		number = $gameNumber || 1;
	};

	const onPlayClick = () => {
		if ($gameId) dispatch("play");
		else $overlay = "archive";
	};

	$: if ($gameId) load();
	$: if (loaded) ended = !$gameId;
</script>

<div class="wrapper">
	<div class="intro">
		<Title text={title} {number} />

		<div class="details">
			<Description text={description} />
			<Info {loaded} />
		</div>
	</div>

	<div class="cta" class:ended class:loaded>
		<div class="play">
			<button on:click={onPlayClick} disabled={!loaded}> play </button>
		</div>

		<div class="other">
			<div class="rules">
				<button
					class="combo-mark"
					on:click={() => {
						$overlay = "rules";
					}}>rules</button
				>
			</div>
			<div class="signup">
				<span class="alt">
					<p>
						be the next stranger: <a
							href="https://www.getrevue.co/profile/wordsagainststrangers/"
							target="_blank">sign up</a
						>
					</p>
				</span>
				<span class="reg">
					<p>want to be the next stranger?</p>
					<a
						role="button"
						class="combo-mark"
						href="https://www.getrevue.co/profile/wordsagainststrangers/"
						target="_blank">sign up</a
					>
				</span>
			</div>
		</div>
	</div>
</div>

<style>
	.details {
		display: flex;
		justify-content: space-evenly;
		min-height: 200px;
	}

	.cta {
		max-width: 25rem;
		margin: 0 auto;
		border-top: 1px solid var(--color-fg);
		display: flex;
		justify-content: space-between;
		padding: 8px 2px;
	}

	.play button {
		font-size: var(--32px);
		width: 3.25em;
	}

	.other {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
	}

	.other button,
	[role="button"] {
		font-size: var(--20px);
		background-color: var(--color-mark-bg);
		color: var(--color-mark-fg);
		padding: 4px 8px;
	}

	.rules {
		/* width: 50%; */
	}

	.signup .reg {
		display: none;
	}

	.signup .reg p {
		text-align: right;
		padding-left: 16px;
		margin-bottom: 4px;
	}

	.signup p {
		font-size: var(--14px);
		text-align: left;
	}

	.ended.cta {
		flex-direction: column;
		align-items: center;
	}

	.ended .play button {
		margin-bottom: 16px;
	}

	.ended .signup {
		display: none;
	}

	@media (min-width: 360px) {
		.details {
			margin-bottom: 16px;
		}

		.play button {
			font-size: var(--48px);
			width: 3em;
		}
	}

	@media (min-width: 640px) {
		.details {
			min-height: 240px;
		}

		.signup .alt {
			display: none;
		}

		.signup .reg {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			justify-content: flex-end;
		}

		.play button {
			font-size: var(--88px);
			width: 3em;
		}

		.ended .play button {
			font-size: var(--64px);
		}
	}

	@media (min-height: 720px) {
		.cta {
			padding: 16px 2px;
		}
		.details {
			min-height: 265px;
		}
		.ended .details {
			min-height: 240px;
		}
	}
</style>
