<script>
  import { guesses, wordsPlayed } from "$stores/misc.js";

  const duration = 2000;
  let timeout;
  let recent;
  let prev;
  let visible;

  $: recent = $guesses.user[$guesses.user.length - 1];
  $: if (recent && prev !== recent.text) update();
  $: if (!$guesses.user.length) prev = undefined;

  const update = () => {
    prev = recent.text;
    clearTimeout(timeout);

    if (!recent.valid) {
      visible = true;
      timeout = setTimeout(() => {
        recent = undefined;
        visible = false;
      }, duration);
    } else visible = false;
  };
</script>

{#if visible}
  <p>{recent.text} is invalid!</p>
{/if}
