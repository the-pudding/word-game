<script>
  import { gameState } from "$stores/misc.js";
  import { copy } from "svelte-copy";
</script>

{#if $gameState === "post"}
  <textarea style="width: 100%;">{output}</textarea>
  <button use:copy={output}> Copy to clipboard </button>
{/if}
