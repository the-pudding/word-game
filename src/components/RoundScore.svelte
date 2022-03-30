<script>
  import { roundScore, gameScore } from "$stores/misc.js";
</script>

<h1>{JSON.stringify($gameScore)}</h1>
<p>Granny score: {$roundScore.opponent}</p>
<p>Your score: {$roundScore.user}</p>
