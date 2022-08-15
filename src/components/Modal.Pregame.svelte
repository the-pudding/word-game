<script>
	import { onMount, getContext, createEventDispatcher } from "svelte";
	import { overlay, gameId, wodInfo } from "$stores/misc.js";
	import loadWodInfo from "$utils/loadWodInfo.js";
	import Chunk from "$components/helpers/Chunk.svelte";

	export let loaded;

	const loadingText = "loading today's game...";

	const { title, description } = getContext("copy");

	const dispatch = createEventDispatcher();

	const load = async () => {
		const [data] = await loadWodInfo($gameId);
		$wodInfo = data;
	};

	$: pronounObject = $wodInfo?.pronoun.split("/")[1];

	$: if ($gameId) load();
	$: customText =
		$gameId && $wodInfo
			? `today that person is ${$wodInfo?.name} from ${$wodInfo?.location}. ${$wodInfo?.bio}. can you beat ${pronounObject}?`
			: "there is no active game right now. check back later or sign up below to get notified.";
</script>

<div class="wrapper">
	<h2>
		<small>
			<Chunk text="welcome to" max="5" className="combo-user" />
		</small>
		<Chunk text={title} max="1" className="combo-user" />
	</h2>

	<div class="details">
		<p class="description">
			<Chunk text={description} max="15" className="combo-default" />
		</p>

		<p class="custom">
			<Chunk
				text={loaded ? customText : loadingText}
				max="15"
				className="combo-wod"
			/>
		</p>
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

	h2 {
		margin: 0 auto;
		font-weight: var(--bold);
	}

	small {
		font-size: 0.5em;
		display: block;
	}

	.details {
		display: flex;
	}

	.details p {
		width: 50%;
		padding: 16px 8px;
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
