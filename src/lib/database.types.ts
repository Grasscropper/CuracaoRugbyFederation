export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
	public: {
		Tables: {
			events: {
				Row: {
					id: string;
					title: string;
					description: string | null;
					date: string;
					location: string | null;
					image_url: string | null;
					translations: Record<string, Record<string, string>>;
					created_at: string;
					updated_at: string;
				};
				Insert: Omit<Database['public']['Tables']['events']['Row'], 'id' | 'created_at' | 'updated_at'>;
				Update: Partial<Database['public']['Tables']['events']['Insert']>;
			};
			news: {
				Row: {
					id: string;
					title: string;
					content: string;
					image_url: string | null;
					published_at: string;
					translations: Record<string, Record<string, string>>;
					created_at: string;
					updated_at: string;
				};
				Insert: Omit<Database['public']['Tables']['news']['Row'], 'id' | 'created_at' | 'updated_at'>;
				Update: Partial<Database['public']['Tables']['news']['Insert']>;
			};
			training_sessions: {
				Row: {
					id: string;
					day_of_week: string;
					start_time: string;
					end_time: string;
					location: string;
					category: string;
					notes: string | null;
					translations: Record<string, Record<string, string>>;
					created_at: string;
					updated_at: string;
				};
				Insert: Omit<
					Database['public']['Tables']['training_sessions']['Row'],
					'id' | 'created_at' | 'updated_at'
				>;
				Update: Partial<Database['public']['Tables']['training_sessions']['Insert']>;
			};
			signups: {
				Row: {
					id: string;
					first_name: string;
					last_name: string;
					email: string;
					phone: string | null;
					date_of_birth: string | null;
					experience_level: string | null;
					message: string | null;
					created_at: string;
				};
				Insert: Omit<Database['public']['Tables']['signups']['Row'], 'id' | 'created_at'>;
				Update: Partial<Database['public']['Tables']['signups']['Insert']>;
			};
			page_content: {
				Row: {
					id: string;
					key: string;
					value: string;
					updated_at: string;
				};
				Insert: Omit<Database['public']['Tables']['page_content']['Row'], 'id' | 'updated_at'>;
				Update: Partial<Database['public']['Tables']['page_content']['Insert']>;
			};
		};
	};
}
