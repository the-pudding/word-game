<script>
  import { guesses } from "$stores/misc.js";
</script>

{#each $guesses as guess}
  <p>{JSON.stringify(guess)}</p>
{/each}
