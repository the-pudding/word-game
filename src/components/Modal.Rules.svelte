<script>
  import { gameState } from "$stores/misc.js";
</script>

{#if $gameState === "pre"}
  <div>
    <h3>How to Play</h3>
    <ul>
      <li><strong>Goal:</strong> win more rounds than your opponent</li>
      <li><strong>Duration:</strong> 5 one-minute rounds</li>
      <li>
        <strong>Gameplay:</strong> Enter as many words as possible that satisfy a clue.
        <ul>
          <li>
            Example clue: <em>words that start with <strong>A</strong></em>
            . Answers: <em>apple</em>, <em>awesome</em>, <em>activate</em>, etc.
          </li>
          <li>No points awarded if your opponent has already entered it.</li>
          <li>Whoever gets more points at the end of the round wins the round.</li>
          <!-- <li>Less commonly used words yield more points.</li> -->
        </ul>
      </li>
    </ul>

    <h3>Rules</h3>
    <ul>
      <li>Only nouns, adjectives, and verbs</li>
      <li>4+ letter words</li>
      <li>No proper nouns</li>
      <li>No hyphenated words</li>
    </ul>
  </div>
{/if}

<style>
  div {
    max-width: 40em;
    margin: 0 auto;
  }

  h3 {
    margin-bottom: 0;
  }

  ul {
    margin-left: 1em;
  }
</style>
