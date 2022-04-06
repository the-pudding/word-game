<script>
  import { guesses } from "$stores/misc.js";

  const duration = 2000;
  let timeout;
  let visible = false;
  let prevGuessCount = 0;

  const reasons = [
    "was played by opponent",
    "is too short",
    "contains non-letters",
    "is not in the word list",
    "was already entered"
  ];

  $: recent = $guesses.user[$guesses.user.length - 1];
  $: if (recent && $guesses.user.length !== prevGuessCount) update();
  $: if (!$guesses.user.length) prevGuessCount = 0;

  const update = () => {
    prevGuessCount = $guesses.user.length;
    clearTimeout(timeout);

    if (!recent.valid) {
      visible = true;
      timeout = setTimeout(() => (visible = false), duration);
    } else visible = false;
  };
</script>

<div>
  {#if visible}
    <p>
      <strong>{recent.text}</strong>
      {reasons[recent.reason]}
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
