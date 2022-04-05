<script>
  import { active, round, roundScore, gameState } from "$stores/misc.js";
  import Countdown from "$components/Modal.Countdown.svelte";
  import Score from "$components/Modal.Score.svelte";
  import Rules from "$components/Modal.Rules.svelte";
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

  $: userWon = $roundScore.user > $roundScore.opponent;
  $: opponentWon = $roundScore.user < $roundScore.opponent;

  $: titleOptions = {
    pre: "Let's Play a Word Game",
    mid: userWon ? "You won the round!" : opponentWon ? "You lost the round." : "Tie round.",
    post: "Game over!"
  };

  $: titleText = titleOptions[$gameState];
  $: buttonText = buttonOptions[$gameState];
</script>

<h2>{titleText}</h2>

<Rules />
<Score />
<Feedback />

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
