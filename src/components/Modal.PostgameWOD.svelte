<script>
  import { onMount } from "svelte";
  import { insert, update } from "$utils/supabase.js";
  import { guesses, wodId } from "$stores/misc.js";

  let success;

  $: message = success
    ? "Game successfully submitted!"
    : "There was an error submitting your game. Please contact admins.";

  onMount(async () => {
    try {
      const flat = [].concat(...$guesses.user);
      const data = flat
        .filter((d) => d.valid)
        .map((d) => ({
          game_id: $wodId,
          round: d.round,
          text: d.text,
          timestamp: d.timestamp,
          points: d.points,
          lemmas: d.lemmas
        }));
      const response = await insert({ table: "wordgame_wod-answers", data });
      if (response.length) {
        success = true;
        await update({ table: "wordgame_games", column: "wod_finished", value: true, id: $wodId });
      } else {
        success = false;
      }
    } catch (err) {
      success = false;
    }
  });
</script>

<h2>Thanks for playing!</h2>

{#if success === undefined}
  <p>Submitting responses...</p>
{:else}
  <p>{message}</p>
{/if}
