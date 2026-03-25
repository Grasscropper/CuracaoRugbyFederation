<script lang="ts">
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();

	const currentLocale = $derived(
		locales.find((l) => page.url.pathname === `/${l}` || page.url.pathname.startsWith(`/${l}/`)) ?? 'en'
	);
</script>

{#key currentLocale}
<div class="flex min-h-screen flex-col">
	<Nav />
	<main class="flex-1">{@render children()}</main>
	<Footer />
</div>
{/key}

<div style="display:none">
	{#each locales as locale}
		<a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
	{/each}
</div>
