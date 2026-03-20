<script lang="ts">
	import type { LayoutData } from './$types';
	import { enhance } from '$app/forms';

	let { children, data }: { children: import('svelte').Snippet; data: LayoutData } = $props();

	const navLinks = [
		{ href: '/admin', label: 'Dashboard' },
		{ href: '/admin/content', label: 'Page Content' },
		{ href: '/admin/events', label: 'Events' },
		{ href: '/admin/news', label: 'News' },
		{ href: '/admin/training', label: 'Training' },
		{ href: '/admin/signups', label: 'Sign-ups' }
	];
</script>

<div class="flex min-h-screen bg-gray-100">
	<!-- Sidebar -->
	<aside class="w-64 bg-crf-blue text-white flex flex-col">
		<div class="p-6 border-b border-white/20">
			<h1 class="font-bold text-lg">CRF Admin</h1>
			<p class="text-xs text-white/60 mt-1">{data.session?.user?.email}</p>
		</div>
		<nav class="flex-1 p-4 space-y-1">
			{#each navLinks as link}
				<a
					href={link.href}
					class="block rounded-lg px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition"
				>
					{link.label}
				</a>
			{/each}
		</nav>
		<div class="p-4 border-t border-white/20">
			<form method="POST" action="/admin/logout" use:enhance>
				<button type="submit" class="w-full rounded-lg px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition text-left">
					Sign Out
				</button>
			</form>
		</div>
	</aside>

	<!-- Main content -->
	<main class="flex-1 p-8">
		{@render children()}
	</main>
</div>
