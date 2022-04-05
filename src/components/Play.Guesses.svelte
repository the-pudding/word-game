<script>
  import { guesses } from "$stores/misc.js";

  $: validGuesses = $guesses.user.filter((d) => d.valid && !d.duplicate);
</script>

<ul>
  {#each validGuesses as { first, text }}
    <li class:first>{text}</li>
  {/each}
</ul>

<style>
  ul {
    /* background: blue;
    flex-grow: 1; */
  }

  li {
    color: var(--color-gray-500);
    list-style-type: none;
    text-align: center;
  }

  .first {
    color: var(--color-green);
    font-weight: bold;
  }
</style>
