import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { data: signups } = await locals.supabase
		.from('signups')
		.select('*')
		.order('created_at', { ascending: false });
	return { signups: signups ?? [] };
};
