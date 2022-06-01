<script>
  import { onMount } from "svelte";
  import { overlay, wodId } from "$stores/misc.js";
  import { getQuestions, upsert } from "$utils/supabase.js";

  export let wodReady;

  let questions = [];
  let error;

  const onSubmit = async () => {
    console.log("submit");
    try {
      const data = questions.map((d) => ({ game_id: $wodId, question_id: d.id, answer: d.answer }));
      await upsert({ table: "wordgame_wod-info", data });
      wodReady = true;
      console.log({ wodReady });
    } catch (err) {
      // TODO visual message
      console.log(err);
    }
  };

  onMount(async () => {
    console.log("mount");
    try {
      questions = await getQuestions($wodId);
    } catch (err) {
      error = true;
    }
  });

  $: console.log({ wodReady });
</script>

<h2>Welcome, WOD!</h2>
<p>Let's play a word game!</p>

{#if !wodReady}
  <p>Tell us about yourself:</p>

  {#if error}
    <p>Error</p>
  {:else}
    <form on:submit|preventDefault={onSubmit}>
      {#each questions as { id, question, category }, i}
        {@const required = category === "standard"}
        <div>
          <label for="question-{id}">{question}</label>
          <input {required} bind:value={questions[i].answer} id="question-{id}" placeholder="" />
        </div>
      {/each}
      <button type="submit">Submit</button>
    </form>
  {/if}
{:else}
  <p>
    <button
      on:click={() => {
        $overlay = "rules";
      }}>How to Play</button
    >
  </p>
{/if}

<style>
  h2 {
    font-size: 2em;
    text-align: center;
    max-width: 23em;
    margin: 1rem auto;
  }
</style>
