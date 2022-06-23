<script>
  import { setContext } from "svelte";
  import { browser } from "$app/env";
  import { page } from "$app/stores";
  import Meta from "$components/Meta.svelte";
  import App from "$components/App.svelte";
  import Login from "$components/Login.svelte";
  import { wod, wodId } from "$stores/misc.js";
  import { signOut } from "$utils/supabase.js";
  import version from "$utils/version.js";
  import copy from "$data/copy.json";

  version();

  const { title, description, url, keywords } = copy;
  setContext("copy", copy);

  if (browser) {
    $wod = $page.url.pathname.includes("wod");
    $wodId = $page.url.search.split("id=")[1];
  }

  let authorized;
</script>

<Meta />
{#if browser}
  {#if authorized}
    <App />
  {:else}
    <p>qbcfso</p>
    <Login bind:authorized />
  {/if}
{/if}
