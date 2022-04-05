<script>
  import { guesses } from "$stores/misc.js";

  const duration = 2000;
  let timeout;
  let recent;
  let prev;
  let visible;
  let notFirst;
  let duplicate;

  $: recent = $guesses.user[$guesses.user.length - 1];
  $: if (recent) update();
  $: if (!$guesses.user.length) prev = undefined;

  const resetTimeout = () => {
    timeout = setTimeout(() => {
      recent = undefined;
      visible = false;
      notFirst = false;
    }, duration);
  };

  const update = () => {
    prev = recent.text;
    clearTimeout(timeout);

    // TODO refactor
    if (!recent.valid) {
      visible = true;
      notFirst = false;
      duplicate = false;

      resetTimeout();
    } else if (recent.duplicate) {
      visible = true;
      notFirst = false;
      duplicate = true;

      resetTimeout();
    } else if (!recent.first) {
      visible = true;
      notFirst = true;
      duplicate = false;

      resetTimeout();
    } else visible = false;
  };
</script>

<div>
  {#if visible}
    <p>
      {recent.text}
      {#if notFirst}
        was used by the opponent.
      {:else if duplicate}
        is a duplicate.
      {:else}is invalid{/if}
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
