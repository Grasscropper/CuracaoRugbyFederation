import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	try {
		const { data } = await locals.supabase
			.from('page_content')
			.select('key, value, translations')
			.in('key', ['about_title', 'about_subtitle', 'about_content']);
		return { content: data ?? [] };
	} catch {
		return { content: [] };
	}
};
