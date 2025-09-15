import { dynamic } from '../utils.js'
import { shield } from './shield.js'
import { instagram_stats } from '../api/instagram.js'

const instagram_shield = (data, cfg) => {
	const alt = 'Follow me on Instagram'
	const { src_light } = shield(
		data[0],
		cfg,
		{ label: 'Instagram', logo: 'instagram' },
		{ color: 'e23167', logoColor: 'white', labelColor: 'd02167' }
	)

	return (
		`<a href="https://instagram.com/${data[1]}"><picture>` +
		`<source srcset="${src_light}" media="(max-width: 768px)"/>` +
		`<source srcset="${src_light}" media="(prefers-color-scheme: dark)"/>` +
		`<img src="${src_light}" alt="${alt}" title="${alt}"/></picture></a>`
	)
}

export const instagram = async (input, cfg, clean) => {
	const { instaTag } = cfg
	const ig_stats = await instagram_stats()
	const shield_insta = clean ? '' : instagram_shield(ig_stats, cfg)

	let data = input
	data = dynamic(instaTag, data, clean ? '' : shield_insta)
	return [data, ig_stats[1]]
}
