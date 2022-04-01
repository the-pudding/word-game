<script>
  import OpponentBot from "$components/OpponentBot.svelte";
  import Play from "$components/Play.svelte";
  import Modal from "$components/Modal.svelte";
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
  $: if (!$active && $gameState !== "pre") updateScore();
  $: playVisible = $gameState === "mid" && $active;
  $: modalVisible = !$active || ["pre", "post"].includes($gameState);
</script>

<!-- renderless -->
<OpponentBot />

{#if playVisible}
  <section id="play">
    <Play />
  </section>
{/if}

{#if modalVisible}
  <section id="modal">
    <Modal />
  </section>
{/if}

<style>
  section {
    height: 75vh;
    max-width: 60rem;
    margin: 0 auto;
    padding: 1rem;
  }
  #play {
    background: lightgoldenrodyellow;
  }

  #modal {
    background: lightsteelblue;
  }
</style>
