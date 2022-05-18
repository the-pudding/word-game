<script>
  import { onMount } from "svelte";
  import { browser } from "$app/env";
  import { page } from "$app/stores";
  import Meta from "$components/Meta.svelte";
  import App from "$components/App.svelte";
  import Login from "$components/Login.svelte";
  import { wod, wodId } from "$stores/misc.js";
  import { signOut } from "$utils/supabase.js";

  if (browser) console.log("svelte-starter version", __VERSION__);

  if (browser) {
    $wod = $page.url.pathname.includes("wod");
    $wodId = $page.url.search.split("id=")[1];
  }

  onMount(async () => {
    // TODO
    // await signOut();
  });

  let authorized;
</script>

<Meta />
{#if browser}
  {#if authorized}
    <App />
  {:else}
    <Login bind:authorized />
  {/if}
{/if}
