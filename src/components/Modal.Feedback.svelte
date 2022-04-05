<script>
  import { gameState, history } from "$stores/misc.js";
  import { copy } from "svelte-copy";

  $: output = JSON.stringify($history);
</script>

{#if $gameState === "post"}
  <a
    href="https://docs.google.com/forms/d/e/1FAIpQLSfz7b8wUo0Cqsy4TKkqjyFzPDA9gGu2uHGnS9tl5zLsEUWglw/viewform?usp=sf_link"
    target="_blank">Click here</a
  >
  to give us feedback!

  <textarea style="width: 100%;">{output}</textarea>
  <button use:copy={output}> Copy to clipboard </button>
{/if}

<style>
  textarea {
    margin: 1em 0;
  }
</style>
