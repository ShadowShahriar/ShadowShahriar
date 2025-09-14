// === borrowed from https://stackoverflow.com/a/48546648 ===
export const serialize = (base, obj) =>
	`${base}/?` +
	Object.entries(obj)
		.map(i => [i[0], encodeURIComponent(i[1])].join('='))
		.join('&')

// === borrowed from https://stackoverflow.com/a/60980688 ===
export const shortnum = n => {
	const opts = { maximumFractionDigits: 1, notation: 'compact', compactDisplay: 'short' }
	return new Intl.NumberFormat('en-US', opts).format(n)
}
