<script>
  import { overlay } from "$stores/misc.js";
  import { getContext } from "svelte";

  const { byline, source } = getContext("copy");

  const close = () => {
    $overlay = undefined;
  };
</script>

<section on:click={close} class:visible={$overlay === "about"}>
  <div>
    <h3>About</h3>
    <p>
      {@html byline}
    </p>
    <p>
      {@html source}
    </p>
    <p><button on:click={close}>CLOSE</button></p>
  </div>
</section>

<style>
  section {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    padding: 4rem 1rem;
    z-index: var(--z-overlay);
  }

  div {
    max-width: 40rem;
    margin: 0 auto;
  }

  .visible {
    display: block;
  }
</style>
