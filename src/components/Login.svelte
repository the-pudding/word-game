<script>
	import { wodId } from "$stores/misc.js";
	import { signIn, getGameColumn } from "$utils/supabase.js";

	export let authorized;

	let email = "puddingviz@gmail.com";
	let password = "n0s0oc";
	let error;

	const contact = "please contact words.against.strangers@pudding.cool";

	const onSubmit = async () => {
		try {
			const loggedIn = await signIn({ email, password });
			const hasStarted = await getGameColumn({
				gameId: $wodId,
				column: "wod_started"
			});
			authorized = loggedIn && !hasStarted;
			if (hasStarted) error = "you already started playing";
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
				<input
					bind:value={password}
					id="password"
					placeholder="password"
					type="password"
				/>
			</div>
			<button type="submit">Submit</button>
		</form>

		{#if error}
			<p class="error">
				{error}. {contact}
			</p>
		{/if}
	{:else}
		<p>
			no game id in URL, {contact}
		</p>
	{/if}
</section>

<style>
	section {
		padding: 1rem;
		padding-top: 96px;
	}

	div {
		margin-bottom: 1rem;
	}

	label,
	input {
		display: block;
		width: 100%;
	}

	input {
		padding: 0.5rem;
	}

	.error {
		padding: 1rem;
		background: pink;
	}
</style>
