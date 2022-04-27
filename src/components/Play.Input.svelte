<script>
  import { onMount } from "svelte";
  import Keyboard from "svelte-keyboard";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let inputEl;
  let value = "";

  const submit = () => {
    if (value) dispatch("submit", value);
    value = "";
  };

  const onKeydown = (e) => {
    if (e.detail === "Enter") submit();
    else if (e.detail === "Backspace") value = value.substring(0, value.length - 1);
    else value = `${value}${e.detail}`;
  };

  const onInput = (e) => {
    e.preventDefault();
    value = value.trim().toLowerCase();
    submit();
  };

  onMount(() => {
    inputEl.focus();
  });
</script>

<div class="keyboard">
  <p>{value}</p>
  <Keyboard on:keydown={onKeydown} layout="wordle" />
</div>

<div class="no-keyboard">
  <form on:submit={onInput}>
    <input maxlength="15" bind:value bind:this={inputEl} />
    <button type="submit">Submit</button>
  </form>
</div>

<style>
  input,
  button {
    font-size: 2em;
    padding: 0.5em;
  }

  .no-keyboard {
    display: none;
  }

  .keyboard {
    display: block;
  }

  @media (hover: hover) and (pointer: fine) {
    .no-keyboard {
      display: block;
    }
    .keyboard {
      display: none;
    }
  }
</style>
