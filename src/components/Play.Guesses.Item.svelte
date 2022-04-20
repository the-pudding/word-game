<script>
  import { tweened } from "svelte/motion";
  import { fade } from "svelte/transition";

  export let opponent;
  export let valid;
  export let text;
  export let guessedByUserLate;
  export let points;

  const timer = tweened(0, { duration: 1000 });

  let showPoints = true;
  timer.set(1).then(() => {
    showPoints = false;
  });

  $: renderText =
    opponent && valid && !guessedByUserLate
      ? text
          .split("")
          .map(() => "▉")
          .join("")
      : text;

  $: invalid = !valid;
</script>

<li class:invalid>
  {renderText}

  {#if showPoints}
    {#if !opponent || !guessedByUserLate}
      <span out:fade>{`+${!valid || !points ? 0 : points}`}</span>
    {/if}
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
