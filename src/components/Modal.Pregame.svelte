<script>
	import { onMount } from "svelte";
	import { overlay, gameId, wodInfo } from "$stores/misc.js";
	import loadWodInfo from "$utils/loadWodInfo.js";

	const load = async () => {
		const data = await loadWodInfo($gameId);

		const nameQ = "what is your name?";
		const locationQ = "where do you live?";

		const name = data.find((d) => d.question === nameQ).answer;
		const location = data.find((d) => d.question === locationQ).answer;
		$wodInfo = { name, location };
	};

	$: if ($gameId) load();
</script>

<h2>Welcome to <strong>Not Wordle!</strong></h2>
<p>
	One person a day gets the chance to play against the world in a game of words.
</p>

<p class="custom" class:visible={$gameId && $wodInfo}>
	Today that person is <strong
		>{$wodInfo?.name} from {$wodInfo?.location}</strong
	>. Can you beat them?
</p>

<p class="nogame" class:visible={!$gameId}>
	<!-- TODO link -->
	There is no active game right now. Check back later or
	<a href="#">subscribe</a> to the newsletter to get notified.
</p>

<p>
	Do you want to be the <strong>Word Opponent of the Day?</strong> Sign up below
	to be in the running.
</p>
<!-- TODO link -->
<a role="button" href="#">BIG SIGNUP BUTTON</a>

<p>
	<button
		on:click={() => {
			$overlay = "rules";
		}}>How to Play</button
	>
</p>

<style>
	h2 {
		font-size: 2em;
		text-align: center;
		max-width: 23em;
		margin: 0 auto;
	}

	.custom {
		visibility: hidden;
	}

	.visible {
		visibility: visible;
	}
</style>
