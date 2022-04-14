<script>
  export let guesses;
  export let opponent = false;

  const redact = ({ valid, text, guessedByUser }) => {
    return opponent && valid && !guessedByUser
      ? text
          .split("")
          .map(() => "▉")
          .join("")
      : text;
  };
</script>

<ul class:opponent>
  {#each guesses as { valid, text, guessedByUser }}
    <li class:invalid={!valid}>
      {redact({ valid, text, guessedByUser })}
    </li>
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
</style>
