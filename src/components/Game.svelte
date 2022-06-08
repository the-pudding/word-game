<script>
  import { onMount } from "svelte";
  import OpponentBot from "$components/OpponentBot.svelte";
  import Play from "$components/Play.svelte";
  import Modal from "$components/Modal.svelte";
  import { gameId, gameState, active, wod, wodId } from "$stores/misc.js";
  import loadClues from "$utils/loadClues.js";
  import loadAnswers from "$utils/loadAnswers.js";
  import loadJson from "$utils/loadJson.js";

  $: playVisible = $gameState === "mid" && $active;
  $: modalVisible = !$active || ["pre", "post"].includes($gameState);

  let clues;
  let answers;
  let loaded;

  const getId = async () => {
    if ($wod) return $wodId;

    const timestamp = Date.now();
    const url = `https://pudding.cool/projects/word-game-data/games.json?version=${timestamp}`;
    const { updated, games } = await loadJson(url);
    console.log("updated:", updated);
    const { id } = games.find((d) => d.live);
    return id;
  };

  onMount(async () => {
    // TODO handle errors of no clues
    $gameId = await getId();
    const clueData = await loadClues($gameId);
    clues = clueData.map((d) => d.clue);
    answers = await loadAnswers(clueData.map((d) => d.clueId));
    loaded = true;
  });
</script>

{#if $gameId}
  <OpponentBot />
{/if}

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
