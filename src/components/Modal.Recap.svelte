<script>
  import { gameState, totalScore } from "$stores/misc.js";
  import Score from "$components/Modal.Score.svelte";
  import Highlights from "$components/Modal.Highlights.svelte";
</script>

<div>
  <Score />
  <Highlights />

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
