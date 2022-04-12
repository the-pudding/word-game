<script>
  import { gameState, score, round, ROUNDS } from "$stores/misc.js";
  import { sum } from "d3";

  $: userScore = sum($score.user);
  $: opponentScore = sum($score.opponent);
</script>

<div>
  {#if $gameState === "mid" || $gameState === "post"}
    <p>Round {$round + 1} / {ROUNDS}</p>
    <p>You: {userScore}</p>
    <p>Them: {opponentScore}</p>
  {/if}

  {#if $gameState === "post"}
    {#if userScore > opponentScore}
      <p>You win!</p>
    {:else if opponentScore > userScore}
      <p>You lose!</p>
    {:else}
      <p>Tie!</p>
    {/if}
  {/if}
</div>

<style>
  div {
    text-align: center;
  }
  h3 {
    font-size: 2em;
  }
</style>
