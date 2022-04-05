<script>
  import { gameState, roundScore, gameScore, round, ROUNDS } from "$stores/misc.js";

  $: userWonGame = $gameScore.user > $gameScore.opponent;
  $: opponentWonGame = $gameScore.opponent < $gameScore.user;
</script>

<div>
  {#if $gameState === "mid"}
    <p>Round {$round + 1} / {ROUNDS}</p>
    <p>You: {$roundScore.user}</p>
    <p>Them: {$roundScore.opponent}</p>
    <h3>Game score</h3>
    <h3>{$gameScore.user}-{$gameScore.opponent}</h3>
  {:else if $gameState === "post"}
    <h3>Game score</h3>
    <h3>{$gameScore.user}-{$gameScore.opponent}</h3>

    {#if userWonGame}
      <p>You win!</p>
    {:else if opponentWonGame}
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
