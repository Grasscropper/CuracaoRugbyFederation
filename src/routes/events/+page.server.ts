import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { data: events } = await locals.supabase
		.from('events')
		.select('*')
		.gte('date', new Date().toISOString())
		.order('date');

	return {
		events: events ?? []
	};
};
