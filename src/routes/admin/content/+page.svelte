<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';
	import LangTabs from '$lib/components/LangTabs.svelte';

	let { data, form }: { data: PageData; form: ActionData } = $props();
	let submitting = $state(false);
	let lang = $state<'en' | 'nl' | 'pap'>('en');

	function val(key: string): string {
		return data.content.find((r: { key: string }) => r.key === key)?.value ?? '';
	}
	function tr(key: string, l: string): string {
		return data.content.find((r: { key: string }) => r.key === key)?.translations?.[l]?.value ?? '';
	}

	const sections = [
		{
			title: 'Home – Hero',
			fields: [
				{ key: 'home_hero_title', label: 'Title', rows: 1 },
				{ key: 'home_hero_subtitle', label: 'Subtitle', rows: 1 },
				{ key: 'home_hero_body', label: 'Body text', rows: 3 }
			]
		},
		{
			title: 'Our Story – Introduction',
			fields: [
				{ key: 'about_p1', label: 'Paragraph 1', rows: 4 },
				{ key: 'about_p2', label: 'Paragraph 2', rows: 4 }
			]
		},
		{
			title: 'Our Story – The Sharks',
			fields: [
				{ key: 'about_sharks_p1', label: 'Sharks paragraph 1', rows: 4 },
				{ key: 'about_sharks_p2', label: 'Sharks paragraph 2', rows: 3 }
			]
		},
		{
			title: 'Our Story – Mission',
			fields: [
				{ key: 'about_mission_1', label: 'Mission point 1', rows: 2 },
				{ key: 'about_mission_2', label: 'Mission point 2', rows: 2 },
				{ key: 'about_mission_3', label: 'Mission point 3', rows: 2 },
				{ key: 'about_mission_4', label: 'Mission point 4', rows: 2 },
				{ key: 'about_mission_5', label: 'Mission point 5', rows: 2 }
			]
		},
		{
			title: 'Our Story – The Island',
			fields: [
				{ key: 'about_island_p1', label: 'Island paragraph 1', rows: 4 },
				{ key: 'about_island_p2', label: 'Island paragraph 2', rows: 3 }
			]
		}
	];
</script>

<svelte:head><title>Page Content – CRF Admin</title></svelte:head>

<div class="mb-6">
	<h1 class="text-2xl font-bold text-gray-900">Page Content</h1>
	<p class="mt-1 text-sm text-gray-500">Edit the text content for public pages. Changes are live immediately.</p>
</div>

{#if form?.success}
	<div class="mb-6 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">Content saved successfully.</div>
{/if}
{#if form?.error}
	<div class="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{form.error}</div>
{/if}

<form method="POST" use:enhance={() => { submitting = true; return async ({ update }) => { submitting = false; await update(); }; }} class="space-y-8">

	<div class="sticky top-4 z-10 flex items-center justify-between rounded-xl bg-white px-6 py-3 shadow-sm border border-gray-200">
		<LangTabs bind:value={lang} />
		<button type="submit" disabled={submitting} class="rounded-full bg-crf-blue px-6 py-2 text-sm font-bold text-white hover:bg-crf-red transition disabled:opacity-50">
			{submitting ? 'Saving...' : 'Save All'}
		</button>
	</div>

	{#each sections as section}
		<div class="rounded-2xl bg-white p-6 shadow-sm">
			<h2 class="mb-4 text-lg font-bold text-gray-900">{section.title}</h2>
			<div class="space-y-4">
				{#each section.fields as field}
					<div>
						<div class:hidden={lang !== 'en'}>
							<label for={field.key} class="block text-sm font-medium text-gray-700 mb-1">{field.label} (EN)</label>
							<textarea id={field.key} name={field.key} rows={field.rows} class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue">{val(field.key)}</textarea>
						</div>
						<div class:hidden={lang !== 'nl'}>
							<label for="nl_{field.key}" class="block text-sm font-medium text-gray-700 mb-1">{field.label} (NL)</label>
							<textarea id="nl_{field.key}" name="nl_{field.key}" rows={field.rows} class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue">{tr(field.key, 'nl')}</textarea>
						</div>
						<div class:hidden={lang !== 'pap'}>
							<label for="pap_{field.key}" class="block text-sm font-medium text-gray-700 mb-1">{field.label} (PAP)</label>
							<textarea id="pap_{field.key}" name="pap_{field.key}" rows={field.rows} class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue">{tr(field.key, 'pap')}</textarea>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/each}

</form>
