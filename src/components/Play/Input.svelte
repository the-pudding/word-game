<script>
	import { onMount, tick } from "svelte";
	import { createEventDispatcher } from "svelte";
	import { active, inModal } from "$stores/misc.js";
	import mq from "$stores/mq.js";
	const dispatch = createEventDispatcher();

	export let value = "";
	export const reset = () => (value = "");
	let inputEl;

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

	const focus = async () => {
		await tick();
		inputEl.focus();
	};

	$: disabled = !$active;
	$: if ($active && $mq.desktop) focus();
</script>

<div id="play-input" class:in-modal={$inModal}>
	<form on:submit={onInput}>
		<div class="box">
			<div class="bg" aria-hidden="true">{value}</div>
			<input
				bind:value
				bind:this={inputEl}
				spellcheck="false"
				maxlength="15"
				placeholder="enter word"
				{disabled}
				inputmode="none"
			/>
			<button type="submit" aria-label="submit">&rarr;</button>
		</div>
	</form>
</div>

<style>
	#play-input {
		margin: 4px 0 0 0;
		user-select: none;
	}

	#play-input.in-modal {
		opacity: 0.1;
		pointer-events: none;
	}

	form {
		width: 100%;
		display: block;
		position: relative;
	}

	.box {
		background-color: var(--color-bg-binary);
		width: 100%;
		border: 1px solid var(--color-fg);
		padding: 8px;
		position: relative;
	}

	.bg {
		color: var(--color-user-bg);
		background-color: currentColor;
		position: absolute;
		top: 10px;
		left: 8px;
		padding: 8px;
		font-size: var(--24px);
		font-weight: var(--bold);
		line-height: 1;
	}

	.bg:empty {
		display: none;
	}

	input {
		background-color: transparent;
		outline: 2px solid transparent;
		border-radius: 0;
		font-size: var(--24px);
		border: none;
		position: relative;
		line-height: 1;
		font-weight: var(--bold);
		color: var(--color-user-fg);
		width: 100%;
	}

	input:focus {
		outline: 2px solid var(--color-focus);
	}

	button {
		display: none;
		position: absolute;
		top: 50%;
		right: 8px;
		transform: translate(0, -50%);
	}

	@media (hover: hover) and (pointer: fine) {
		div {
			display: block;
		}

		button {
			display: block;
		}

		input {
			width: calc(100% - var(--48px));
		}
	}
</style>
