<script>
  import Guesses from "$components/Play.Guesses.svelte";
  import Input from "$components/Play.Input.svelte";
  import Clock from "$components/Play.Clock.svelte";
  import Clue from "$components/Play.Clue.svelte";
  import Score from "$components/Play.Score.svelte";
  import Invalid from "$components/Play.Invalid.svelte";
  import { guesses, wordsPlayed, round } from "$stores/misc.js";
  import { elapsed } from "$stores/timer.js";
  import testData1 from "$data/testdata-same.csv";
  import testData2 from "$data/testdata-x.csv";
  import testData3 from "$data/testdata-t.csv";
  import testData4 from "$data/testdata-m.csv";
  import testData5 from "$data/testdata-red.csv";

  const allData = [testData1, testData2, testData3, testData4, testData5];
  const clues = [
    "start and end with the same letter",
    "contain the letter <strong>X</strong>",
    "are adjectives that start with <strong>T</strong>",
    "have 5 letters and start with <strong>M</strong>",
    "rhyme with <strong>RED</strong>"
  ];
  $: currentClue = clues[$round];
  $: roundData = allData[$round];

  $: validWords = roundData.map((d) => d.word);
  const isValid = (text) => validWords.includes(text);

  const getPoints = ({ text, timestamp }) => {
    return 1;
    // const { points } = roundData.find((d) => d.word === text);
    // return +points;
  };

  const getFirst = (text) => !$wordsPlayed.includes(text);

  const onSubmit = ({ detail }) => {
    const text = detail;
    const valid = isValid(text);
    const timestamp = $elapsed;
    const points = valid ? getPoints({ text, timestamp }) : undefined;
    const first = valid ? getFirst(text) : undefined;
    const guess = { text, valid, points, timestamp, first, round: $round };
    $guesses.user = [...$guesses.user, guess];
  };
</script>

<div>
  <Clue clue={currentClue} />

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
