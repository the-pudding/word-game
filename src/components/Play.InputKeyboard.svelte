<script>
	import Keyboard from "svelte-keyboard";
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	export let value = "";

	const submit = () => {
		if (value) dispatch("submit", value);
		value = "";
	};

	const onKeydown = (e) => {
		if (e.detail === "Enter") submit();
		else if (e.detail === "Backspace")
			value = value.substring(0, value.length - 1);
		else value = `${value}${e.detail}`;
	};

	const onInput = (e) => {
		e.preventDefault();
		value = value.trim().toLowerCase();
		submit();
	};
</script>

<div id="play-keyboard">
	<Keyboard
		on:keydown={onKeydown}
		layout="wordle"
		--height="42px"
		--margin="4px"
		--min-width="28px"
		--background="var(--color-white)"
		--color="var(--color-fg)"
	/>
</div>

<style>
	div {
		display: block;
	}

	@media (hover: hover) and (pointer: fine) {
		div {
			display: none;
		}
	}
</style>
