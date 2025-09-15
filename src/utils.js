import { readFile, writeFile } from 'fs/promises'
const fs_encoding = 'utf-8'
const fs_cfg = './config.json'
const fs_out = './Readme.md'

const matchmaker = title => new RegExp(`(<!-- BEGIN ${title} -->)([\\s\\S]*?)(<!-- END ${title} -->)`, 'gm')
export const dynamic = (block, str, data) => str.replace(matchmaker(block), `$1\n${data}\n$3`)
export const badge_endpoint = 'https://custom-icon-badges.demolab.com/badge'

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

export const unixTime = str => {
	const date = new Date(str)
	return Math.floor(date.getTime() / 1000)
}

export const readConfig = async _ => {
	const cfgfile = await readFile(fs_cfg, fs_encoding)
	return JSON.parse(cfgfile)
}

export const read = async _ => {
	const data = await readFile(fs_out, fs_encoding)
	return data
}

export const write = async data => {
	await writeFile(fs_out, data, fs_encoding)
}
