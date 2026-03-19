<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';

	let { form }: { form: ActionData } = $props();
	let submitting = $state(false);
</script>

<svelte:head>
	<title>Admin Login – CRF</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-crf-blue px-4">
	<div class="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
		<h1 class="mb-1 text-2xl font-bold text-crf-blue">Admin Login</h1>
		<p class="mb-6 text-sm text-gray-500">Curaçao Rugby Federation</p>

		{#if form?.error}
			<div class="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
				{form.error}
			</div>
		{/if}

		<form
			method="POST"
			use:enhance={() => {
				submitting = true;
				return async ({ update }) => {
					submitting = false;
					await update();
				};
			}}
			class="space-y-4"
		>
			<div>
				<label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
				<input
					id="email"
					name="email"
					type="email"
					required
					class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue"
				/>
			</div>
			<div>
				<label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					required
					class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue"
				/>
			</div>
			<button
				type="submit"
				disabled={submitting}
				class="w-full rounded-full bg-crf-blue py-3 font-bold text-white transition hover:bg-crf-red disabled:opacity-50"
			>
				{submitting ? 'Signing in...' : 'Sign In'}
			</button>
		</form>
	</div>
</div>
