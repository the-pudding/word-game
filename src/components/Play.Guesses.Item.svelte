<script>
  import { tweened } from "svelte/motion";
  import { fade } from "svelte/transition";

  export let opponent;
  export let valid;
  export let text;
  export let revealOpponent;
  export let points;

  const timer = tweened(0, { duration: 1000 });

  let timerVisible = true;
  timer.set(1).then(() => {
    timerVisible = false;
  });

  $: renderText =
    opponent && valid && !revealOpponent
      ? text
          .split("")
          .map(() => "▉")
          .join("")
      : text;

  $: invalid = !valid;
  $: displayPoints = invalid || !points ? "" : `+${points}`;
  $: visible = timerVisible && (!opponent || !revealOpponent);
</script>

<li class:invalid>
  {renderText}

  {#if visible}
    <span out:fade>{displayPoints}</span>
  {/if}
</li>

<style>
  li {
    color: var(--color-green);
    font-weight: bold;
    list-style-type: none;
    text-align: center;
    display: inline-flex;
    position: relative;
  }

  li.invalid {
    color: var(--color-gray-500);
    font-weight: normal;
  }

  span {
    position: absolute;
    display: block;
    top: 0;
    right: 0;
    padding-left: 0.5rem;
    transform: translate(100%, 0);
  }
</style>
