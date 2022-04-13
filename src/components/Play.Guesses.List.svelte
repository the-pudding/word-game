<script>
  export let guesses;
  export let opponent = false;

  const redact = (text, valid) =>
    opponent && valid
      ? text
          .split("")
          .map(() => "█")
          .join("")
      : text;
</script>

<ul class:opponent>
  {#each guesses as { valid, text }}
    <li class:invalid={!valid}>{redact(text, valid)}</li>
  {/each}
</ul>

<style>
  ul {
    width: calc(50% - 1rem);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  li {
    color: var(--color-green);
    font-weight: bold;
    list-style-type: none;
    text-align: center;
    display: inline-block;
  }

  li.invalid {
    color: var(--color-gray-500);
    font-weight: normal;
  }

  .opponent li {
    background: var(--color-green);
  }

  .opponent li.invalid {
    background: none;
  }
</style>
