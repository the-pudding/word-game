<script>
  import Board from "$components/Board.svelte";
  import Input from "$components/Input.svelte";
  import Clock from "$components/Clock.svelte";
  import Modal from "$components/Modal.svelte";
  import Score from "$components/Score.svelte";
  import { gameState, active, guesses } from "$stores/misc.js";
  import { elapsed } from "$stores/timer.js";

  // TODO 1 round of granny data
  // TODO valid response dictionary
  const isValid = (text) => {
    return true;
  };

  const getScore = ({ text, timestamp }) => {
    return 100;
  };

  const onSubmit = ({ detail }) => {
    const text = detail;
    const valid = isValid(text);
    const timestamp = $elapsed;
    const score = valid ? getScore({ text, timestamp }) : undefined;
    const guess = { text, valid, score, timestamp };
    $guesses = [...$guesses, guess];
  };

  const update = () => {
    $guesses = [];
  };

  $: update($active);
</script>

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
