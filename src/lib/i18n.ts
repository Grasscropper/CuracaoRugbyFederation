type Locale = 'en' | 'nl' | 'pap';

/** Fallback chain: pap → nl → en, nl → en, en → en */
const FALLBACK: Record<Locale, Locale[]> = {
	en: ['en'],
	nl: ['nl', 'en'],
	pap: ['pap', 'nl', 'en']
};

export type TranslatableRow = Record<string, unknown> & {
	translations?: Record<string, Record<string, string>> | null;
};

type ContentRow = { key: string; value: string; translations?: Record<string, Record<string, string>> | null };

/**
 * Look up a page_content row by key and return the best translation.
 * Falls back to the static fallback string if no DB value exists.
 */
export function tc(rows: ContentRow[], key: string, locale: string, fallback = ''): string {
	const row = rows.find((r) => r.key === key);
	if (!row) return fallback;
	return t(row as TranslatableRow & { value: string }, locale, 'value') || fallback;
}

/**
 * Return the best available translation for a field on a content row.
 * Falls back through the chain: pap → nl → en.
 */
export function t(row: TranslatableRow, locale: string, field: string): string {
	const chain = FALLBACK[(locale as Locale)] ?? ['en'];
	for (const lang of chain) {
		if (lang === 'en') {
			const val = row[field];
			if (typeof val === 'string' && val) return val;
		} else {
			const val = row.translations?.[lang]?.[field];
			if (typeof val === 'string' && val) return val;
		}
	}
	return '';
}
