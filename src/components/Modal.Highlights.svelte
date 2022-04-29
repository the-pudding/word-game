<script>
  import { format, shuffle } from "d3";
  import { possibleAnswers, guesses, round, lemmasPlayed, wod } from "$stores/misc.js";

  $: count = format(",")($possibleAnswers.length);
  $: opponentWords = $guesses.opponent[$round].filter((d) => d.valid && !d.guessedByUserLate);
  $: commonWords = $possibleAnswers
    .filter((d) => +d.points === 1)
    .filter((d) => !$lemmasPlayed.includes((d) => d.text));
  $: spanWords = shuffle(commonWords)
    .slice(0, 5)
    .map((d) => `<span>${d.word}</span>`)
    .join(", ");
  $: commonText = $wod ? "you didn't get" : "neither of you got";
</script>

<p>There were <strong>{count}</strong> possible words that satisfied the clue.</p>
{#if opponentWords.length}
  <p>Here are the words that Michelle got that you didn't:</p>
  <table>
    <thead>
      <th>Word</th>
      <th>Points</th>
    </thead>
    <tbody
      >{#each opponentWords as { text, points }}
        <tr><td>{text}</td> <td>{points}</td></tr>
      {/each}
    </tbody>
  </table>
{/if}

<p>
  Here are some common words that {commonText}: {@html spanWords}.
</p>

<style>
  table {
    width: 20em;
    margin: 0 auto;
  }
</style>
