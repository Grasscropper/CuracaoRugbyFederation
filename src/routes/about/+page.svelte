<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { page } from '$app/state';
	import { locales } from '$lib/paraglide/runtime';
	import { tc } from '$lib/i18n';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	const locale = $derived(
		locales.find((l) => page.url.pathname === `/${l}` || page.url.pathname.startsWith(`/${l}/`)) ?? 'en'
	);

	// Fallback content built from paraglide messages
	const fallbackContent = $derived(`
		<h2>${m.about_h1()}</h2>
		<p>${m.about_p1()}</p>
		<p>${m.about_p2()}</p>
		<h2>${m.about_h2_sharks()}</h2>
		<p>${m.about_sharks_p1()}</p>
		<p>${m.about_sharks_p2()}</p>
		<h2>${m.about_h2_mission()}</h2>
		<ul>
			<li>${m.about_mission_1()}</li>
			<li>${m.about_mission_2()}</li>
			<li>${m.about_mission_3()}</li>
			<li>${m.about_mission_4()}</li>
			<li>${m.about_mission_5()}</li>
		</ul>
		<h2>${m.about_h2_island()}</h2>
		<p>${m.about_island_p1()}</p>
		<p>${m.about_island_p2()}</p>
		<h2>${m.about_h2_affiliations()}</h2>
		<ul>
			<li>🌍 <strong>World Rugby</strong> — ${m.about_affiliation_world_rugby_role()}</li>
			<li>🌎 <strong>Rugby Americas North (RAN)</strong> — ${m.about_affiliation_ran_role()}</li>
			<li>🏝️ <strong>Caribbean Rugby Association (CRA)</strong> — ${m.about_affiliation_cra_role()}</li>
		</ul>
	`);

	const content = $derived(tc(data.content, 'about_content', locale, fallbackContent));
	const pageTitle = $derived(tc(data.content, 'about_title', locale, m.about_page_title()));
	const pageSubtitle = $derived(tc(data.content, 'about_subtitle', locale, m.about_page_subtitle()));
</script>

<svelte:head>
	<title>{m.about_page_title()} – Curaçao Rugby Federation</title>
</svelte:head>

<div class="bg-crf-blue py-16 text-center text-white">
	<h1 class="text-4xl font-extrabold sm:text-5xl">{pageTitle}</h1>
	<p class="mt-2 text-white/70">{pageSubtitle}</p>
</div>

<div class="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
	<div class="prose prose-lg max-w-none">
		{@html content}
	</div>
	<div class="mt-12 flex flex-wrap gap-4">
		<a href="/join" class="rounded-full bg-crf-blue px-8 py-3 font-bold text-white transition hover:bg-crf-red">{m.about_cta_join()}</a>
		<a href="/training" class="rounded-full border-2 border-crf-blue px-8 py-3 font-bold text-crf-blue transition hover:bg-crf-blue hover:text-white">{m.about_cta_training()}</a>
	</div>
</div>
