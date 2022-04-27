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
    margin: 0 auto;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    padding: 4rem 1rem 1rem 1rem;
  }

  #play {
    /* background: lightgoldenrodyellow; */
  }

  #modal {
    /* background: lightsteelblue; */
  }
</style>
