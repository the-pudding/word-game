<script>
  import { overlay } from "$stores/misc.js";
</script>

<h2>Welcome, WOD!</h2>
<p>Let's play a word game!</p>

<p>Tell us about yourself:</p>
<form>
  <input placeholder="email" />
  <input placeholder="name" />
  <label>Emoji when you are sad?</label>
  <input placeholder="emoji here" />
</form>
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
