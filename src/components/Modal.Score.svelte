<script>
  import { ROUNDS, totalScore, round, wod } from "$stores/misc.js";
</script>

<p>Round {$round + 1} of {ROUNDS}</p>
<p>{$wod ? "Your score" : "You"}: {$totalScore.user}</p>

{#if !$wod}
  <p>Michelle: {$totalScore.wod}</p>
{/if}
