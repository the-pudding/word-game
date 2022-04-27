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
  $: userLead = $totalScore.user > $totalScore.opponent;
  $: tied = $totalScore.user === $totalScore.opponent;

  $: titleOptions = {
    pre: "Title TK Word Game",
    mid: tied ? "It's all tied up!" : `${userLead ? "You are" : "Michelle is"} in the lead!`,
    post: "Game over!"
  };

  $: titleText = titleOptions[$gameState];
  $: buttonText = buttonOptions[$gameState];
</script>

<h2>{titleText}</h2>

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
  h2 {
    font-size: 2em;
    text-align: center;
    max-width: 23em;
    margin: 1rem auto;
  }

  p {
    text-align: center;
    font-size: 2em;
  }
</style>
