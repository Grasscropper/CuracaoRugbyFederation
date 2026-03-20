<script lang="ts">
	import { page } from '$app/state';
	import { locales, localizeHref, getLocale } from '$lib/paraglide/runtime';
	import * as m from '$lib/paraglide/messages';

	let menuOpen = $state(false);

	const navLinks = $derived([
		{ href: '/', label: m.nav_home() },
		{ href: '/about', label: m.nav_about() },
		{ href: '/training', label: m.nav_training() },
		{ href: '/events', label: m.nav_events() },
		{ href: '/news', label: m.nav_news() },
		{ href: '/join', label: m.nav_join() }
	]);

	const localeLabels: Record<string, string> = { en: 'EN', nl: 'NL', pap: 'PAP' };

	const currentLocale = $derived(
		locales.find((l) => page.url.pathname === `/${l}` || page.url.pathname.startsWith(`/${l}/`)) ?? 'en'
	);
</script>

<nav class="bg-crf-blue text-white shadow-lg">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<!-- Logo -->
			<a href="/" class="flex items-center gap-3">
				<img
					src="/img/logo.jpg"
					alt="CRF Logo"
					class="h-10 w-10 rounded-full object-cover"
				/>
				<div>
					<span class="block text-lg font-bold leading-tight">Curaçao</span>
					<span class="block text-sm font-medium leading-tight text-yellow-300">Rugby Federation</span>
				</div>
			</a>

			<!-- Desktop nav -->
			<div class="hidden items-center gap-1 md:flex">
				{#each navLinks as link}
					<a
						href={link.href}
						class="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10
							{page.url.pathname === link.href ? 'bg-white/20 text-yellow-300' : ''}"
					>
						{link.label}
					</a>
				{/each}

				<!-- Language switcher -->
				<div class="ml-3 flex items-center gap-1 border-l border-white/30 pl-3">
					{#each locales as locale}
						<a
							href={localizeHref(page.url.pathname, { locale })}
							class="rounded px-2 py-1 text-xs font-bold transition-colors hover:bg-white/10
								{currentLocale === locale ? 'bg-white/20 text-yellow-300' : 'text-white/70'}"
						>
							{localeLabels[locale] ?? locale.toUpperCase()}
						</a>
					{/each}
				</div>
			</div>

			<!-- Mobile: language + hamburger -->
			<div class="flex items-center gap-2 md:hidden">
				<div class="flex gap-1">
					{#each locales as locale}
						<a
							href={localizeHref(page.url.pathname, { locale })}
							class="rounded px-1.5 py-1 text-xs font-bold transition-colors hover:bg-white/10
								{currentLocale === locale ? 'text-yellow-300' : 'text-white/70'}"
						>
							{localeLabels[locale] ?? locale.toUpperCase()}
						</a>
					{/each}
				</div>
				<button
					class="rounded-md p-2 hover:bg-white/10"
					onclick={() => (menuOpen = !menuOpen)}
					aria-label="Toggle menu"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						{#if menuOpen}
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						{:else}
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
						{/if}
					</svg>
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile menu -->
	{#if menuOpen}
		<div class="border-t border-white/20 md:hidden">
			<div class="space-y-1 px-4 py-2">
				{#each navLinks as link}
					<a
						href={link.href}
						class="block rounded-md px-3 py-2 text-sm font-medium hover:bg-white/10
							{page.url.pathname === link.href ? 'bg-white/20 text-yellow-300' : ''}"
						onclick={() => (menuOpen = false)}
					>
						{link.label}
					</a>
				{/each}
			</div>
		</div>
	{/if}
</nav>
