<script>
  import { onMount } from "svelte";
  import Guesses from "$components/Play.Guesses.svelte";
  import Input from "$components/Play.Input.svelte";
  import Clock from "$components/Play.Clock.svelte";
  import Clue from "$components/Play.Clue.svelte";
  import Score from "$components/Play.Score.svelte";
  import Invalid from "$components/Play.Invalid.svelte";
  import { guesses, lemmasPlayed, round, possibleAnswers, wodId } from "$stores/misc.js";
  import lemmaExists from "$utils/lemmaExists.js";

  import { elapsed } from "$stores/timer.js";

  // import testData1 from "$data/testdata-f.csv";
  // import testData2 from "$data/testdata-7.csv";
  // import testData3 from "$data/testdata-th.csv";
  // import testData4 from "$data/testdata-same.csv";

  // const answers = [testData1, testData1, testData1, testData1];

  // const clues = [
  //   "are nouns that start with <strong>F</strong>",
  //   "are nouns that start with <strong>F</strong>",
  //   "are nouns that start with <strong>F</strong>",
  //   "are nouns that start with <strong>F</strong>"
  // ];
  // 	 "have 7 letters",
  //   "that contain <strong>TH</strong>",
  //   "that start and end with the same letter"

  export let clues;
  export let answers;

  $: currentClue = clues[$round];
  $: roundData = answers[$round];
  $: $possibleAnswers = roundData;

  $: validWords = roundData.map((d) => d.word);

  const lookupLemmas = (text) => {
    const match = roundData.find((d) => d.word === text);
    return match ? match.lemmas : "";
  };

  const isWordlist = (text) => !validWords.includes(text);

  const isTaken = ({ text, lemmas }) => {
    const corpus = $lemmasPlayed;
    return lemmaExists({ lemmas, corpus });
  };

  const isDuplicate = ({ text, lemmas }) => {
    const corpus = $guesses.user[$round].map((d) => d.lemmas);
    return lemmaExists({ lemmas, corpus });
  };

  const isNotAlpha = (text) => new RegExp(/([^a-z])/, "g").test(text);

  const validate = ({ text, lemmas }) => {
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
    } else if (isDuplicate({ text, lemmas })) {
      valid = false;
      reason = 4;
    } else if (isTaken({ text, lemmas })) {
      valid = false;
      reason = 0;
    }

    return { valid, reason };
  };

  const getPoints = ({ text, timestamp }) => {
    const { points } = roundData.find((d) => d.word === text);
    return +points;
  };

  const checkRevealWod = (lemmas) => {
    $guesses.wod[$round].forEach((guess) => {
      const corpus = guess.lemmas.split("|");
      const exists = lemmaExists({ lemmas, corpus });
      if (exists) guess.revealWod = true;
    });
  };

  const onSubmit = async ({ detail }) => {
    const text = detail;
    const lemmas = lookupLemmas(text);
    const { valid, reason } = validate({ text, lemmas });
    const timestamp = $elapsed;
    const points = valid ? getPoints({ text, timestamp }) : undefined;
    const guess = { text, lemmas, points, timestamp, round: $round, valid, reason };
    $guesses.user[$round] = [...$guesses.user[$round], guess];
    checkRevealWod(lemmas);
  };
</script>

<div class="play">
  <Clue clue={currentClue} />
  <Clock />

  <div class="board">
    <Input on:submit={onSubmit} />
    <Guesses />
    <Score />
    <Invalid />
  </div>
</div>

<style>
  .play {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .board {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;
    min-height: 430px;
    max-width: 40rem;
    margin: 0 auto;
  }
</style>
