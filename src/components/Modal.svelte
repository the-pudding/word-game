<script>
  import { tweened } from "svelte/motion";
  import { active, round } from "$stores/misc.js";

  export let buttonText = "";

  const start = 3;
  const end = -1;
  const duration = start * 1000;

  const countdown = tweened(start, { duration });
  $: visible = $countdown < start;
  $: if ($countdown <= end) startRound();
  $: timer = $countdown < 0 ? "Begin!" : Math.floor($countdown) + 1;

  const onBegin = () => countdown.set(end);
  const startRound = () => {
    $active = true;
    $round += 1;
  };
</script>

<slot />
<button on:click={onBegin}>{buttonText}</button>
<p class:visible>{timer}</p>

<style>
  p {
    display: none;
    font-size: 4em;
    padding: 2em;
  }

  .visible {
    display: block;
  }
</style>
