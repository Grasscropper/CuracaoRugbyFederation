<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';
	import LangTabs from '$lib/components/LangTabs.svelte';
	let { data, form }: { data: PageData; form: ActionData } = $props();
	let submitting = $state(false);
	let lang = $state<'en' | 'nl' | 'pap'>('en');

	const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	const tr = (l: string, field: string) => data.session.translations?.[l]?.[field] ?? '';
</script>

<svelte:head><title>Edit Training – CRF Admin</title></svelte:head>

<div class="mb-6">
	<a href="/admin/training" class="text-sm text-gray-500 hover:text-crf-blue">← Back to Training</a>
	<h1 class="mt-2 text-2xl font-bold text-gray-900">Edit Training Session</h1>
</div>

<div class="max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
	{#if form?.error}
		<div class="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{form.error}</div>
	{/if}
	<form method="POST" use:enhance={() => { submitting = true; return async ({ update }) => { submitting = false; await update(); }; }} class="space-y-5">
		<div class="grid gap-4 sm:grid-cols-2">
			<div>
				<label for="day" class="block text-sm font-medium text-gray-700 mb-1">Day *</label>
				<select id="day" name="day_of_week" required class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm">
					{#each days as day}
						<option selected={data.session.day_of_week === day}>{day}</option>
					{/each}
				</select>
			</div>
			<div>
				<label for="start_time" class="block text-sm font-medium text-gray-700 mb-1">Start Time *</label>
				<input id="start_time" name="start_time" type="time" required value={data.session.start_time} class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" />
			</div>
			<div>
				<label for="end_time" class="block text-sm font-medium text-gray-700 mb-1">End Time *</label>
				<input id="end_time" name="end_time" type="time" required value={data.session.end_time} class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" />
			</div>
			<div>
				<label for="location" class="block text-sm font-medium text-gray-700 mb-1">Location *</label>
				<input id="location" name="location" type="text" required value={data.session.location} class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" />
			</div>
		</div>

		<div class="rounded-xl border border-gray-200 p-4">
			<p class="mb-3 text-sm font-medium text-gray-700">Translatable Content</p>
			<LangTabs bind:value={lang} />

			<div class:hidden={lang !== 'en'} class="space-y-3">
				<div>
					<label for="category" class="block text-sm font-medium text-gray-700 mb-1">Category (EN) *</label>
					<input id="category" name="category" type="text" required value={data.session.category} class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" />
				</div>
				<div>
					<label for="notes" class="block text-sm font-medium text-gray-700 mb-1">Notes (EN)</label>
					<input id="notes" name="notes" type="text" value={data.session.notes ?? ''} class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" />
				</div>
			</div>

			<div class:hidden={lang !== 'nl'} class="space-y-3">
				<div>
					<label for="nl_category" class="block text-sm font-medium text-gray-700 mb-1">Categorie (NL)</label>
					<input id="nl_category" name="nl_category" type="text" value={tr('nl','category')} class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" />
				</div>
				<div>
					<label for="nl_notes" class="block text-sm font-medium text-gray-700 mb-1">Notities (NL)</label>
					<input id="nl_notes" name="nl_notes" type="text" value={tr('nl','notes')} class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" />
				</div>
			</div>

			<div class:hidden={lang !== 'pap'} class="space-y-3">
				<div>
					<label for="pap_category" class="block text-sm font-medium text-gray-700 mb-1">Kategoria (PAP)</label>
					<input id="pap_category" name="pap_category" type="text" value={tr('pap','category')} class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" />
				</div>
				<div>
					<label for="pap_notes" class="block text-sm font-medium text-gray-700 mb-1">Notanan (PAP)</label>
					<input id="pap_notes" name="pap_notes" type="text" value={tr('pap','notes')} class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" />
				</div>
			</div>
		</div>

		<button type="submit" disabled={submitting} class="rounded-full bg-crf-blue px-8 py-3 font-bold text-white hover:bg-crf-red transition disabled:opacity-50">
			{submitting ? 'Saving...' : 'Save Changes'}
		</button>
	</form>
</div>
