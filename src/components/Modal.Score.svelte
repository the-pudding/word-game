<script>
  import { totalScore, round, ROUNDS } from "$stores/misc.js";
</script>

<p>Round {$round + 1} / {ROUNDS}</p>
<p>You: {$totalScore.user}</p>
<p>Grandma: {$totalScore.opponent}</p>
