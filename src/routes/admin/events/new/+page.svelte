<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import LangTabs from '$lib/components/LangTabs.svelte';
	let { form }: { form: ActionData } = $props();
	let submitting = $state(false);
	let lang = $state<'en' | 'nl' | 'pap'>('en');
</script>

<svelte:head><title>New Event – CRF Admin</title></svelte:head>

<div class="mb-6">
	<a href="/admin/events" class="text-sm text-gray-500 hover:text-crf-blue">← Back to Events</a>
	<h1 class="mt-2 text-2xl font-bold text-gray-900">New Event</h1>
</div>

<div class="max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
	{#if form?.error}
		<div class="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{form.error}</div>
	{/if}
	<form method="POST" use:enhance={() => { submitting = true; return async ({ update }) => { submitting = false; await update(); }; }} class="space-y-5">

		<!-- Non-translatable fields -->
		<div>
			<label for="date" class="block text-sm font-medium text-gray-700 mb-1">Date *</label>
			<input id="date" name="date" type="datetime-local" required class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue" />
		</div>
		<div>
			<label for="location" class="block text-sm font-medium text-gray-700 mb-1">Location</label>
			<input id="location" name="location" type="text" class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue" />
		</div>

		<!-- Translatable fields with language tabs -->
		<div class="rounded-xl border border-gray-200 p-4">
			<p class="mb-3 text-sm font-medium text-gray-700">Translatable Content</p>
			<LangTabs bind:value={lang} />

			<div class:hidden={lang !== 'en'} class="space-y-4">
				<div>
					<label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title (EN) *</label>
					<input id="title" name="title" type="text" required class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue" />
				</div>
				<div>
					<label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description (EN)</label>
					<textarea id="description" name="description" rows="4" class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue"></textarea>
				</div>
			</div>

			<div class:hidden={lang !== 'nl'} class="space-y-4">
				<div>
					<label for="nl_title" class="block text-sm font-medium text-gray-700 mb-1">Titel (NL)</label>
					<input id="nl_title" name="nl_title" type="text" class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue" />
				</div>
				<div>
					<label for="nl_description" class="block text-sm font-medium text-gray-700 mb-1">Beschrijving (NL)</label>
					<textarea id="nl_description" name="nl_description" rows="4" class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue"></textarea>
				</div>
			</div>

			<div class:hidden={lang !== 'pap'} class="space-y-4">
				<div>
					<label for="pap_title" class="block text-sm font-medium text-gray-700 mb-1">Título (PAP)</label>
					<input id="pap_title" name="pap_title" type="text" class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue" />
				</div>
				<div>
					<label for="pap_description" class="block text-sm font-medium text-gray-700 mb-1">Deskripshon (PAP)</label>
					<textarea id="pap_description" name="pap_description" rows="4" class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue"></textarea>
				</div>
			</div>
		</div>

		<button type="submit" disabled={submitting} class="rounded-full bg-crf-blue px-8 py-3 font-bold text-white hover:bg-crf-red transition disabled:opacity-50">
			{submitting ? 'Saving...' : 'Save Event'}
		</button>
	</form>
</div>
