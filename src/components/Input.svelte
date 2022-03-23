<script>
  import Keyboard from "svelte-keyboard";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let value = "";
  const onKeydown = (e) => {
    value = `${value}${e.detail}`;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch("submit", value);
    value = "";
  };

  $: touchscreen = false;
</script>

<p>{value}</p>
{#if touchscreen}
  <Keyboard on:keydown={onKeydown} layout="wordle" />
{:else}
  <form on:submit={onSubmit}>
    <input bind:value />
    <button type="submit">Submit</button>
  </form>
{/if}
