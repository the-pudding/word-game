<script>
  import List from "$components/Play.Guesses.List.svelte";
  import { guesses, round, wod } from "$stores/misc.js";
  const takenCode = 0;
  const displayFilter = (d) => d.reason === undefined || d.reason === takenCode;

  $: userGuesses = $guesses.user[$round].filter(displayFilter);
  $: wodGuesses = $guesses.wod[$round].filter(displayFilter);
</script>

<div>
  <List guesses={userGuesses} />
  {#if !$wod}
    <List guesses={wodGuesses} wod={true} />
  {/if}
</div>

<style>
  div {
    display: flex;
    justify-content: center;
    width: 100%;
  }
</style>
