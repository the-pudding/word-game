<script>
	import { onMount, getContext, createEventDispatcher } from "svelte";
	import { overlay, gameId, wodInfo } from "$stores/misc.js";
	import loadWodInfo from "$utils/loadWodInfo.js";
	import Chunk from "$components/Chunk.svelte";

	export let loaded;

	const { title, description } = getContext("copy");

	const dispatch = createEventDispatcher();

	const load = async () => {
		const data = await loadWodInfo($gameId);

		const nameQ = "what is your name?";
		const locationQ = "where do you live?";

		const name = data.find((d) => d.question === nameQ).answer;
		const location = data.find((d) => d.question === locationQ).answer;
		$wodInfo = { name, location };
	};

	$: if ($gameId) load();
	$: customText =
		$gameId && $wodInfo
			? `today that person is ${$wodInfo?.name} from ${$wodInfo?.location}. can you beat them?`
			: "there is no active game right now. check back later or sign up below to get notified.";
</script>

<h2>
	<small>
		<Chunk text="welcome to" max="5" space={false} className="combo-user" />
	</small>
	<Chunk text={title} max="1" space={false} className="combo-user" />
</h2>

<div class="details">
	<p class="description">
		<Chunk
			text={description}
			max="15"
			space={false}
			className="combo-default"
		/>
	</p>

	<p class="custom">
		{#if loaded}
			<Chunk text={customText} max="15" space={false} className="combo-wod" />
		{/if}
	</p>
</div>

<div class="cta">
	<div class="play">
		{#if loaded}
			<button on:click={() => dispatch("play")}>play</button>
		{:else}
			<span>loading...</span>
		{/if}
	</div>

	<div class="rules">
		<button
			on:click={() => {
				$overlay = "rules";
			}}>rules</button
		>
	</div>
	<div class="signup">
		<p class="next">Want to be the next opponent?</p>
		<!-- TODO link -->
		<a role="button" href="#">sign up</a>
	</div>
</div>

<style>
	h2 {
		margin: 0 auto;
		font-weight: bold;
	}

	small {
		font-size: 0.5em;
	}

	.details {
		display: flex;
	}

	.details p {
		width: 50%;
	}

	.play button {
		font-size: var(--48px);
	}
</style>
