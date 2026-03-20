import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

const CONTENT_KEYS = [
	'nav_home', 'nav_about', 'nav_training', 'nav_events', 'nav_news', 'nav_join',
	'home_hero_title', 'home_hero_subtitle', 'home_hero_body',
	'about_title', 'about_subtitle', 'about_content'
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
