<script>
  import Item from "$components/Play.Guesses.Item.svelte";
  export let guesses;
  export let opponent = false;
</script>

<ul>
  {#each guesses as { valid, text, guessedByUserLate, points } (text)}
    <Item {opponent} {valid} {text} {guessedByUserLate} {points} />
  {/each}
</ul>

<style>
  ul {
    width: calc(50% - 1rem);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  }
</style>
