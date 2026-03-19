<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	const fallbackSessions = [
		{ id: '1', day_of_week: 'Tuesday', start_time: '17:30', end_time: '19:30', location: 'Saliña Terrain, Willemstad', category: 'Senior Men & Women', notes: 'All levels welcome' },
		{ id: '2', day_of_week: 'Thursday', start_time: '17:30', end_time: '19:30', location: 'Saliña Terrain, Willemstad', category: 'Senior Men & Women', notes: null },
		{ id: '3', day_of_week: 'Saturday', start_time: '08:00', end_time: '10:00', location: 'Saliña Terrain, Willemstad', category: 'Youth & Minis', notes: 'Ages 6–16, parents welcome to watch' }
	];
	const dayOrder = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
	const sorted = $derived(
		[...(data.sessions?.length ? data.sessions : fallbackSessions)]
			.sort((a, b) => dayOrder.indexOf(a.day_of_week) - dayOrder.indexOf(b.day_of_week))
	);
</script>

<svelte:head><title>{m.training_page_title()} – Curaçao Rugby Federation</title></svelte:head>

<div class="bg-crf-blue py-16 text-center text-white">
	<h1 class="text-4xl font-extrabold sm:text-5xl">{m.training_page_title()}</h1>
	<p class="mt-2 text-white/70">{m.training_page_subtitle()}</p>
</div>

<div class="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
	<div class="space-y-6">
		{#each sorted as session}
			<div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
				<div class="flex flex-wrap items-start justify-between gap-4">
					<div>
						<span class="inline-block rounded-full bg-crf-blue px-4 py-1 text-sm font-bold text-white">{session.day_of_week}</span>
						<h2 class="mt-3 text-xl font-bold text-gray-900">{session.category}</h2>
						<p class="mt-1 text-gray-600">🕐 {session.start_time} – {session.end_time}</p>
						<p class="text-gray-600">📍 {session.location}</p>
						{#if session.notes}<p class="mt-2 text-sm italic text-gray-500">{session.notes}</p>{/if}
					</div>
					<a href="/join" class="rounded-full bg-crf-blue px-5 py-2 text-sm font-semibold text-white transition hover:bg-crf-red">{m.training_signup()}</a>
				</div>
			</div>
		{/each}
	</div>

	<div class="mt-12 rounded-2xl bg-gray-50 p-8">
		<h2 class="mb-4 text-2xl font-bold text-crf-blue">{m.training_location_title()}</h2>
		<p class="mb-2 text-gray-700"><strong>Saliña Terrain</strong><br />Willemstad, Curaçao</p>
	</div>

	<div class="mt-8 rounded-2xl bg-crf-blue p-8 text-white">
		<h2 class="mb-4 text-2xl font-bold">{m.training_bring_title()}</h2>
		<ul class="space-y-2 text-white/90">
			<li>✅ {m.training_bring_1()}</li>
			<li>✅ {m.training_bring_2()}</li>
			<li>✅ {m.training_bring_3()}</li>
			<li>✅ {m.training_bring_4()}</li>
		</ul>
		<p class="mt-4 text-sm text-white/70">{m.training_bring_note()}</p>
	</div>
</div>
