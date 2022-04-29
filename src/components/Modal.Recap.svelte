<script>
  import { gameState, totalScore, round } from "$stores/misc.js";
  import Score from "$components/Modal.Score.svelte";
  import Highlights from "$components/Modal.Highlights.svelte";

  const wodReactions = {
    ahead: [
      "Live look at her: 🤪.",
      "She says this is almost as good as a day with boba.",
      "She's really channeling her inner Jessie O'Connor.",
      "Nice try. Follow me on Twitter @mich_mcghee."
    ],
    behind: [
      "Live look at Michelle: 😭.",
      "Michelle says this is almost as bad as a day without boba.",
      "Michelle will try to channel her inner Jessie O'Connor this next round.",
      "Ugh. Rematch?"
    ]
  };

  $: userLead = $totalScore.user > $totalScore.opponent;
  $: opponentLead = $totalScore.user < $totalScore.opponent;
  $: tied = $totalScore.user === $totalScore.opponent;

  const getPostTitle = () => {
    const a = tied ? "Tie!" : userLead ? "You win!" : "You lose!";
    const b = userLead || tied ? wodReactions.behind[$round] : wodReactions.ahead[$round];

    return `${a} A message from Michelle: ${b}`;
  };

  const getMidTitle = () => {
    const a = tied
      ? "It's all tied up."
      : userLead
      ? "You're in the lead!"
      : "Michelle's in the lead.";
    const b = userLead || tied ? wodReactions.behind[$round] : wodReactions.ahead[$round];

    return `${a} ${b}`;
  };

  $: title = $gameState === "post" ? getPostTitle() : getMidTitle();
</script>

<div>
  <h2>{title}</h2>

  <Score />
  <Highlights />

  {#if $gameState === "post"}
    {#if userLead}
      <p>You win!</p>
    {:else if opponentLead}
      <p>You lose!</p>
    {:else}
      <p>Tie!</p>
    {/if}
  {/if}
</div>

<style>
  h2 {
    font-size: 2em;
    text-align: center;
    max-width: 23em;
    margin: 1rem auto;
  }
  div {
    text-align: center;
  }
  h3 {
    font-size: 2em;
  }
</style>
