<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	let { form }: { form: ActionData } = $props();
	let submitting = $state(false);
	const today = new Date().toISOString().slice(0, 16);
</script>

<svelte:head><title>New Article – CRF Admin</title></svelte:head>

<div class="mb-6">
	<a href="/admin/news" class="text-sm text-gray-500 hover:text-crf-blue">← Back to News</a>
	<h1 class="mt-2 text-2xl font-bold text-gray-900">New Article</h1>
</div>

<div class="max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
	{#if form?.error}
		<div class="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{form.error}</div>
	{/if}
	<form method="POST" use:enhance={() => { submitting = true; return async ({ update }) => { submitting = false; await update(); }; }} class="space-y-5">
		<div>
			<label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title *</label>
			<input id="title" name="title" type="text" required class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue" />
		</div>
		<div>
			<label for="published_at" class="block text-sm font-medium text-gray-700 mb-1">Publish Date</label>
			<input id="published_at" name="published_at" type="datetime-local" value={today} class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue" />
		</div>
		<div>
			<label for="content" class="block text-sm font-medium text-gray-700 mb-1">Content *</label>
			<textarea id="content" name="content" rows="10" required class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue"></textarea>
		</div>
		<button type="submit" disabled={submitting} class="rounded-full bg-crf-blue px-8 py-3 font-bold text-white hover:bg-crf-red transition disabled:opacity-50">
			{submitting ? 'Publishing...' : 'Publish Article'}
		</button>
	</form>
</div>
