<script>
  import opponentData from "$data/opponent.csv";
  import { elapsed } from "$stores/timer.js";
  import { round, guesses, lemmasPlayed } from "$stores/misc.js";
  import lemmaExists from "$utils/lemmaExists.js";

  const data = opponentData.map((d) => ({
    ...d,
    round: +d.round,
    timestamp: +d.timestamp,
    points: +d.points
  }));

  $: check($elapsed);

  const isTaken = (lemmas) => {
    const corpus = $lemmasPlayed.map((d) => d.text);
    return lemmaExists({ lemmas, corpus });
  };

  const validate = ({ lemmas }) => {
    const valid = !isTaken(lemmas);
    const reason = valid ? undefined : 0;
    return { valid, reason };
  };

  const check = () => {
    const guessIndex = data.findIndex((d) => d.round === $round && $elapsed >= d.timestamp);
    if (guessIndex > -1) {
      const [newGuess] = data.splice(guessIndex, 1);
      const guess = { ...newGuess, ...validate(newGuess) };
      console.log(guess);
      $guesses.opponent[$round] = [...$guesses.opponent[$round], guess];
    }
  };
</script>
