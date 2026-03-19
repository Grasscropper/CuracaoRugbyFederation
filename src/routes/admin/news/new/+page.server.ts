import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => ({});

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const form = await request.formData();
		const title = form.get('title')?.toString().trim();
		const content = form.get('content')?.toString().trim();
		const published_at = form.get('published_at')?.toString() || new Date().toISOString();

		if (!title || !content) return fail(400, { error: 'Title and content are required.' });

		const translations: Record<string, Record<string, string>> = {};
		for (const lang of ['nl', 'pap']) {
			const langTitle = form.get(`${lang}_title`)?.toString().trim();
			const langContent = form.get(`${lang}_content`)?.toString().trim();
			const entry: Record<string, string> = {};
			if (langTitle) entry.title = langTitle;
			if (langContent) entry.content = langContent;
			if (Object.keys(entry).length) translations[lang] = entry;
		}

		const { error } = await locals.supabase.from('news').insert({ title, content, published_at, translations });
		if (error) return fail(500, { error: error.message });
		redirect(303, '/admin/news');
	}
};
