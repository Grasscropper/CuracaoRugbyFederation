<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	function formatDate(d: string) {
		return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
	}

	const experienceLabels: Record<string, string> = {
		never_played: 'Never played',
		beginner: 'Beginner',
		intermediate: 'Intermediate',
		experienced: 'Experienced'
	};
</script>

<svelte:head><title>Sign-ups – CRF Admin</title></svelte:head>

<h1 class="mb-6 text-2xl font-bold text-gray-900">Sign-ups ({data.signups.length})</h1>

{#if data.signups.length === 0}
	<div class="rounded-2xl bg-white p-12 text-center text-gray-500 shadow-sm">No sign-ups yet.</div>
{:else}
	<div class="overflow-x-auto rounded-2xl bg-white shadow-sm">
		<table class="w-full text-sm">
			<thead>
				<tr class="border-b text-left text-gray-500">
					<th class="px-5 py-3 font-medium">Name</th>
					<th class="px-5 py-3 font-medium">Email</th>
					<th class="px-5 py-3 font-medium">Phone</th>
					<th class="px-5 py-3 font-medium">Experience</th>
					<th class="px-5 py-3 font-medium">Date</th>
				</tr>
			</thead>
			<tbody class="divide-y">
				{#each data.signups as signup}
					<tr class="hover:bg-gray-50">
						<td class="px-5 py-3 font-medium text-gray-900">{signup.first_name} {signup.last_name}</td>
						<td class="px-5 py-3 text-gray-600">
							<a href="mailto:{signup.email}" class="hover:underline">{signup.email}</a>
						</td>
						<td class="px-5 py-3 text-gray-600">{signup.phone ?? '—'}</td>
						<td class="px-5 py-3 text-gray-600">{signup.experience_level ? (experienceLabels[signup.experience_level] ?? signup.experience_level) : '—'}</td>
						<td class="px-5 py-3 text-gray-500">{formatDate(signup.created_at)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}
