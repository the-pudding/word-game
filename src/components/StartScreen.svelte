<script>
  import { active, round } from "$stores/misc.js";

  const onBegin = () => {
    $active = true;
    $round += 1;
  };
</script>

<h1>Are you ready???</h1>

<button on:click={onBegin}>Begin</button>
