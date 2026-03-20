import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const { data: session } = await locals.supabase.from('training_sessions').select('*').eq('id', params.id).single();
	if (!session) error(404, 'Training session not found');
	return { session };
};

export const actions: Actions = {
	default: async ({ locals, request, params }) => {
		const form = await request.formData();
		const day_of_week = form.get('day_of_week')?.toString();
		const start_time = form.get('start_time')?.toString();
		const end_time = form.get('end_time')?.toString();
		const location = form.get('location')?.toString().trim();
		const category = form.get('category')?.toString().trim();
		const notes = form.get('notes')?.toString().trim() || null;

		if (!day_of_week || !start_time || !end_time || !location || !category) {
			return fail(400, { error: 'All fields except notes are required.' });
		}

		const translations: Record<string, Record<string, string>> = {};
		for (const lang of ['nl', 'pap']) {
			const langCategory = form.get(`${lang}_category`)?.toString().trim();
			const langNotes = form.get(`${lang}_notes`)?.toString().trim();
			const entry: Record<string, string> = {};
			if (langCategory) entry.category = langCategory;
			if (langNotes) entry.notes = langNotes;
			if (Object.keys(entry).length) translations[lang] = entry;
		}

		const { error: err } = await locals.supabase
			.from('training_sessions')
			.update({ day_of_week, start_time, end_time, location, category, notes, translations })
			.eq('id', params.id);

		if (err) return fail(500, { error: err.message });
		redirect(303, '/admin/training');
	}
};
