<script>
  import OpponentBot from "$components/OpponentBot.svelte";
  import Play from "$components/Play.svelte";
  import Modal from "$components/Modal.svelte";
  import { gameState, active } from "$stores/misc.js";

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
