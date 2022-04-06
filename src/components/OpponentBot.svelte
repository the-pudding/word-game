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

  // TODO reuse
  const isValid = (text) => !$wordsPlayed.includes(text);

  const check = () => {
    const newGuess = data.find((d) => d.round === $round && $elapsed >= d.timestamp);
    if (newGuess) {
      const guess = { ...data.shift() };
      guess.valid = isValid(guess.text);
      $guesses.opponent = [...$guesses.opponent, guess];
    }
  };
</script>
