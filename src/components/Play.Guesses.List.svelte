<script>
  import Item from "$components/Play.Guesses.Item.svelte";
  export let guesses;
  export let wod = false;
</script>

<ul>
  {#each guesses as { valid, text, revealWod, points } (text)}
    <Item {wod} {valid} {text} {revealWod} {points} />
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
