<script>
  import { sum } from "d3";
  import { guesses } from "$stores/misc.js";

  $: score = sum($guesses, (d) => d.score);
</script>

<p>Your score: {score}</p>
