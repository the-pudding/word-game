<script>
  import { active, round, roundScore, gameScore, gameState } from "$stores/misc.js";
  import Countdown from "$components/Modal.Countdown.svelte";
  import Score from "$components/Modal.Score.svelte";
  import Rules from "$components/Modal.Rules.svelte";

  const buttonOptions = {
    pre: "Begin game",
    mid: "Next round"
  };

  $: userWon = $gameScore.user > $gameScore.opponent;
  $: opponentWon = $gameScore.user < $gameScore.opponent;

  $: titleOptions = {
    pre: "Let's Play a Word Game",
    mid: userWon ? "You won the round!" : opponentWon ? "You lost the round." : "Tie round.",
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

<h2>{titleText}</h2>

<Rules />
<Score />

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
    font-size: 3em;
    text-align: center;
  }

  p {
    text-align: center;
    font-size: 2em;
  }
</style>
