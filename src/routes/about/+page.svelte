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
	const c = $derived((key: string, fallback: string) => tc(data.content, key, locale, fallback));
</script>

<svelte:head>
	<title>{m.about_page_title()} – Curaçao Rugby Federation</title>
</svelte:head>

<div class="bg-crf-blue py-16 text-center text-white">
	<h1 class="text-4xl font-extrabold sm:text-5xl">{m.about_page_title()}</h1>
	<p class="mt-2 text-white/70">{m.about_page_subtitle()}</p>
</div>

<div class="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
	<div class="prose prose-lg max-w-none">
		<h2>{m.about_h1()}</h2>
		<p>{c('about_p1', m.about_p1())}</p>
		<p>{c('about_p2', m.about_p2())}</p>
		<h2>{m.about_h2_sharks()}</h2>
		<p>{c('about_sharks_p1', m.about_sharks_p1())}</p>
		<p>{c('about_sharks_p2', m.about_sharks_p2())}</p>
		<h2>{m.about_h2_mission()}</h2>
		<ul>
			<li>{c('about_mission_1', m.about_mission_1())}</li>
			<li>{c('about_mission_2', m.about_mission_2())}</li>
			<li>{c('about_mission_3', m.about_mission_3())}</li>
			<li>{c('about_mission_4', m.about_mission_4())}</li>
			<li>{c('about_mission_5', m.about_mission_5())}</li>
		</ul>
		<h2>{m.about_h2_island()}</h2>
		<p>{c('about_island_p1', m.about_island_p1())}</p>
		<p>{c('about_island_p2', m.about_island_p2())}</p>
		<h2>{m.about_h2_affiliations()}</h2>
		<ul>
			<li>🌍 <strong>World Rugby</strong> — global governing body</li>
			<li>🌎 <strong>Rugby Americas North (RAN)</strong> — regional governing body</li>
			<li>🏝️ <strong>Caribbean Rugby Association (CRA)</strong> — sub-regional body</li>
		</ul>
	</div>
	<div class="mt-12 flex flex-wrap gap-4">
		<a href="/join" class="rounded-full bg-crf-blue px-8 py-3 font-bold text-white transition hover:bg-crf-red">{m.about_cta_join()}</a>
		<a href="/training" class="rounded-full border-2 border-crf-blue px-8 py-3 font-bold text-crf-blue transition hover:bg-crf-blue hover:text-white">{m.about_cta_training()}</a>
	</div>
</div>
