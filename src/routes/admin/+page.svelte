<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<svelte:head><title>Dashboard – CRF Admin</title></svelte:head>

<h1 class="mb-8 text-2xl font-bold text-gray-900">Dashboard</h1>

<div class="grid gap-6 sm:grid-cols-3">
	<div class="rounded-2xl bg-white p-6 shadow-sm">
		<p class="text-sm text-gray-500">Total Sign-ups</p>
		<p class="mt-1 text-4xl font-bold text-crf-blue">{data.signupCount ?? 0}</p>
		<a href="/admin/signups" class="mt-3 inline-block text-sm text-crf-blue hover:underline">View all →</a>
	</div>
	<div class="rounded-2xl bg-white p-6 shadow-sm">
		<p class="text-sm text-gray-500">Upcoming Events</p>
		<p class="mt-1 text-4xl font-bold text-crf-blue">{data.eventCount ?? 0}</p>
		<a href="/admin/events" class="mt-3 inline-block text-sm text-crf-blue hover:underline">Manage →</a>
	</div>
	<div class="rounded-2xl bg-white p-6 shadow-sm">
		<p class="text-sm text-gray-500">News Articles</p>
		<p class="mt-1 text-4xl font-bold text-crf-blue">{data.newsCount ?? 0}</p>
		<a href="/admin/news" class="mt-3 inline-block text-sm text-crf-blue hover:underline">Manage →</a>
	</div>
</div>

<div class="mt-10 grid gap-6 sm:grid-cols-2">
	<a href="/admin/events/new" class="block rounded-2xl bg-crf-blue p-6 text-white shadow-sm hover:bg-crf-red transition">
		<h2 class="text-lg font-bold">+ Add Event</h2>
		<p class="mt-1 text-sm text-white/70">Create a new upcoming event</p>
	</a>
	<a href="/admin/news/new" class="block rounded-2xl bg-crf-blue p-6 text-white shadow-sm hover:bg-crf-red transition">
		<h2 class="text-lg font-bold">+ Add News Article</h2>
		<p class="mt-1 text-sm text-white/70">Publish a new news post</p>
	</a>
</div>
