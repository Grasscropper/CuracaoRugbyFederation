import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const load: PageServerLoad = async ({ locals }) => {
	const { data: sessions } = await locals.supabase.from('training_sessions').select('*');
	const sorted = (sessions ?? []).sort(
		(a: { day_of_week: string }, b: { day_of_week: string }) =>
			dayOrder.indexOf(a.day_of_week) - dayOrder.indexOf(b.day_of_week)
	);
	return { sessions: sorted };
};

export const actions: Actions = {
	create: async ({ locals, request }) => {
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

		const { error } = await locals.supabase
			.from('training_sessions')
			.insert({ day_of_week, start_time, end_time, location, category, notes });

		if (error) return fail(500, { error: error.message });
		return { success: true };
	},

	delete: async ({ locals, request }) => {
		const form = await request.formData();
		const id = form.get('id')?.toString();
		if (!id) return fail(400, { error: 'Missing id' });
		await locals.supabase.from('training_sessions').delete().eq('id', id);
		return { success: true };
	}
};
