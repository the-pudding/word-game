<script>
  import { tweened } from "svelte/motion";
  import { onMount, createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const start = 3;
  const end = -1;
  const duration = start * 1000;
  const countdown = tweened(start);

  $: if ($countdown <= end) dispatch("end");
  $: timer = $countdown < 0 ? "Begin!" : Math.floor($countdown) + 1;

  onMount(() => {
    countdown.set(end, { duration });
  });
</script>

<p>{timer}</p>

<style>
  p {
    text-align: center;
    font-size: 3em;
  }
</style>
