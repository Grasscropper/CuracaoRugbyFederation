import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const { data: event } = await locals.supabase.from('events').select('*').eq('id', params.id).single();
	if (!event) error(404, 'Event not found');
	return { event };
};

export const actions: Actions = {
	default: async ({ locals, request, params }) => {
		const form = await request.formData();
		const title = form.get('title')?.toString().trim();
		const date = form.get('date')?.toString();
		const location = form.get('location')?.toString().trim() || null;
		const description = form.get('description')?.toString().trim() || null;

		if (!title || !date) return fail(400, { error: 'Title and date are required.' });

		const translations: Record<string, Record<string, string>> = {};
		for (const lang of ['nl', 'pap']) {
			const langTitle = form.get(`${lang}_title`)?.toString().trim();
			const langDesc = form.get(`${lang}_description`)?.toString().trim();
			const entry: Record<string, string> = {};
			if (langTitle) entry.title = langTitle;
			if (langDesc) entry.description = langDesc;
			if (Object.keys(entry).length) translations[lang] = entry;
		}

		const { error: err } = await locals.supabase
			.from('events')
			.update({ title, date, location, description, translations })
			.eq('id', params.id);

		if (err) return fail(500, { error: err.message });
		redirect(303, '/admin/events');
	}
};
