<script>
	import { ROUNDS, totalScore, round, wod, wodInfo } from "$stores/misc.js";
</script>

<p>Round {$round + 1} of {ROUNDS}</p>
<p>{$wod ? "Your score" : "You"}: {$totalScore.user}</p>

{#if !$wod}
	<p>{$wodInfo.name}: {$totalScore.wod}</p>
{/if}
