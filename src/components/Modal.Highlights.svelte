<script>
  import { format, shuffle } from "d3";
  import { possibleAnswers, guesses, round, lemmasPlayed } from "$stores/misc.js";

  $: count = format(",")($possibleAnswers.length);
  $: grandmaWords = $guesses.opponent[$round].filter((d) => d.valid && !d.guessedByUserLate);
  $: commonWords = $possibleAnswers
    .filter((d) => +d.points === 1)
    .filter((d) => !$lemmasPlayed.includes((d) => d.text));
  $: spanWords = shuffle(commonWords)
    .slice(0, 5)
    .map((d) => `<span>${d.word}</span>`)
    .join(", ");
</script>

<p>There were <strong>{count}</strong> possible words that satisfied the clue.</p>
{#if grandmaWords.length}
  <p>Here are the words that grandma got that you didn't:</p>
  <table>
    <thead>
      <th>Word</th>
      <th>Points</th>
    </thead>
    <tbody
      >{#each grandmaWords as { text, points }}
        <tr><td>{text}</td> <td>{points}</td></tr>
      {/each}
    </tbody>
  </table>
{/if}

<p>
  Here are some common words that neither of you got: {@html spanWords}.
</p>

<style>
  table {
    width: 20em;
    margin: 0 auto;
  }
</style>
