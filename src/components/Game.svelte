<script>
  import { onMount } from "svelte";
  import OpponentBot from "$components/OpponentBot.svelte";
  import Play from "$components/Play.svelte";
  import Modal from "$components/Modal.svelte";
  import { gameState, active, wod, wodId } from "$stores/misc.js";
  import loadClues from "$utils/loadClues.js";
  import loadAnswers from "$utils/loadAnswers.js";
  import loadCsv from "$utils/loadCsv.js";

  $: playVisible = $gameState === "mid" && $active;
  $: modalVisible = !$active || ["pre", "post"].includes($gameState);

  let clues;
  let answers;
  let loaded;

  const getId = async () => {
    console.log($wod);
    if ($wod) return $wodId;

    const timestamp = Date.now();
    const url = `https://pudding.cool/projects/word-game-data/games.csv?version=${timestamp}`;
    const raw = await loadCsv(url);
    const data = raw.map((d) => ({
      ...d,
      live: d.live === "true"
    }));
    console.log(data);
    const { id } = data.find((d) => d.live);
    return id;
  };

  onMount(async () => {
    // TODO handle errors of no clues
    const id = await getId();
    console.log(id);
    const clueData = await loadClues(id);
    clues = clueData.map((d) => d.clue);
    answers = await loadAnswers(clueData.map((d) => d.clueId));
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
