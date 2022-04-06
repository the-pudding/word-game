<script>
  import { onMount } from "svelte";
  import Keyboard from "svelte-keyboard";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let inputEl;
  let value = "";

  const onKeydown = (e) => {
    value = `${value}${e.detail}`;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const clean = value.trim().toLowerCase();
    if (clean) dispatch("submit", clean);
    value = "";
  };

  $: touchscreen = false;

  onMount(() => {
    inputEl.focus();
  });
</script>

<div>
  {#if touchscreen}
    <Keyboard on:keydown={onKeydown} layout="wordle" />
  {:else}
    <form on:submit={onSubmit}>
      <input maxlength="15" bind:value bind:this={inputEl} />
      <button type="submit">Submit</button>
    </form>
  {/if}
</div>

<style>
  input,
  button {
    font-size: 2em;
    padding: 0.5em;
  }
</style>
