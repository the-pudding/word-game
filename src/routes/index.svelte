<script>
	import { setContext } from "svelte";
	import { browser, dev } from "$app/env";
	import { page } from "$app/stores";
	import Meta from "$components/Meta.svelte";
	import App from "$components/App.svelte";
	import Prelaunch from "$components/Prelaunch.svelte";
	import version from "$utils/version.js";
	import copy from "$data/copy.json";
	import { wodId, overrideId } from "$stores/misc.js";

	version();

	const { title, description, url, keywords } = copy;
	setContext("copy", copy);

	if (browser && dev) $wodId = $page.url.search.split("id=")[1];

	if (browser) $overrideId = $page.url.search.split("override=")[1];
</script>

<Meta {title} {description} {url} {keywords} />
<App />
<!-- <Prelaunch /> -->
