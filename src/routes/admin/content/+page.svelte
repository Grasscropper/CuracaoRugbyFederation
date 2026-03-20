<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';
	import LangTabs from '$lib/components/LangTabs.svelte';
	import RichTextEditor from '$lib/components/RichTextEditor.svelte';

	let { data, form }: { data: PageData; form: ActionData } = $props();
	let submitting = $state(false);
	let lang = $state<'en' | 'nl' | 'pap'>('en');

	function val(key: string): string {
		return data.content.find((r: { key: string }) => r.key === key)?.value ?? '';
	}
	function tr(key: string, l: string): string {
		return data.content.find((r: { key: string }) => r.key === key)?.translations?.[l]?.value ?? '';
	}

	// Rich text values — kept as state so TipTap editors stay in sync across lang switches
	let heroBody = $state({ en: val('home_hero_body'), nl: tr('home_hero_body', 'nl'), pap: tr('home_hero_body', 'pap') });
	let aboutContent = $state({ en: val('about_content'), nl: tr('about_content', 'nl'), pap: tr('about_content', 'pap') });
</script>

<svelte:head><title>Page Content – CRF Admin</title></svelte:head>

<div class="mb-6">
	<h1 class="text-2xl font-bold text-gray-900">Page Content</h1>
	<p class="mt-1 text-sm text-gray-500">Edit the text content for public pages. Changes are live immediately after saving.</p>
</div>

