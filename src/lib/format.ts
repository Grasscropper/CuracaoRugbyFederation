/** Format a date string as dd/mm/yyyy */
export function formatDate(iso: string): string {
	const d = new Date(iso);
	return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

/** Format a datetime string as HH:MM (24h) */
export function formatTime(iso: string): string {
	const d = new Date(iso);
	return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

/** Format a datetime string as dd/mm/yyyy HH:MM */
export function formatDateTime(iso: string): string {
	return `${formatDate(iso)} ${formatTime(iso)}`;
}
