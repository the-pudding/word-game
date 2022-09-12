<script>
	import { inModal } from "$stores/misc.js";
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

<div id="play-keyboard" class:in-modal={$inModal}>
	<Keyboard
		on:keydown={onKeydown}
		custom={false}
		layout="wordle"
		--height="42px"
		--margin="4px"
		--min-width="28px"
		--background="var(--color-bg-2)"
		--active-background="var(--color-bg-3)"
		--color="var(--color-fg)"
	/>
</div>

<style>
	div {
		display: block;
	}

	.in-modal {
		opacity: 0.1;
		user-select: none;
		pointer-events: none;
	}

	@media (hover: hover) and (pointer: fine) {
		div {
			display: none;
		}
	}
</style>
