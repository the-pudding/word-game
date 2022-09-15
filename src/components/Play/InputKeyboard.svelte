<script>
	import Keyboard from "svelte-keyboard";
	import { createEventDispatcher } from "svelte";
	import { inModal, active } from "$stores/misc.js";
	import mq from "$stores/mq.js";
	const dispatch = createEventDispatcher();

	export let value = "";
	let hide;

	const submit = () => {
		if (value) dispatch("submit", value);
		value = "";
	};

	const onKeydown = (e) => {
		if ($mq.desktop) return;

		const key = e.key || e.detail;
		hide = !!e.key;

		if (key === "Enter") submit();
		else if (key === "Backspace") value = value.substring(0, value.length - 1);
		else value = `${value}${key}`;
	};

	const onInput = (e) => {
		e.preventDefault();
		value = value.trim().toLowerCase();
		submit();
	};
</script>

<svelte:window on:keydown={onKeydown} />

<div id="play-keyboard" class:in-modal={$inModal} class:hide>
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

	div.hide {
		display: none;
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
