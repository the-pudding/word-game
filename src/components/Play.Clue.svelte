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
    font-size: 3em;
    max-width: 60%;
    line-height: 1.2em;
    margin: 0 auto;
  }
</style>
