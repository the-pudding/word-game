<script>
  import { score } from "$stores/misc.js";
  import { sum } from "d3";

  $: userScore = sum($score.user);
  $: opponentScore = sum($score.opponent);
</script>

<div>
  <p>You: {userScore}</p>
  <p>Them: {opponentScore}</p>
</div>

<style>
  p {
    margin: 0;
    padding: 0;
    line-height: 1;
    font-size: 2em;
  }
  div {
    position: absolute;
    top: 0;
    right: 0;
  }
</style>
