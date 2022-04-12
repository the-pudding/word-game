<script>
  import { guesses, round } from "$stores/misc.js";
  const takenCode = 0;

  $: validGuesses = $guesses.user[$round].filter(
    (d) => d.reason === undefined || d.reason === takenCode
  );
</script>

<ul>
  {#each validGuesses as { reason, text }}
    <li class:invalid={reason === takenCode}>{text}</li>
  {/each}
</ul>

<style>
  li {
    color: var(--color-green);
    font-weight: bold;
    list-style-type: none;
    text-align: center;
  }

  .invalid {
    color: var(--color-gray-500);
    font-weight: normal;
  }
</style>
