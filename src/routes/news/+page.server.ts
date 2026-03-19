import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	try {
		const { data: posts } = await locals.supabase
			.from('news')
			.select('*')
			.order('published_at', { ascending: false })
			.limit(20);
		return { posts: posts ?? [] };
	} catch {
		return { posts: [] };
	}
};
