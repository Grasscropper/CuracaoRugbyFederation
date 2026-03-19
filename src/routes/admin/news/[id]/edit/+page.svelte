<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';
	import LangTabs from '$lib/components/LangTabs.svelte';
	let { data, form }: { data: PageData; form: ActionData } = $props();
	let submitting = $state(false);
	let lang = $state<'en' | 'nl' | 'pap'>('en');

	function toDateTimeLocal(iso: string) { return iso ? iso.slice(0, 16) : ''; }
	const tr = (l: string, field: string) => data.post.translations?.[l]?.[field] ?? '';
</script>

<svelte:head><title>Edit Article – CRF Admin</title></svelte:head>

<div class="mb-6">
	<a href="/admin/news" class="text-sm text-gray-500 hover:text-crf-blue">← Back to News</a>
	<h1 class="mt-2 text-2xl font-bold text-gray-900">Edit Article</h1>
</div>

<div class="max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
	{#if form?.error}
		<div class="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{form.error}</div>
	{/if}
	<form method="POST" use:enhance={() => { submitting = true; return async ({ update }) => { submitting = false; await update(); }; }} class="space-y-5">
		<div>
			<label for="published_at" class="block text-sm font-medium text-gray-700 mb-1">Publish Date</label>
			<input id="published_at" name="published_at" type="datetime-local" value={toDateTimeLocal(data.post.published_at)} class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue" />
		</div>

		<div class="rounded-xl border border-gray-200 p-4">
			<p class="mb-3 text-sm font-medium text-gray-700">Translatable Content</p>
			<LangTabs bind:value={lang} />

			<div class:hidden={lang !== 'en'} class="space-y-4">
				<div>
					<label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title (EN) *</label>
					<input id="title" name="title" type="text" required value={data.post.title} class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue" />
				</div>
				<div>
					<label for="content" class="block text-sm font-medium text-gray-700 mb-1">Content (EN) *</label>
					<textarea id="content" name="content" rows="10" required class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue">{data.post.content}</textarea>
				</div>
			</div>

			<div class:hidden={lang !== 'nl'} class="space-y-4">
				<div>
					<label for="nl_title" class="block text-sm font-medium text-gray-700 mb-1">Titel (NL)</label>
					<input id="nl_title" name="nl_title" type="text" value={tr('nl','title')} class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue" />
				</div>
				<div>
					<label for="nl_content" class="block text-sm font-medium text-gray-700 mb-1">Inhoud (NL)</label>
					<textarea id="nl_content" name="nl_content" rows="10" class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue">{tr('nl','content')}</textarea>
				</div>
			</div>

			<div class:hidden={lang !== 'pap'} class="space-y-4">
				<div>
					<label for="pap_title" class="block text-sm font-medium text-gray-700 mb-1">Título (PAP)</label>
					<input id="pap_title" name="pap_title" type="text" value={tr('pap','title')} class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue" />
				</div>
				<div>
					<label for="pap_content" class="block text-sm font-medium text-gray-700 mb-1">Kontenido (PAP)</label>
					<textarea id="pap_content" name="pap_content" rows="10" class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue">{tr('pap','content')}</textarea>
				</div>
			</div>
		</div>

		<button type="submit" disabled={submitting} class="rounded-full bg-crf-blue px-8 py-3 font-bold text-white hover:bg-crf-red transition disabled:opacity-50">
			{submitting ? 'Saving...' : 'Save Changes'}
		</button>
	</form>
</div>
