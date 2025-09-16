import { dynamic } from '../utils.js'

export const lastUpdated = (input, cfg, clean) => {
	const { updateTag, lastUpdatedTag } = cfg

	const dateObj = new Date()
	const locale = 'en-US'
	const timeZone = 'Asia/Dhaka'

	const partDate = new Intl.DateTimeFormat(locale, {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone
	}).format(dateObj)

	const partTime = new Intl.DateTimeFormat(locale, {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true,
		timeZone
	}).format(dateObj)

	const block = `<pre>This Readme file was last updated on <b>${partDate}</b> at <b>${partTime} BST</b></pre>`
	let data = input
	data = dynamic(lastUpdatedTag, data, clean ? '' : block)
	data = dynamic(updateTag, data, clean ? '' : `<!-- ${Date.now()} -->`)
	return data
}
