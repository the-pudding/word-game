<script>
	import { overlay } from "$stores/misc.js";
</script>

<nav>
	<button
		on:click={() => {
			$overlay = "hamburger";
		}}>Hamburger</button
	>

	<button
		on:click={() => {
			$overlay = "rules";
		}}>Rules</button
	>

	<button
		on:click={() => {
			$overlay = "about";
		}}>About</button
	>
</nav>

<style>
	nav {
		position: relative;
		z-index: var(--z-overlay);
	}
</style>
