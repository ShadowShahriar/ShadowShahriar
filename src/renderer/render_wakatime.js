import { dynamic } from '../utils.js'
import { shield } from './shield.js'
import { wakatime_today, wakatime_total } from '../api/wakatime.js'

const wakatime_shield = (usr, data, cfg) => {
	const alt = 'Total time coded'
	const { src_light, src_dark } = shield(
		data,
		cfg,
		{ label: 'WakaTime', logo: 'wakatime' },
		{ color: '0f81c2', logoColor: 'white', labelColor: '5c5c5c' },
		{ color: '0f81c2', logoColor: 'white', labelColor: '5c5c5c' }
	)

	return (
		`<a href="https://wakatime.com/@${usr}"><picture>` +
		`<source srcset="${src_dark}" media="(max-width: 768px)"/>` +
		`<source srcset="${src_dark}" media="(prefers-color-scheme: dark)"/>` +
		`<img src="${src_light}" alt="${alt}" title="${alt}"/></picture></a>`
	)
}

export const wakatime = async (input, cfg, clean) => {
	const { activeTag, wakatimeTag } = cfg
	const wk_user = process.env.WAKATIME_USER_NAME
	const wk_total = await wakatime_total(wk_user)
	const wk_today = await wakatime_today(wk_user)
	const shield = clean ? '' : wakatime_shield(wk_user, wk_total, cfg)

	let data = input
	data = dynamic(wakatimeTag, data, clean ? '' : shield)
	data = dynamic(activeTag, data, clean ? '' : wk_today)
	return data
}
