import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

const CONTENT_KEYS = [
	'home_hero_title', 'home_hero_subtitle', 'home_hero_body',
	'about_p1', 'about_p2',
	'about_sharks_p1', 'about_sharks_p2',
	'about_mission_1', 'about_mission_2', 'about_mission_3', 'about_mission_4', 'about_mission_5',
	'about_island_p1', 'about_island_p2'
];

export const load: PageServerLoad = async ({ locals }) => {
	const { data: rows } = await locals.supabase
		.from('page_content')
		.select('*')
		.in('key', CONTENT_KEYS);
	return { content: rows ?? [] };
};

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const form = await request.formData();
		const errors: string[] = [];

		for (const key of CONTENT_KEYS) {
			const value = form.get(key)?.toString().trim() ?? '';
			const translations: Record<string, Record<string, string>> = {};

			for (const lang of ['nl', 'pap']) {
				const langValue = form.get(`${lang}_${key}`)?.toString().trim();
				if (langValue) translations[lang] = { value: langValue };
			}

			const { error } = await locals.supabase
				.from('page_content')
				.upsert({ key, value, translations }, { onConflict: 'key' });

			if (error) errors.push(`${key}: ${error.message}`);
		}

		if (errors.length) return fail(500, { error: errors.join(', ') });
		return { success: true };
	}
};
