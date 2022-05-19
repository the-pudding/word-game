<script>
  import { onMount } from "svelte";
  import OpponentBot from "$components/OpponentBot.svelte";
  import Play from "$components/Play.svelte";
  import Modal from "$components/Modal.svelte";
  import { gameState, active, wod, wodId } from "$stores/misc.js";
  import loadClues from "$utils/loadClues.js";
  import loadAnswers from "$utils/loadAnswers.js";

  $: playVisible = $gameState === "mid" && $active;
  $: modalVisible = !$active || ["pre", "post"].includes($gameState);

  let clues;
  let answers;
  let loaded;

  onMount(async () => {
    // choose game id
    // todaysgame.csv - game id
    // TODO dynamic choose from csv or wodId
    // const id = $wodId;
    const id = "1ad8fe95-2087-483a-be9a-bb815fe699ea";
    const clueData = await loadClues(id);
    clues = clueData.map((d) => d.clue);
    answers = await loadAnswers(clueData.map((d) => d.clueId));
    console.log({ answers });
    loaded = true;
  });
</script>

<!-- renderless -->
<OpponentBot />

{#if playVisible}
  <section id="play">
    <Play {clues} {answers} />
  </section>
{/if}

{#if modalVisible}
  <section id="modal">
    <Modal {loaded} />
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
