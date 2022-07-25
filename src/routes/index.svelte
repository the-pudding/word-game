<script>
	import { setContext } from "svelte";
	import { browser } from "$app/env";
	import Meta from "$components/Meta.svelte";
	import App from "$components/App.svelte";
	import version from "$utils/version.js";
	import copy from "$data/copy.json";

	version();

	const { title, description, url, keywords } = copy;
	setContext("copy", copy);
</script>

<Meta {title} {description} {url} {keywords} />
<App />
