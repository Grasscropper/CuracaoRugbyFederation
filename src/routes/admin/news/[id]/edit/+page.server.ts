import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const { data: post } = await locals.supabase.from('news').select('*').eq('id', params.id).single();
	if (!post) error(404, 'Article not found');
	return { post };
};

export const actions: Actions = {
	default: async ({ locals, request, params }) => {
		const form = await request.formData();
		const title = form.get('title')?.toString().trim();
		const content = form.get('content')?.toString().trim();
		const published_at = form.get('published_at')?.toString();

		if (!title || !content) return fail(400, { error: 'Title and content are required.' });

		const { error: err } = await locals.supabase
			.from('news')
			.update({ title, content, ...(published_at ? { published_at } : {}) })
			.eq('id', params.id);

		if (err) return fail(500, { error: err.message });
		redirect(303, '/admin/news');
	}
};
