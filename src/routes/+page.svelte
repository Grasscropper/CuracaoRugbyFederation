<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Curaçao Rugby Federation</title>
	<meta name="description" content="The official website of the Curaçao Rugby Federation. Join us for training, events, and all things rugby on the island." />
</svelte:head>

<!-- Hero -->
<section class="relative min-h-[85vh] bg-crf-blue text-white">
	<div
		class="absolute inset-0 bg-cover bg-center opacity-20"
		style="background-image: url('/images/hero-bg.jpg')"
	></div>
	<div class="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-4 text-center">
		<img src="/crf-logo.png" alt="CRF Logo" class="mb-8 h-32 w-32 object-contain" onerror={() => { (this as HTMLImageElement).style.display = 'none'; }} />
		<h1 class="mb-4 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
			Curaçao <span class="text-yellow-300">Rugby</span>
		</h1>
		<p class="mb-2 text-xl font-semibold text-yellow-300 sm:text-2xl">
			Federashon di Rugby di Kòrsou
		</p>
		<p class="mb-10 max-w-2xl text-lg text-white/80">
			Bringing the passion of rugby to the island of Curaçao. Everyone is welcome — from first-timers to seasoned players.
		</p>
		<div class="flex flex-wrap justify-center gap-4">
			<a
				href="/join"
				class="rounded-full bg-yellow-400 px-8 py-3 text-lg font-bold text-crf-blue shadow-lg transition hover:bg-yellow-300"
			>
				Join the Team
			</a>
			<a
				href="/training"
				class="rounded-full border-2 border-white px-8 py-3 text-lg font-bold text-white transition hover:bg-white/10"
			>
				Training Schedule
			</a>
		</div>
	</div>
</section>

<!-- Quick Info Cards -->
<section class="bg-gray-50 py-16">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-8 md:grid-cols-3">
			<a href="/training" class="group rounded-2xl bg-white p-8 shadow-md transition hover:shadow-xl">
				<div class="mb-4 text-4xl">🏉</div>
				<h2 class="mb-2 text-xl font-bold text-crf-blue group-hover:text-crf-red">Training Sessions</h2>
				<p class="text-gray-600">
					We train multiple times a week at Saliña Terrain. All skill levels welcome — come sweat with us!
				</p>
				<span class="mt-4 inline-block font-semibold text-crf-blue group-hover:text-crf-red">View schedule →</span>
			</a>

			<a href="/events" class="group rounded-2xl bg-white p-8 shadow-md transition hover:shadow-xl">
				<div class="mb-4 text-4xl">📅</div>
				<h2 class="mb-2 text-xl font-bold text-crf-blue group-hover:text-crf-red">Upcoming Events</h2>
				<p class="text-gray-600">
					From local tournaments to Caribbean Championships — follow our events and come cheer us on!
				</p>
				<span class="mt-4 inline-block font-semibold text-crf-blue group-hover:text-crf-red">See events →</span>
			</a>

			<a href="/join" class="group rounded-2xl bg-white p-8 shadow-md transition hover:shadow-xl">
				<div class="mb-4 text-4xl">🙌</div>
				<h2 class="mb-2 text-xl font-bold text-crf-blue group-hover:text-crf-red">Join Us</h2>
				<p class="text-gray-600">
					New to rugby? Never played before? No problem. Sign up and we'll take care of the rest.
				</p>
				<span class="mt-4 inline-block font-semibold text-crf-blue group-hover:text-crf-red">Sign up →</span>
			</a>
		</div>
	</div>
</section>

<!-- About Teaser -->
<section class="py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid items-center gap-12 lg:grid-cols-2">
			<div>
				<h2 class="mb-4 text-3xl font-bold text-crf-blue sm:text-4xl">Our Story</h2>
				<p class="mb-4 text-gray-700">
					The Curaçao Rugby Federation is the governing body for rugby union in Curaçao,
					a constituent country of the Kingdom of the Netherlands in the southern Caribbean Sea.
				</p>
				<p class="mb-6 text-gray-700">
					We are affiliated with Rugby Americas North (RAN) and World Rugby, and our national team —
					the <strong>Curaçao Sharks</strong> — compete in Caribbean and Americas regional competitions.
				</p>
				<a
					href="/about"
					class="inline-block rounded-full bg-crf-blue px-6 py-3 font-semibold text-white transition hover:bg-crf-red"
				>
					Read our full story
				</a>
			</div>
			<div class="overflow-hidden rounded-2xl bg-gray-100">
				<img
					src="/images/team.jpg"
					alt="Curaçao Rugby team"
					class="h-80 w-full object-cover"
				/>
			</div>
		</div>
	</div>
</section>

<!-- Social Media Feed CTA -->
<section class="bg-crf-blue py-16 text-white">
	<div class="mx-auto max-w-4xl px-4 text-center">
		<h2 class="mb-4 text-3xl font-bold">Follow Our Journey</h2>
		<p class="mb-8 text-white/80">
			Stay up to date with match results, training highlights, and island life — follow us on social media.
		</p>
		<div class="flex justify-center gap-6">
			<a
				href="https://www.facebook.com/CuracaoRugby"
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center gap-2 rounded-full bg-[#1877f2] px-6 py-3 font-semibold transition hover:opacity-90"
			>
				<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
					<path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
				</svg>
				Facebook
			</a>
			<a
				href="https://www.instagram.com/curacaorugby"
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 px-6 py-3 font-semibold transition hover:opacity-90"
			>
				<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
					<path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
				</svg>
				Instagram
			</a>
		</div>
	</div>
</section>
