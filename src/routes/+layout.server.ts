import type { LayoutServerLoad } from './$types';

const NAV_KEYS = ['nav_home', 'nav_about', 'nav_training', 'nav_events', 'nav_news', 'nav_join'];

export const load: LayoutServerLoad = async ({ locals }) => {
	const [session, navResult] = await Promise.all([
		locals.getSession(),
		locals.supabase.from('page_content').select('key, value, translations').in('key', NAV_KEYS)
	]);
	return {
		session,
		navContent: navResult.data ?? []
	};
};
