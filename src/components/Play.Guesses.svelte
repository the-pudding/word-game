<script>
  import List from "$components/Play.Guesses.List.svelte";
  import { guesses, round } from "$stores/misc.js";
  const takenCode = 0;
  const displayFilter = (d) => d.reason === undefined || d.reason === takenCode;

  $: userGuesses = $guesses.user[$round].filter(displayFilter);
  $: opponentGuesses = $guesses.opponent[$round].filter(displayFilter);
</script>

<div>
  <List guesses={userGuesses} />
  <List guesses={opponentGuesses} opponent={true} />
</div>

<style>
  div {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
</style>
