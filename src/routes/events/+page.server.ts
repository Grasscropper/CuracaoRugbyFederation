import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	try {
		const { data: events } = await locals.supabase
			.from('events')
			.select('*')
			.gte('date', new Date().toISOString())
			.order('date');
		return { events: events ?? [] };
	} catch {
		return { events: [] };
	}
};
