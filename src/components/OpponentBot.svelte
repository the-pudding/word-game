<script>
  import opponentData from "$data/opponent.csv";
  import { elapsed } from "$stores/timer.js";
  import { round, guesses, wordsPlayed } from "$stores/misc.js";

  const data = opponentData.map((d) => ({
    ...d,
    round: +d.round,
    timestamp: +d.timestamp,
    points: +d.points
  }));

  $: check($elapsed);

  const isTaken = ({ text, lemmas }) => {
    const existing = lemmas.split("|").filter((d) => $wordsPlayed.find((e) => d === e));
    return !!existing.length;
  };

  const validate = ({ text, lemmas }) => {
    const valid = isTaken({ text, lemmas });
    const reason = valid ? undefined : 0;
    return { valid, reason };
  };

  const check = () => {
    const guessIndex = data.findIndex((d) => d.round === $round && $elapsed >= d.timestamp);
    if (guessIndex > -1) {
      const [newGuess] = data.splice(guessIndex, 1);
      const guess = { ...newGuess, ...validate(newGuess) };
      $guesses.opponent[$round] = [...$guesses.opponent[$round], guess];
    }
  };
</script>
