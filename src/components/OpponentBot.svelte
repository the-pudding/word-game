<script>
  import grannyData from "$data/granny.csv";
  import { elapsed } from "$stores/timer.js";
  import { guesses, wordsPlayed } from "$stores/misc.js";

  const data = grannyData.map((d) => ({
    ...d,
    valid: true,
    timestamp: +d.timestamp,
    points: +d.points
  }));

  $: check($elapsed);

  // TODO reuse
  const getFirst = (text) => !$wordsPlayed.includes(text);

  const check = () => {
    const newGuess = data.find((d) => $elapsed >= d.timestamp);
    if (newGuess) {
      const guess = { ...data.shift() };
      guess.first = getFirst(guess.text);
      $guesses.opponent = [...$guesses.opponent, guess];
    }
  };
</script>
