<script>
  import Guesses from "$components/Guesses.svelte";
  import Input from "$components/Input.svelte";
  import Clock from "$components/Clock.svelte";
  import Clue from "$components/Clue.svelte";
  import RoundScore from "$lib/components/RoundScore.svelte";
  import Invalid from "$components/Invalid.svelte";
  import { guesses, wordsPlayed } from "$stores/misc.js";
  import { elapsed } from "$stores/timer.js";
  import testData from "$data/test.csv";

  const validWords = testData.map((d) => d.word);
  const isValid = (text) => validWords.includes(text);

  const getPoints = ({ text, timestamp }) => {
    const { points } = testData.find((d) => d.word === text);
    return +points;
  };

  const getFirst = (text) => !$wordsPlayed.includes(text);

  const onSubmit = ({ detail }) => {
    const text = detail;
    const valid = isValid(text);
    const timestamp = $elapsed;
    const points = valid ? getPoints({ text, timestamp }) : undefined;
    const first = valid ? getFirst(text) : undefined;
    const guess = { text, valid, points, timestamp, first };
    $guesses.user = [...$guesses.user, guess];
  };
</script>

<Clue />
<Guesses />

<Invalid />

<Input on:submit={onSubmit} />
<Clock />
<RoundScore />
