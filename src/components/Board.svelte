<script>
  import { guesses } from "$stores/misc.js";
</script>

{#each $guesses.user as guess}
  <p>{JSON.stringify(guess)}</p>
{/each}
