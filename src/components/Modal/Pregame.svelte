<script>
	import { onMount, getContext, createEventDispatcher } from "svelte";
	import { overlay, gameId, wodInfo } from "$stores/misc.js";
	import loadWodInfo from "$utils/loadWodInfo.js";
	import Title from "$components/Chunk/Title.svelte";
	import Description from "$components/Chunk/Description.svelte";
	import Info from "$components/Chunk/Info.svelte";

	export let loaded;

	const { title, description } = getContext("copy");

	const dispatch = createEventDispatcher();

	const load = async () => {
		const [data] = await loadWodInfo($gameId);
		$wodInfo = data;
	};

	$: if ($gameId) load();
</script>

<div class="wrapper">
	<Title text={title} />

	<div class="details">
		<Description text={description} />
		<Info {loaded} />
	</div>

	<div class="cta">
		<div class="play">
			<button on:click={() => dispatch("play")} disabled={!loaded}>
				play
			</button>
		</div>

		<div class="other">
			<div class="rules">
				<button
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
						href="https://www.getrevue.co/profile/wordsagainststrangers/"
						target="_blank">sign up</a
					>
				</span>
			</div>
		</div>
	</div>
</div>

<style>
	.wrapper {
		/* display: flex;
		flex-direction: column; */
		height: 100%;
	}

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
		font-size: var(--14px);
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

	@media (min-width: 360px) {
		.details {
			margin-bottom: 16px;
		}

		.play button {
			font-size: var(--48px);
			width: 3em;
		}
	}

	@media (min-width: 480px) {
		.signup .alt {
			display: none;
		}

		.signup .reg {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			justify-content: flex-end;
		}
	}

	@media (min-width: 640px) {
		.play button {
			font-size: var(--88px);
			width: 3em;
		}
	}

	@media (min-height: 600px) {
		.cta {
			padding: 16px 2px;
		}
		.details {
			min-height: 265px;
		}
	}
</style>