{#if form?.success}
	<div class="mb-6 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">Content saved successfully.</div>
{/if}
{#if form?.error}
	<div class="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{form.error}</div>
{/if}

<form method="POST" use:enhance={() => { submitting = true; return async ({ update }) => { submitting = false; await update({ reset: false }); }; }} class="space-y-8">

	<div class="sticky top-16 z-10 flex items-center justify-between rounded-xl bg-white px-6 py-3 shadow-sm border border-gray-200">
		<LangTabs bind:value={lang} />
		<button type="submit" disabled={submitting} class="rounded-full bg-crf-blue px-6 py-2 text-sm font-bold text-white hover:bg-crf-red transition disabled:opacity-50">
			{submitting ? 'Saving...' : 'Save All'}
		</button>
	</div>

	<!-- Nav -->
	<div class="rounded-2xl bg-white p-6 shadow-sm space-y-4">
		<h2 class="text-lg font-bold text-gray-900">Navigation</h2>
		{#each [
			{ key: 'nav_home', en: 'Home', nl: 'Home', pap: 'Kas' },
			{ key: 'nav_about', en: 'Our Story', nl: 'Ons Verhaal', pap: 'Nos Historia' },
			{ key: 'nav_training', en: 'Training', nl: 'Training', pap: 'Entrenamentu' },
			{ key: 'nav_events', en: 'Events', nl: 'Evenementen', pap: 'Eventonan' },
			{ key: 'nav_news', en: 'News', nl: 'Nieuws', pap: 'Notisia' },
			{ key: 'nav_join', en: 'Join Us', nl: 'Meedoen', pap: 'Uni Bo' }
		] as item}
			<div class:hidden={lang !== 'en'}>
				<label for={item.key} class="block text-sm font-medium text-gray-700 mb-1">{item.en} (EN)</label>
				<input id={item.key} name={item.key} type="text" value={val(item.key)} placeholder={item.en} class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue" />
			</div>
			<div class:hidden={lang !== 'nl'}>
				<label for="nl_{item.key}" class="block text-sm font-medium text-gray-700 mb-1">{item.en} (NL)</label>
				<input id="nl_{item.key}" name="nl_{item.key}" type="text" value={tr(item.key, 'nl')} placeholder={item.nl} class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue" />
			</div>
			<div class:hidden={lang !== 'pap'}>
				<label for="pap_{item.key}" class="block text-sm font-medium text-gray-700 mb-1">{item.en} (PAP)</label>
				<input id="pap_{item.key}" name="pap_{item.key}" type="text" value={tr(item.key, 'pap')} placeholder={item.pap} class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue" />
			</div>
		{/each}
	</div>

	<!-- Home Hero -->
	<div class="rounded-2xl bg-white p-6 shadow-sm space-y-4">
		<h2 class="text-lg font-bold text-gray-900">Home – Hero</h2>

		<div class:hidden={lang !== 'en'} class="space-y-4">
			<div>
				<label for="home_hero_title" class="block text-sm font-medium text-gray-700 mb-1">Title (EN)</label>
				<input id="home_hero_title" name="home_hero_title" type="text" value={val('home_hero_title')} class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue" />
			</div>
			<div>
				<label for="home_hero_subtitle" class="block text-sm font-medium text-gray-700 mb-1">Subtitle (EN)</label>
				<input id="home_hero_subtitle" name="home_hero_subtitle" type="text" value={val('home_hero_subtitle')} class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue" />
			</div>
			<div>
				<label class="block text-sm font-medium text-gray-700 mb-1">Body text (EN)</label>
				<RichTextEditor name="home_hero_body" bind:value={heroBody.en} />
			</div>
		</div>

		<div class:hidden={lang !== 'nl'} class="space-y-4">
			<div>
				<label for="nl_home_hero_title" class="block text-sm font-medium text-gray-700 mb-1">Titel (NL)</label>
				<input id="nl_home_hero_title" name="nl_home_hero_title" type="text" value={tr('home_hero_title', 'nl')} class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue" />
			</div>
			<div>
				<label for="nl_home_hero_subtitle" class="block text-sm font-medium text-gray-700 mb-1">Ondertitel (NL)</label>
				<input id="nl_home_hero_subtitle" name="nl_home_hero_subtitle" type="text" value={tr('home_hero_subtitle', 'nl')} class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue" />
			</div>
			<div>
				<label class="block text-sm font-medium text-gray-700 mb-1">Bodytekst (NL)</label>
				<RichTextEditor name="nl_home_hero_body" bind:value={heroBody.nl} />
			</div>
		</div>

		<div class:hidden={lang !== 'pap'} class="space-y-4">
			<div>
				<label for="pap_home_hero_title" class="block text-sm font-medium text-gray-700 mb-1">Título (PAP)</label>
				<input id="pap_home_hero_title" name="pap_home_hero_title" type="text" value={tr('home_hero_title', 'pap')} class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue" />
			</div>
			<div>
				<label for="pap_home_hero_subtitle" class="block text-sm font-medium text-gray-700 mb-1">Subtítulo (PAP)</label>
				<input id="pap_home_hero_subtitle" name="pap_home_hero_subtitle" type="text" value={tr('home_hero_subtitle', 'pap')} class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue" />
			</div>
			<div>
				<label class="block text-sm font-medium text-gray-700 mb-1">Teksto di kurpa (PAP)</label>
				<RichTextEditor name="pap_home_hero_body" bind:value={heroBody.pap} />
			</div>
		</div>
	</div>

	<!-- Our Story -->
	<div class="rounded-2xl bg-white p-6 shadow-sm space-y-4">
		<h2 class="text-lg font-bold text-gray-900">Our Story</h2>

		<div class:hidden={lang !== 'en'} class="space-y-4">
			<div>
				<label for="about_title" class="block text-sm font-medium text-gray-700 mb-1">Page Title (EN)</label>
				<input id="about_title" name="about_title" type="text" value={val('about_title')} placeholder="Our Story" class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue" />
			</div>
			<div>
				<label for="about_subtitle" class="block text-sm font-medium text-gray-700 mb-1">Subtitle (EN)</label>
				<input id="about_subtitle" name="about_subtitle" type="text" value={val('about_subtitle')} placeholder="The Curaçao Sharks and the game we love" class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue" />
			</div>
			<div>
				<label class="block text-sm font-medium text-gray-700 mb-1">Content (EN)</label>
				<RichTextEditor name="about_content" bind:value={aboutContent.en} />
			</div>
		</div>

		<div class:hidden={lang !== 'nl'} class="space-y-4">
			<div>
				<label for="nl_about_title" class="block text-sm font-medium text-gray-700 mb-1">Paginatitel (NL)</label>
				<input id="nl_about_title" name="nl_about_title" type="text" value={tr('about_title', 'nl')} class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue" />
			</div>
			<div>
				<label for="nl_about_subtitle" class="block text-sm font-medium text-gray-700 mb-1">Ondertitel (NL)</label>
				<input id="nl_about_subtitle" name="nl_about_subtitle" type="text" value={tr('about_subtitle', 'nl')} class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue" />
			</div>
			<div>
				<label class="block text-sm font-medium text-gray-700 mb-1">Inhoud (NL)</label>
				<RichTextEditor name="nl_about_content" bind:value={aboutContent.nl} />
			</div>
		</div>

		<div class:hidden={lang !== 'pap'} class="space-y-4">
			<div>
				<label for="pap_about_title" class="block text-sm font-medium text-gray-700 mb-1">Título di Pashina (PAP)</label>
				<input id="pap_about_title" name="pap_about_title" type="text" value={tr('about_title', 'pap')} class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue" />
			</div>
			<div>
				<label for="pap_about_subtitle" class="block text-sm font-medium text-gray-700 mb-1">Subtítulo (PAP)</label>
				<input id="pap_about_subtitle" name="pap_about_subtitle" type="text" value={tr('about_subtitle', 'pap')} class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue" />
			</div>
			<div>
				<label class="block text-sm font-medium text-gray-700 mb-1">Kontenido (PAP)</label>
				<RichTextEditor name="pap_about_content" bind:value={aboutContent.pap} />
			</div>
		</div>
	</div>

</form>
