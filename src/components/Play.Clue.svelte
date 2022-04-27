<script>
  export let clue;
</script>

<div>
  <p class="instructions">Type as many words as you can that...</p>
  <p class="clue">{@html clue}</p>
</div>

<style>
  div {
    text-align: center;
  }

  p {
    margin: 0;
  }

  .clue {
    font-size: 1.5em;
    max-width: 60%;
    line-height: 1.2;
    margin: 0 auto;
  }
  @media (min-width: 768px) {
    .clue {
      font-size: 3em;
    }
  }

  :global(.clue small) {
    font-size: 0.4em;
    display: block;
  }
</style>
