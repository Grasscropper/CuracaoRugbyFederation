<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';

	let { data, form }: { data: PageData; form: ActionData } = $props();
	let submitting = $state(false);
	let showForm = $state(false);

	const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
</script>

<svelte:head><title>Training – CRF Admin</title></svelte:head>

<div class="mb-6 flex items-center justify-between">
	<h1 class="text-2xl font-bold text-gray-900">Training Schedule</h1>
	<button onclick={() => (showForm = !showForm)} class="rounded-full bg-crf-blue px-5 py-2 text-sm font-semibold text-white hover:bg-crf-red transition">
		{showForm ? 'Cancel' : '+ Add Session'}
	</button>
</div>

{#if showForm}
	<div class="mb-8 max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
		<h2 class="mb-5 text-lg font-bold text-gray-900">New Training Session</h2>
		{#if form?.error}
			<div class="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{form.error}</div>
		{/if}
		<form method="POST" action="?/create" use:enhance={() => { submitting = true; return async ({ update }) => { submitting = false; showForm = false; await update(); }; }} class="space-y-4">
			<div class="grid gap-4 sm:grid-cols-2">
				<div>
					<label for="day" class="block text-sm font-medium text-gray-700 mb-1">Day *</label>
					<select id="day" name="day_of_week" required class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm">
						{#each days as day}<option>{day}</option>{/each}
					</select>
				</div>
				<div>
					<label for="category" class="block text-sm font-medium text-gray-700 mb-1">Category *</label>
					<input id="category" name="category" type="text" required placeholder="e.g. Senior Men & Women" class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" />
				</div>
				<div>
					<label for="start_time" class="block text-sm font-medium text-gray-700 mb-1">Start Time *</label>
					<input id="start_time" name="start_time" type="time" required class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" />
				</div>
				<div>
					<label for="end_time" class="block text-sm font-medium text-gray-700 mb-1">End Time *</label>
					<input id="end_time" name="end_time" type="time" required class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" />
				</div>
			</div>
			<div>
				<label for="location" class="block text-sm font-medium text-gray-700 mb-1">Location *</label>
				<input id="location" name="location" type="text" required placeholder="e.g. Saliña Terrain, Willemstad" class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" />
			</div>
			<div>
				<label for="notes" class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
				<input id="notes" name="notes" type="text" placeholder="Optional notes" class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" />
			</div>
			<button type="submit" disabled={submitting} class="rounded-full bg-crf-blue px-6 py-2.5 text-sm font-bold text-white hover:bg-crf-red transition disabled:opacity-50">
				{submitting ? 'Saving...' : 'Save Session'}
			</button>
		</form>
	</div>
{/if}

{#if data.sessions.length === 0}
	<div class="rounded-2xl bg-white p-12 text-center text-gray-500 shadow-sm">No training sessions yet.</div>
{:else}
	<div class="space-y-3">
		{#each data.sessions as session}
			<div class="flex items-center justify-between rounded-xl bg-white px-5 py-4 shadow-sm">
				<div>
					<span class="inline-block rounded-full bg-crf-blue px-3 py-0.5 text-xs font-bold text-white">{session.day_of_week}</span>
					<p class="mt-1 font-semibold text-gray-900">{session.category}</p>
					<p class="text-sm text-gray-500">{session.start_time} – {session.end_time} · {session.location}</p>
					{#if session.notes}<p class="text-xs text-gray-400 italic">{session.notes}</p>{/if}
				</div>
				<form method="POST" action="?/delete" use:enhance>
					<input type="hidden" name="id" value={session.id} />
					<button type="submit" onclick={(e) => { if (!confirm('Delete this session?')) e.preventDefault(); }} class="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition">Delete</button>
				</form>
			</div>
		{/each}
	</div>
{/if}
