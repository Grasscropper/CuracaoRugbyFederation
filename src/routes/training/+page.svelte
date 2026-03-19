<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Fallback sessions shown when DB is empty / not configured
	const fallbackSessions = [
		{ id: '1', day_of_week: 'Tuesday', start_time: '17:30', end_time: '19:30', location: 'Saliña Terrain, Willemstad', category: 'Senior Men & Women', notes: 'All levels welcome' },
		{ id: '2', day_of_week: 'Thursday', start_time: '17:30', end_time: '19:30', location: 'Saliña Terrain, Willemstad', category: 'Senior Men & Women', notes: null },
		{ id: '3', day_of_week: 'Saturday', start_time: '08:00', end_time: '10:00', location: 'Saliña Terrain, Willemstad', category: 'Youth & Minis', notes: 'Ages 6–16, parents welcome to watch' }
	];

	const sessions = data.sessions?.length ? data.sessions : fallbackSessions;

	const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	const sorted = [...sessions].sort(
		(a, b) => dayOrder.indexOf(a.day_of_week) - dayOrder.indexOf(b.day_of_week)
	);
</script>

<svelte:head>
	<title>Training Schedule – Curaçao Rugby Federation</title>
	<meta name="description" content="Check our training schedule and come join us on the pitch in Willemstad, Curaçao." />
</svelte:head>

<div class="bg-crf-blue py-16 text-center text-white">
	<h1 class="text-4xl font-extrabold sm:text-5xl">Training Schedule</h1>
	<p class="mt-2 text-white/70">Join us on the pitch — everyone is welcome</p>
</div>

<div class="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
	<!-- Schedule cards -->
	<div class="space-y-6">
		{#each sorted as session}
			<div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
				<div class="flex flex-wrap items-start justify-between gap-4">
					<div>
						<span class="inline-block rounded-full bg-crf-blue px-4 py-1 text-sm font-bold text-white">
							{session.day_of_week}
						</span>
						<h2 class="mt-3 text-xl font-bold text-gray-900">{session.category}</h2>
						<p class="mt-1 text-gray-600">
							🕐 {session.start_time} – {session.end_time}
						</p>
						<p class="text-gray-600">
							📍 {session.location}
						</p>
						{#if session.notes}
							<p class="mt-2 text-sm text-gray-500 italic">{session.notes}</p>
						{/if}
					</div>
					<a
						href="/join"
						class="rounded-full bg-crf-blue px-5 py-2 text-sm font-semibold text-white transition hover:bg-crf-red"
					>
						Sign up
					</a>
				</div>
			</div>
		{/each}
	</div>

	<!-- Location -->
	<div class="mt-12 rounded-2xl bg-gray-50 p-8">
		<h2 class="mb-4 text-2xl font-bold text-crf-blue">Where to Find Us</h2>
		<p class="mb-2 text-gray-700">
			<strong>Saliña Terrain</strong><br />
			Willemstad, Curaçao
		</p>
		<p class="text-gray-600 text-sm">
			Look for us on the rugby pitch — just ask any local or follow us on social media for
			directions and updates on session changes.
		</p>
	</div>

	<!-- What to bring -->
	<div class="mt-8 rounded-2xl bg-crf-blue p-8 text-white">
		<h2 class="mb-4 text-2xl font-bold">What to Bring</h2>
		<ul class="space-y-2 text-white/90">
			<li>✅ Sports clothes and boots (or trainers for beginners)</li>
			<li>✅ A water bottle — it's hot on the island!</li>
			<li>✅ A positive attitude</li>
			<li>✅ Mouth guard (recommended)</li>
		</ul>
		<p class="mt-4 text-white/70 text-sm">No experience needed. We'll take care of the rest.</p>
	</div>
</div>
