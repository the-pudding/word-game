<script>
  import OpponentBot from "$components/OpponentBot.svelte";
  import Play from "$components/Play.svelte";
  import Modal from "$components/Modal.svelte";
  import RoundScore from "$lib/components/RoundScore.svelte";
  import { gameState, active, guesses, roundScore, gameScore } from "$stores/misc.js";

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
  $: playVisible = $gameState === "mid" && $active;
  $: modalVisible = !$active || ["pre", "post"].includes($gameState);

  const buttonText = {
    pre: "Begin game",
    mid: "Next round"
  };
</script>

<!-- renderless -->
<OpponentBot />

<section class:visible={playVisible}>
  <Play />
</section>

<section class:visible={modalVisible}>
  <Modal buttonText={buttonText[$gameState]}>
    {#if $gameState === "pre"}
      <h2>Are you ready??</h2>
    {:else if $gameState === "mid" && !$active}
      <p>Someone won!</p>
    {:else if $gameState === "post"}
      <p>Good game!</p>
    {/if}
  </Modal>
</section>

<style>
  section {
    display: none;
  }

  section.visible {
    display: block;
  }
</style>
