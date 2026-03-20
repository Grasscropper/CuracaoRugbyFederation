<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	let { data }: { data: PageData } = $props();
	import { formatDate } from '$lib/format';
</script>

<svelte:head><title>News – CRF Admin</title></svelte:head>

<div class="mb-6 flex items-center justify-between">
	<h1 class="text-2xl font-bold text-gray-900">News</h1>
	<a href="/admin/news/new" class="rounded-full bg-crf-blue px-5 py-2 text-sm font-semibold text-white hover:bg-crf-red transition">+ New Article</a>
</div>

{#if data.posts.length === 0}
	<div class="rounded-2xl bg-white p-12 text-center text-gray-500 shadow-sm">No articles yet.</div>
{:else}
	<div class="space-y-3">
		{#each data.posts as post}
			<div class="flex items-center justify-between rounded-xl bg-white px-5 py-4 shadow-sm">
				<div>
					<p class="font-semibold text-gray-900">{post.title}</p>
					<p class="text-sm text-gray-500">{formatDate(post.published_at)}</p>
				</div>
				<div class="flex gap-2">
					<a href="/admin/news/{post.id}/edit" class="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium hover:bg-gray-50 transition">Edit</a>
					<form method="POST" action="?/delete" use:enhance>
						<input type="hidden" name="id" value={post.id} />
						<button type="submit" onclick={(e) => { if (!confirm('Delete this article?')) e.preventDefault(); }} class="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition">Delete</button>
					</form>
				</div>
			</div>
		{/each}
	</div>
{/if}
