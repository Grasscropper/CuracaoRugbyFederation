<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	let { data }: { data: PageData } = $props();

	function formatDate(d: string) {
		return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
	}
</script>

<svelte:head><title>Events – CRF Admin</title></svelte:head>

<div class="mb-6 flex items-center justify-between">
	<h1 class="text-2xl font-bold text-gray-900">Events</h1>
	<a href="/admin/events/new" class="rounded-full bg-crf-blue px-5 py-2 text-sm font-semibold text-white hover:bg-crf-red transition">
		+ New Event
	</a>
</div>

{#if data.events.length === 0}
	<div class="rounded-2xl bg-white p-12 text-center text-gray-500 shadow-sm">No events yet.</div>
{:else}
	<div class="space-y-3">
		{#each data.events as event}
			<div class="flex items-center justify-between rounded-xl bg-white px-5 py-4 shadow-sm">
				<div>
					<p class="font-semibold text-gray-900">{event.title}</p>
					<p class="text-sm text-gray-500">{formatDate(event.date)}{event.location ? ` · ${event.location}` : ''}</p>
				</div>
				<div class="flex gap-2">
					<a href="/admin/events/{event.id}/edit" class="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium hover:bg-gray-50 transition">
						Edit
					</a>
					<form method="POST" action="?/delete" use:enhance>
						<input type="hidden" name="id" value={event.id} />
						<button
							type="submit"
							onclick={(e) => { if (!confirm('Delete this event?')) e.preventDefault(); }}
							class="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition"
						>
							Delete
						</button>
					</form>
				</div>
			</div>
		{/each}
	</div>
{/if}
