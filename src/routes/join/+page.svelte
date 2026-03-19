<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let submitting = $state(false);
</script>

<svelte:head>
	<title>Join Us – Curaçao Rugby Federation</title>
	<meta name="description" content="Sign up to join the Curaçao Rugby Federation. All skill levels welcome!" />
</svelte:head>

<div class="bg-crf-blue py-16 text-center text-white">
	<h1 class="text-4xl font-extrabold sm:text-5xl">Join the Team</h1>
	<p class="mt-2 text-white/70">Fill in the form and we'll be in touch</p>
</div>

<div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
	{#if form?.success}
		<div class="rounded-2xl bg-green-50 border border-green-200 p-8 text-center">
			<p class="text-4xl mb-4">🎉</p>
			<h2 class="text-2xl font-bold text-green-800 mb-2">You're all signed up!</h2>
			<p class="text-green-700">Thanks for reaching out. We'll contact you soon with more details about training.</p>
			<a href="/" class="mt-6 inline-block rounded-full bg-crf-blue px-6 py-3 font-semibold text-white hover:bg-crf-red transition">
				Back to Home
			</a>
		</div>
	{:else}
		<div class="rounded-2xl bg-white p-8 shadow-md">
			<h2 class="mb-2 text-2xl font-bold text-crf-blue">Sign Up to Play Rugby</h2>
			<p class="mb-6 text-gray-500 text-sm">No experience needed. All ages and skill levels welcome.</p>

			{#if form?.error}
				<div class="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
					{form.error}
				</div>
			{/if}

			<form
				method="POST"
				use:enhance={() => {
					submitting = true;
					return async ({ update }) => {
						submitting = false;
						await update();
					};
				}}
				class="space-y-5"
			>
				<div class="grid gap-5 sm:grid-cols-2">
					<div>
						<label for="first_name" class="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
						<input
							id="first_name"
							name="first_name"
							type="text"
							required
							class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue"
							placeholder="First name"
						/>
					</div>
					<div>
						<label for="last_name" class="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
						<input
							id="last_name"
							name="last_name"
							type="text"
							required
							class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue"
							placeholder="Last name"
						/>
					</div>
				</div>

				<div>
					<label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
					<input
						id="email"
						name="email"
						type="email"
						required
						class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue"
						placeholder="your@email.com"
					/>
				</div>

				<div>
					<label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
					<input
						id="phone"
						name="phone"
						type="tel"
						class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue"
						placeholder="+599 ..."
					/>
				</div>

				<div>
					<label for="date_of_birth" class="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
					<input
						id="date_of_birth"
						name="date_of_birth"
						type="date"
						class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue"
					/>
				</div>

				<div>
					<label for="experience_level" class="block text-sm font-medium text-gray-700 mb-1">Rugby Experience</label>
					<select
						id="experience_level"
						name="experience_level"
						class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue"
					>
						<option value="">Select your experience level</option>
						<option value="never_played">Never played before</option>
						<option value="beginner">Beginner (played a little)</option>
						<option value="intermediate">Intermediate</option>
						<option value="experienced">Experienced player</option>
					</select>
				</div>

				<div>
					<label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message (optional)</label>
					<textarea
						id="message"
						name="message"
						rows="3"
						class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-crf-blue focus:outline-none focus:ring-1 focus:ring-crf-blue"
						placeholder="Any questions or things we should know?"
					></textarea>
				</div>

				<button
					type="submit"
					disabled={submitting}
					class="w-full rounded-full bg-crf-blue py-3 font-bold text-white transition hover:bg-crf-red disabled:opacity-50"
				>
					{submitting ? 'Submitting...' : 'Sign Me Up!'}
				</button>
			</form>
		</div>
	{/if}
</div>
