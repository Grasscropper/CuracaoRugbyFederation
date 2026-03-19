import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => ({ event: null });

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const form = await request.formData();
		const title = form.get('title')?.toString().trim();
		const date = form.get('date')?.toString();
		const location = form.get('location')?.toString().trim() || null;
		const description = form.get('description')?.toString().trim() || null;

		if (!title || !date) return fail(400, { error: 'Title and date are required.' });

		const { error } = await locals.supabase.from('events').insert({ title, date, location, description });
		if (error) return fail(500, { error: error.message });

		redirect(303, '/admin/events');
	}
};
