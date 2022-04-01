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
</script>

<!-- renderless -->
<OpponentBot />

<section id="play" class:visible={playVisible}>
  <Play />
</section>

<section id="modal" class:visible={modalVisible}>
  <Modal />
</section>

<style>
  section {
    display: none;
  }

  section.visible {
    display: block;
  }

  #play {
    background: lightgoldenrodyellow;
  }

  #modal {
    background: lightpink;
  }
</style>
