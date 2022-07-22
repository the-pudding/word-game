<script>
	export let text = "";
	export let max = 20;

	$: regex = new RegExp(`[\\s\\S]{1,${max}}(?!\\S)`, "g");
	$: chunks = text
		.replace(regex, "$&\n")
		.split("\n")
		.filter((d) => d)
		.map((d, i) => `${i > 0 ? " " : ""}${d}`);
</script>

{#each chunks as text}
	<span>{text}</span>
{/each}
