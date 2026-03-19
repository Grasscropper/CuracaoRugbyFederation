import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const [{ count: eventCount }, { count: signupCount }, { count: newsCount }] = await Promise.all([
		locals.supabase.from('events').select('*', { count: 'exact', head: true }),
		locals.supabase.from('signups').select('*', { count: 'exact', head: true }),
		locals.supabase.from('news').select('*', { count: 'exact', head: true })
	]);

	return { eventCount, signupCount, newsCount };
};
