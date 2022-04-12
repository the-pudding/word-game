<script>
  import Guesses from "$components/Play.Guesses.svelte";
  import Input from "$components/Play.Input.svelte";
  import Clock from "$components/Play.Clock.svelte";
  import Clue from "$components/Play.Clue.svelte";
  import Score from "$components/Play.Score.svelte";
  import Invalid from "$components/Play.Invalid.svelte";
  import { guesses, wordsPlayed, round, score } from "$stores/misc.js";
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
    "rhyme with <strong>RED</strong><small>(words must end with the same sound)</small>"
  ];

  $: currentClue = clues[$round];
  $: roundData = allData[$round];

  $: validWords = roundData.map((d) => d.word);
  const isWordlist = (text) => !validWords.includes(text);
  const isTaken = (text) => !$wordsPlayed.includes(text);
  const isDuplicate = (text) => $guesses.user[$round].filter((d) => d.text === text).length > 0;
  const isNotAlpha = (text) => new RegExp(/([^a-z])/, "g").test(text);

  const validate = (text) => {
    let valid = true;
    let reason;
    if (text.length < 4) {
      valid = false;
      reason = 1;
    } else if (isNotAlpha(text)) {
      valid = false;
      reason = 2;
    } else if (isWordlist(text)) {
      valid = false;
      reason = 3;
    } else if (isDuplicate(text)) {
      valid = false;
      reason = 4;
    } else if (!isTaken(text)) {
      valid = false;
      reason = 0;
    }

    return { valid, reason };
  };

  const getPoints = ({ text, timestamp }) => {
    return 1;
    // const { points } = roundData.find((d) => d.word === text);
    // return +points;
  };

  const onSubmit = ({ detail }) => {
    const text = detail;
    const { valid, reason } = validate(text);
    const timestamp = $elapsed;
    const points = valid ? getPoints({ text, timestamp }) : undefined;
    const guess = { text, points, timestamp, round: $round, valid, reason };
    $guesses.user[$round] = [...$guesses.user[$round], guess];
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
