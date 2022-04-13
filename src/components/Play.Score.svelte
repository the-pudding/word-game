<script>
  import { totalScore } from "$stores/misc.js";
</script>

<div>
  <p>You: {$totalScore.user}</p>
  <p>Them: {$totalScore.opponent}</p>
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
