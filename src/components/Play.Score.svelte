<script>
  import { roundScore } from "$stores/misc.js";
</script>

<div>
  <p>You: {$roundScore.user}</p>
  <p>Them: {$roundScore.opponent}</p>
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
