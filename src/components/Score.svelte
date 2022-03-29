<script>
  import { sum } from "d3";
  import { guesses, grannyGuesses } from "$stores/misc.js";

  const getScore = (data) => {
    const firsts = data.filter((d) => d.first);
    const total = sum(firsts, (d) => d.points);
    return total;
  };

  $: score = getScore($guesses);
  $: grannyScore = getScore($grannyGuesses);

  $: console.table($grannyGuesses);
  $: console.table($guesses);
</script>

<p>Granny score: {grannyScore}</p>
<p>Your score: {score}</p>
