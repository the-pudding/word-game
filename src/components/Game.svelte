<script>
  import GrannyBot from "$components/GrannyBot.svelte";
  import Board from "$components/Board.svelte";
  import Input from "$components/Input.svelte";
  import Clock from "$components/Clock.svelte";
  import Modal from "$components/Modal.svelte";
  import Score from "$components/Score.svelte";
  import { gameState, active, guesses, wordsPlayed } from "$stores/misc.js";
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
    $guesses = [...$guesses, guess];
  };

  const update = () => {
    $guesses = [];
  };

  $: update($active);
</script>

<GrannyBot />

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
  <Score />

  {#if !$active}
    <Modal buttonText="Next round">
      <p>Someone won!</p>
    </Modal>
  {/if}
{/if}

{#if $gameState === "post"}
  <p>Good game!</p>
{/if}
