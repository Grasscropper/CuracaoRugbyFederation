import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { data: posts } = await locals.supabase
		.from('news')
		.select('*')
		.order('published_at', { ascending: false });
	return { posts: posts ?? [] };
};

export const actions: Actions = {
	delete: async ({ locals, request }) => {
		const form = await request.formData();
		const id = form.get('id')?.toString();
		if (!id) return fail(400, { error: 'Missing id' });
		await locals.supabase.from('news').delete().eq('id', id);
		return { success: true };
	}
};
