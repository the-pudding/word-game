<script>
  import { overlay } from "$stores/misc.js";
</script>

<h2>Title TK Word Game</h2>

<p>One person a day gets the chance to play against the world in a game of words.</p>

<p>
  Today that person is <strong>Michelle from Oakland, CA</strong>. She <em>really</em> likes boba. Can
  you beat her?
</p>

<p>
  Do you want to be the <strong>Word Opponent of the Day?</strong> Sign up here to be in the running.
</p>
<button>BIG SIGNUP BUTTON</button>
<p>
  <button
    on:click={() => {
      $overlay = "rules";
    }}>How to Play</button
  >
</p>

<style>
  h2 {
    font-size: 2em;
    text-align: center;
    max-width: 23em;
    margin: 1rem auto;
  }
</style>
