<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	function formatDate(d: string) {
		return new Date(d).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
	}
</script>

<svelte:head><title>{m.events_page_title()} – Curaçao Rugby Federation</title></svelte:head>

<div class="bg-crf-blue py-16 text-center text-white">
	<h1 class="text-4xl font-extrabold sm:text-5xl">{m.events_page_title()}</h1>
	<p class="mt-2 text-white/70">{m.events_page_subtitle()}</p>
</div>

<div class="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
	{#if data.events.length === 0}
		<div class="rounded-2xl bg-gray-50 p-12 text-center">
			<p class="mb-4 text-5xl">📅</p>
			<h2 class="mb-2 text-xl font-bold text-gray-700">{m.events_empty_title()}</h2>
			<p class="text-gray-500">{m.events_empty_body()}</p>
			<div class="mt-6 flex justify-center gap-4">
				<a href="https://www.facebook.com/curacaorugbyfederation" target="_blank" rel="noopener noreferrer" class="rounded-full bg-crf-blue px-6 py-2 text-sm font-semibold text-white hover:bg-crf-red transition">Facebook</a>
				<a href="https://www.instagram.com/curacaorugbyfederation" target="_blank" rel="noopener noreferrer" class="rounded-full border-2 border-crf-blue px-6 py-2 text-sm font-semibold text-crf-blue hover:bg-crf-blue hover:text-white transition">Instagram</a>
			</div>
		</div>
	{:else}
		<div class="space-y-6">
			{#each data.events as event}
				<div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
					{#if event.image_url}<img src={event.image_url} alt={event.title} class="mb-4 h-48 w-full rounded-xl object-cover" />{/if}
					<span class="text-sm font-semibold text-crf-red">{formatDate(event.date)}</span>
					<h2 class="mt-1 text-xl font-bold text-gray-900">{event.title}</h2>
					{#if event.location}<p class="mt-1 text-sm text-gray-500">📍 {event.location}</p>{/if}
					{#if event.description}<p class="mt-3 text-gray-600">{event.description}</p>{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>
