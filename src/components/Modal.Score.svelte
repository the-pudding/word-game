<script>
  import { gameState, totalScore, round, ROUNDS } from "$stores/misc.js";
</script>

<div>
  {#if $gameState === "mid" || $gameState === "post"}
    <p>Round {$round + 1} / {ROUNDS}</p>
    <p>You: {$totalScore.user}</p>
    <p>Them: {$totalScore.opponent}</p>
  {/if}

  {#if $gameState === "post"}
    {#if $totalScore.user > $totalScore.opponent}
      <p>You win!</p>
    {:else if $totalScore.opponent > $totalScore.user}
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
