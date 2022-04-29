<script>
  import { active, round, roundScore, gameState, totalScore } from "$stores/misc.js";
  import Countdown from "$components/Modal.Countdown.svelte";
  import Recap from "$components/Modal.Recap.svelte";
  import Pregame from "$components/Modal.Pregame.svelte";
  import Feedback from "$components/Modal.Feedback.svelte";

  const buttonOptions = {
    pre: "Begin game",
    mid: "Next round"
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

  // TODO
  $: buttonText = buttonOptions[$gameState];
</script>

{#if $gameState === "pre"}
  <Pregame />
{/if}
{#if $gameState !== "pre"}
  <Recap />
{/if}
{#if $gameState === "post"}
  <Feedback />
{/if}

<!-- button to start round -->
{#if buttonText}
  <p><button on:click={onBegin}>{buttonText}</button></p>
{/if}

<!-- countdown timer -->
{#if showCountdown}
  <Countdown on:end={startRound} />
{/if}

<style>
  p {
    text-align: center;
    font-size: 2em;
  }
</style>
