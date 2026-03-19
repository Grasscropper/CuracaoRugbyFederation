import type { SupabaseClient, Session } from '@supabase/supabase-js';

// See https://svelte.dev/docs/kit/types#app.d.ts
declare global {
	namespace App {
		interface Locals {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			supabase: SupabaseClient<any>;
			getSession(): Promise<Session | null>;
		}
		interface PageData {
			session: Session | null;
		}
	}
}

export {};
