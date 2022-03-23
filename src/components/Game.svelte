<script>
  import Board from "$components/Board.svelte";
  import Input from "$components/Input.svelte";
  import Clock from "$components/Clock.svelte";
  import StartScreen from "$components/StartScreen.svelte";
  import { gameState } from "$stores/misc.js";

  let guesses = [];
  const onSubmit = ({ detail }) => {
    // validate guess
    // render response
    // update board
    // update score
    // store data
    guesses = [...guesses, detail];
  };
</script>

<p>{$gameState}</p>
{#if $gameState === "pre"}
  <StartScreen />
{/if}

<Board {guesses} />
<Input on:submit={onSubmit} />
<Clock />
