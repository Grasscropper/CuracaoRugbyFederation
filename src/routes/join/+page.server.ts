import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {};
};

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const form = await request.formData();

		const first_name = form.get('first_name')?.toString().trim();
		const last_name = form.get('last_name')?.toString().trim();
		const email = form.get('email')?.toString().trim();
		const phone = form.get('phone')?.toString().trim() || null;
		const date_of_birth = form.get('date_of_birth')?.toString() || null;
		const experience_level = form.get('experience_level')?.toString() || null;
		const message = form.get('message')?.toString().trim() || null;

		if (!first_name || !last_name || !email) {
			return fail(400, { error: 'First name, last name, and email are required.' });
		}

		const { error } = await locals.supabase.from('signups').insert({
			first_name,
			last_name,
			email,
			phone,
			date_of_birth,
			experience_level,
			message
		});

		if (error) {
			console.error('Signup error:', error);
			return fail(500, { error: 'Something went wrong. Please try again.' });
		}

		return { success: true };
	}
};
