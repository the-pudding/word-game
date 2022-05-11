<script>
  import { browser } from "$app/env";
  import { page } from "$app/stores";
  import Meta from "$components/Meta.svelte";
  import App from "$components/App.svelte";
  import { wod, wodId } from "$stores/misc.js";
  if (browser) console.log("svelte-starter version", __VERSION__);

  if (browser) {
    $wod = $page.url.pathname.includes("wod");
    const [_, id] = $page.url.search.split("id=");
    $wodId = id;
  }
</script>

<Meta />
{#if browser}
  <App />
{/if}
