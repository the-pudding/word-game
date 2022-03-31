<script>
  import { guesses } from "$stores/misc.js";

  $: validGuesses = $guesses.user.filter((d) => d.valid);
</script>

{#each validGuesses as { first, text }}
  <p class:first>{text}</p>
{/each}

<style>
  p {
    color: lightgrey;
  }
  .first {
    color: green;
  }
</style>
