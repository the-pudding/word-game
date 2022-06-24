<script>
  import { wodId } from "$stores/misc.js";
  import { signIn, getGameColumn } from "$utils/supabase.js";

  export let authorized;

  let email = "russellgoldenberg@gmail.com";
  let password = "qbcfso";
  let error;

  const onSubmit = async () => {
    try {
      const loggedIn = await signIn({ email, password });
      const hasStarted = await getGameColumn({ gameId: $wodId, column: "wod_started" });
      authorized = loggedIn && !hasStarted;
      // TODO real contact info
      if (hasStarted) error = "You already started playing";
    } catch (err) {
      console.log(err);
      error = err;
    }
  };
</script>

<section>
  {#if $wodId}
    <form on:submit|preventDefault={onSubmit}>
      <div>
        <label for="email">email</label>
        <input bind:value={email} id="email" placeholder="email" />
      </div>
      <div>
        <label for="password">password</label>
        <input bind:value={password} id="password" placeholder="password" type="password" />
      </div>
      <button type="submit">Submit</button>
    </form>

    {#if error}
      <p class="error">{error}. please contact the admin: russell@pudding.cool.</p>
    {/if}
  {:else}
    <p>no game id in URL, please contact the admin: russell@pudding.cool.</p>
  {/if}
</section>

<style>
  section {
    padding: 1rem;
  }

  div {
    margin-bottom: 1rem;
  }

  label,
  input {
    display: block;
  }

  input {
    padding: 0.5rem;
  }

  .error {
    padding: 1rem;
    background: pink;
  }
</style>
