<script>
  import { active, round, gameState } from "$stores/misc.js";
  import Countdown from "$components/Modal.Countdown.svelte";

  const buttonOptions = {
    pre: "Begin game",
    mid: "Next round"
  };

  const titleOptions = {
    pre: "Can you beat grandma at words?",
    mid: "Round over!",
    post: "Game over!"
  };

  let showCountdown = false;

  const onBegin = () => {
    showCountdown = true;
  };

  const startRound = () => {
    $active = true;
    $round += 1;
    showCountdown = false;
  };

  $: titleText = titleOptions[$gameState];
  $: buttonText = buttonOptions[$gameState];
</script>

<!-- recap round info -->
<h2>{titleText}</h2>

<!-- button to start round -->
{#if buttonText}
  <button on:click={onBegin}>{buttonText}</button>
{/if}

<!-- countdown timer -->
{#if showCountdown}
  <Countdown on:end={startRound} />
{/if}
