import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	const session = await locals.getSession();
	if (!session && !url.pathname.includes('/admin/login')) {
		redirect(303, '/admin/login');
	}
	return { session };
};
