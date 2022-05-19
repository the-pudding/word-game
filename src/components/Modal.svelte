<script>
  import { active, round, roundScore, gameState, totalScore, wod, wodId } from "$stores/misc.js";
  import Countdown from "$components/Modal.Countdown.svelte";
  import Recap from "$components/Modal.Recap.svelte";
  import Pregame from "$components/Modal.Pregame.svelte";
  import PregameWOD from "$components/Modal.PregameWOD.svelte";
  import PostgameWOD from "$components/Modal.PostgameWOD.svelte";
  import Feedback from "$components/Modal.Feedback.svelte";
  import { update } from "$utils/supabase.js";

  export let loaded;

  let showCountdown = false;
  let wodReady;

  const buttonOptions = {
    pre: "Begin game",
    mid: "Next round"
  };

  const onBegin = () => {
    if ($wod) update({ table: "games", column: "wod_started", value: true, id: $wodId });
    showCountdown = true;
  };

  const startRound = () => {
    $active = true;
    $round += 1;
    showCountdown = false;
  };

  $: buttonText = buttonOptions[$gameState];
</script>

{#if $gameState === "pre"}
  {#if $wod}
    <PregameWOD bind:wodReady />
  {:else}
    <Pregame />
  {/if}
{/if}
{#if $gameState !== "pre"}
  <Recap />
{/if}
{#if $gameState === "post"}
  {#if $wod}
    <PostgameWOD />
  {:else}
    <!-- <Postgame /> -->
    <Feedback />
  {/if}
{/if}

<!-- button to start round -->
{#if buttonText}
  {#if !$wod || ($wod && wodReady)}
    <p>
      {#if loaded}
        <button on:click={onBegin}>{buttonText}</button>
      {:else}
        <span>loading...</span>
      {/if}
    </p>
  {/if}
{/if}

<!-- countdown timer -->
{#if showCountdown}
  <Countdown on:end={startRound} />
{/if}

<style>
  p {
    text-align: center;
    font-size: 2em;
  }
</style>
