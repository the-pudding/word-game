<script>
  import { timer, elapsed } from "$stores/timer.js";
  import { active } from "$stores/misc.js";

  const MS = 1000;
  const target = 60 * MS;

  $: update($active);
  $: secondsLeft = Math.floor((target - $elapsed) / MS);
  $: if (secondsLeft <= 0) $active = false;

  const update = (isActive) => {
    if (isActive) {
      timer.reset();
      timer.start();
    } else {
      timer.stop();
    }
  };
</script>

<p>{secondsLeft} seconds left</p>

<style>
  p {
    font-size: 4em;
    padding: 1rem;
  }
</style>
