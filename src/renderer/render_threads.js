import { dynamic } from '../utils.js'
import { shield } from './shield.js'
import { threads_stats } from '../api/threads.js'

const threads_shield = (data, cfg, usr) => {
	if (!data) return ''

	const alt = 'Follow me on Threads'
	const { src_light, src_dark } = shield(
		data,
		cfg,
		{ label: 'Threads', logo: 'threads' },
		{ color: '000000', logoColor: 'white', labelColor: '000000' },
		{ color: 'e4e4e4', logoColor: 'black', labelColor: 'ffffff' }
	)

	return (
		`<a href="https://www.threads.com/@${usr}"><picture>` +
		`<source srcset="${src_dark}" media="(max-width: 768px)"/>` +
		`<source srcset="${src_dark}" media="(prefers-color-scheme: dark)"/>` +
		`<img src="${src_light}" alt="${alt}" title="${alt}"/></picture></a>`
	)
}

export const threads = async (input, cfg, clean, usr) => {
	const { threadsTag } = cfg
	const th_stats = await threads_stats()
	const shield_threads = clean ? '' : threads_shield(th_stats[0], cfg, usr)

	let data = input
	data = dynamic(threadsTag, data, clean ? '' : shield_threads)
	return data
}
