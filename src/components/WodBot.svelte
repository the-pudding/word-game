<script>
  import { onMount } from "svelte";
  import { elapsed } from "$stores/timer.js";
  import { gameId, round, guesses, lemmasPlayed } from "$stores/misc.js";
  import lemmaExists from "$utils/lemmaExists.js";
  import loadWodAnswers from "$utils/loadWodAnswers.js";

  let data = [];

  const loadData = async () => {
    data = await loadWodAnswers($gameId);
  };

  $: check($elapsed);

  const isTaken = (lemmas) => {
    const corpus = $lemmasPlayed;
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
      $guesses.wod[$round] = [...$guesses.wod[$round], guess];
    }
  };

  onMount(async () => {
    data = await loadWodAnswers($gameId);
  });
</script>
