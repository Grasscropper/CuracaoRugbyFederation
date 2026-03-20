import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	try {
		const { data } = await locals.supabase
			.from('page_content')
			.select('key, value, translations')
			.in('key', ['home_hero_title', 'home_hero_subtitle', 'home_hero_body']);
		return { content: data ?? [] };
	} catch {
		return { content: [] };
	}
};
