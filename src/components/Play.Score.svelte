<script>
  import { totalScore, wod } from "$stores/misc.js";
</script>

<div>
  <p>
    <span class="name">You</span>
    <span class="score">{$totalScore.user}</span>
  </p>
  <p>
    {#if !$wod}
      <span class="name">Michelle</span>
      <span class="score">{$totalScore.opponent}</span>
    {/if}
  </p>
</div>

<style>
  div {
    margin: 1rem 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  p {
    margin: 0;
    padding: 0;
    line-height: 1;
    font-size: 1.5em;
    width: calc(50% - 1rem);
    text-align: center;
  }

  span {
    display: block;
  }
</style>
