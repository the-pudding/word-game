<script>
	import { guesses } from "$stores/misc.js";
	import { copy } from "svelte-copy";

	$: output = JSON.stringify([].concat(...$guesses.user));
</script>

<p>
	Use the copy button below, then <a
		href="https://forms.gle/P8npksT5XLE6tFWT8"
		target="_blank">click here</a
	> to give us feedback!
</p>

<textarea style="width: 100%;">{output}</textarea>
<button use:copy={output}> Copy to clipboard </button>

<style>
	p {
		margin-top: 2rem;
		text-align: center;
	}

	textarea {
		margin: 1em 0;
	}
</style>
