import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	try {
		const { data } = await locals.supabase
			.from('page_content')
			.select('key, value, translations')
			.in('key', [
				'about_p1', 'about_p2',
				'about_sharks_p1', 'about_sharks_p2',
				'about_mission_1', 'about_mission_2', 'about_mission_3', 'about_mission_4', 'about_mission_5',
				'about_island_p1', 'about_island_p2'
			]);
		return { content: data ?? [] };
	} catch {
		return { content: [] };
	}
};
