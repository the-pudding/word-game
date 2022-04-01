<script>
  import { guesses, wordsPlayed } from "$stores/misc.js";

  const duration = 2000;
  let timeout;
  let recent;
  let prev;
  let visible;
  let notFirst;

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
        notFirst = false;
      }, duration);
    } else if (!recent.first) {
      visible = true;
      notFirst = true;
      timeout = setTimeout(() => {
        recent = undefined;
        visible = false;
        notFirst = false;
      }, duration);
    } else visible = false;
  };
</script>

<div>
  {#if visible}
    <p>
      {recent.text}
      {#if notFirst}was used by opponent.{:else}is invalid{/if}
    </p>
  {/if}
</div>

<style>
  div {
    height: 2em;
    width: 100%;
    margin-bottom: 1rem;
  }

  p {
    text-align: center;
  }
</style>
