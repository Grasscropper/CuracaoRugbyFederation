<script lang="ts">
	type Lang = 'en' | 'nl' | 'pap';

	let { value = $bindable<Lang>('en') }: { value?: Lang } = $props();

	const langs: { key: Lang; label: string }[] = [
		{ key: 'en', label: 'EN – English' },
		{ key: 'nl', label: 'NL – Nederlands' },
		{ key: 'pap', label: 'PAP – Papiamentu' }
	];
</script>

<div class="mb-5 flex gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1">
	{#each langs as lang}
		<button
			type="button"
			onclick={() => (value = lang.key)}
			class="flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition
				{value === lang.key ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}"
		>
			{lang.label}
		</button>
	{/each}
</div>
