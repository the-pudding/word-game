<script>
  import { tweened } from "svelte/motion";
  import { active, round } from "$stores/misc.js";

  export let buttonText = "";

  const start = 3;
  const end = -1;
  const duration = start * 1000;
  const countdown = tweened(start);

  let timerBegan = false;

  $: if ($countdown <= end) startRound();
  $: timer = $countdown < 0 ? "Begin!" : Math.floor($countdown) + 1;
  $: visible = $countdown < start && timerBegan;

  const onBegin = () => {
    timerBegan = true;
    countdown.set(start, { duration: 0 });
    countdown.set(end, { duration });
  };
  const startRound = () => {
    $active = true;
    $round += 1;
    timerBegan = false;
  };
</script>

<slot />

{#if buttonText} <button on:click={onBegin}>{buttonText}</button> {/if}
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
