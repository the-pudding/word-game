<script>
  import { active, round } from "$stores/misc.js";

  export let buttonText = "";

  const onBegin = () => {
    $active = true;
    $round += 1;
  };
</script>

<slot />
<button on:click={onBegin}>{buttonText}</button>
