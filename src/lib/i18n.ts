type Locale = 'en' | 'nl' | 'pap';

/** Fallback chain: pap → nl → en, nl → en, en → en */
const FALLBACK: Record<Locale, Locale[]> = {
	en: ['en'],
	nl: ['nl', 'en'],
	pap: ['pap', 'nl', 'en']
};

type TranslatableRow = Record<string, unknown> & {
	translations?: Record<string, Record<string, string>> | null;
};

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
