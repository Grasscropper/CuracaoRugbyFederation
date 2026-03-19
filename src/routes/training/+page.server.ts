import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { data: sessions } = await locals.supabase
		.from('training_sessions')
		.select('*')
		.order('day_of_week');

	return {
		sessions: sessions ?? []
	};
};
