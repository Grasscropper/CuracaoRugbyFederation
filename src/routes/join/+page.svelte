<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';
	let { data, form }: { data: PageData; form: ActionData } = $props();
	let submitting = $state(false);
</script>

<svelte:head><title>{m.join_page_title()} – Curaçao Rugby Federation</title></svelte:head>

<div class="bg-crf-blue py-16 text-center text-white">
	<h1 class="text-4xl font-extrabold sm:text-5xl">{m.join_page_title()}</h1>
	<p class="mt-2 text-white/70">{m.join_page_subtitle()}</p>
</div>

<div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
	{#if form?.success}
		<div class="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
			<p class="mb-4 text-4xl">🎉</p>
			<h2 class="mb-2 text-2xl font-bold text-green-800">{m.join_success_title()}</h2>
			<p class="text-green-700">{m.join_success_body()}</p>
			<a href="/" class="mt-6 inline-block rounded-full bg-crf-blue px-6 py-3 font-semibold text-white hover:bg-crf-red transition">{m.join_back_home()}</a>
		</div>
	{:else}
		<div class="rounded-2xl bg-white p-8 shadow-md">
			<h2 class="mb-2 text-2xl font-bold text-crf-blue">{m.join_form_title()}</h2>
			<p class="mb-6 text-sm text-gray-500">{m.join_form_subtitle()}</p>
			{#if form?.error}
				<div class="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{form.error}</div>
			{/if}
			<form method="POST" use:enhance={() => { submitting = true; return async ({ update }) => { submitting = false; await update(); }; }} class="space-y-5">
				<div class="grid gap-5 sm:grid-cols-2">
					<div>
						<label for="first_name" class="mb-1 block text-sm font-medium text-gray-700">{m.join_first_name()} *</label>
						<input id="first_name" name="first_name" type="text" required class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue" />
					</div>
					<div>
						<label for="last_name" class="mb-1 block text-sm font-medium text-gray-700">{m.join_last_name()} *</label>
						<input id="last_name" name="last_name" type="text" required class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue" />
					</div>
				</div>
				<div>
					<label for="email" class="mb-1 block text-sm font-medium text-gray-700">{m.join_email()} *</label>
					<input id="email" name="email" type="email" required class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue" placeholder={m.join_email_placeholder()} />
				</div>
				<div>
					<label for="phone" class="mb-1 block text-sm font-medium text-gray-700">{m.join_phone()}</label>
					<input id="phone" name="phone" type="tel" class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue" placeholder="+599 ..." />
				</div>
				<div>
					<label for="date_of_birth" class="mb-1 block text-sm font-medium text-gray-700">{m.join_dob()}</label>
					<input id="date_of_birth" name="date_of_birth" type="date" class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue" />
				</div>
				<div>
					<label for="experience_level" class="mb-1 block text-sm font-medium text-gray-700">{m.join_experience()}</label>
					<select id="experience_level" name="experience_level" class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue">
						<option value="">{m.join_exp_placeholder()}</option>
						<option value="never_played">{m.join_exp_none()}</option>
						<option value="beginner">{m.join_exp_beginner()}</option>
						<option value="intermediate">{m.join_exp_intermediate()}</option>
						<option value="experienced">{m.join_exp_experienced()}</option>
					</select>
				</div>
				<div>
					<label for="message" class="mb-1 block text-sm font-medium text-gray-700">{m.join_message()}</label>
					<textarea id="message" name="message" rows="3" placeholder={m.join_message_placeholder()} class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue"></textarea>
				</div>
				<button type="submit" disabled={submitting} class="w-full rounded-full bg-crf-blue py-3 font-bold text-white transition hover:bg-crf-red disabled:opacity-50">
					{submitting ? m.join_submitting() : m.join_submit()}
				</button>
			</form>
		</div>
	{/if}
</div>
