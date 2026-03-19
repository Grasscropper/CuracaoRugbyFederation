import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { data: events } = await locals.supabase
		.from('events')
		.select('*')
		.order('date', { ascending: false });
	return { events: events ?? [] };
};

export const actions: Actions = {
	delete: async ({ locals, request }) => {
		const form = await request.formData();
		const id = form.get('id')?.toString();
		if (!id) return fail(400, { error: 'Missing id' });
		await locals.supabase.from('events').delete().eq('id', id);
		return { success: true };
	}
};
