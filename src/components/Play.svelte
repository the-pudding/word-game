<script>
  import Guesses from "$components/Play.Guesses.svelte";
  import Input from "$components/Play.Input.svelte";
  import Clock from "$components/Play.Clock.svelte";
  import Clue from "$components/Play.Clue.svelte";
  import Score from "$components/Play.Score.svelte";
  import Invalid from "$components/Play.Invalid.svelte";
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

<div>
  <Clue />

  <Clock />
  <Score />

  <div class="words">
    <Guesses />
    <Invalid />
    <Input on:submit={onSubmit} />
  </div>
</div>

<style>
  div {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .words {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;
  }
</style>
