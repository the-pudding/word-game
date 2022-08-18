<script>
	import { onMount, getContext, createEventDispatcher } from "svelte";
	import { overlay, gameId, wodInfo } from "$stores/misc.js";
	import loadWodInfo from "$utils/loadWodInfo.js";
	import Chunk from "$components/helpers/Chunk.svelte";
	import Title from "$components/Chunk.Title.svelte";
	import Description from "$components/Chunk.Description.svelte";
	import Info from "$components/Chunk.Info.svelte";

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
	<Title {title} />

	<div class="details">
		<Description {description} />

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
				<p>want to be the next stranger?</p>
				<!-- TODO link -->
				<a role="button" href="#">sign up</a>
			</div>
		</div>
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.details {
		display: flex;
		justify-content: space-evenly;
	}

	.cta {
		border-top: 1px solid var(--color-fg);
		display: flex;
		/* flex-direction: column; */
		justify-content: space-between;
		padding-top: 8px;
	}

	.play button {
		font-size: var(--88px);
		width: 2.75em;
	}

	.other {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: space-between;
	}

	.other button,
	[role="button"] {
		font-size: var(--14px);
	}

	.signup {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.signup p {
		font-size: var(--14px);
		text-align: right;
		margin: 4px 0;
	}
</style>
