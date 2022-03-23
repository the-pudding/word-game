<script>
  export let guesses = [];

  $: console.log(guesses);
</script>

{#each guesses as guess}
  <p>{guess}</p>
{/each}
