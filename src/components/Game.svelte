<script>
  import OpponentBot from "$components/OpponentBot.svelte";
  import Board from "$components/Board.svelte";
  import Input from "$components/Input.svelte";
  import Clock from "$components/Clock.svelte";
  import Modal from "$components/Modal.svelte";
  import RoundScore from "$lib/components/RoundScore.svelte";
  import { gameState, active, guesses, wordsPlayed, roundScore, gameScore } from "$stores/misc.js";
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

  const resetGuesses = () => {
    $guesses.user = [];
    $guesses.opponent = [];
  };

  const updateScore = () => {
    if ($roundScore.user === $roundScore.opponent) return;
    const userWon = $roundScore.user > $roundScore.opponent;
    if (userWon) $gameScore.user += 1;
    else $gameScore.opponent += 1;
  };

  $: if ($active && $gameState === "mid") resetGuesses();
  $: if (!$active && $gameState === "mid") updateScore();
</script>

<OpponentBot />

{#if $gameState === "pre"}
  <Modal buttonText="Begin">
    <h2>Are you ready??</h2>
  </Modal>
{/if}

{#if $gameState === "mid"}
  <Board />
  <!-- <Feedback /> -->
  <!-- <Clue /> -->

  <Input on:submit={onSubmit} />
  <Clock />
  <RoundScore />

  {#if !$active}
    <Modal buttonText="Next round">
      <p>Someone won!</p>
    </Modal>
  {/if}
{/if}

{#if $gameState === "post"}
  <p>Good game!</p>
{/if}
