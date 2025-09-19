import { dynamic, shortnum } from '../utils.js'
import { shield } from './shield.js'
import { gh_profile } from '../api/gh-profile.js'

const renderHireable = (hireable, cfg) => {
	if (hireable) {
		if (cfg.jobPreference === 'freelancing') return 'Yes, I am open to <b>freelancing</b> opportunities.'
		else return 'Yes, I am looking for new opportunities!'
	}
	return ''
}

const renderShield = (data, cfg) => {
	const alt = 'GitHub Profile Views'
	const { src_light } = shield(
		data + '',
		cfg,
		{ label: 'Views', logo: 'github' },
		{ color: '12472b', logoColor: '909692', labelColor: '232925' }
	)

	return (
		`<a href="#"><picture>` +
		`<source srcset="${src_light}" media="(max-width: 768px)"/>` +
		`<source srcset="${src_light}" media="(prefers-color-scheme: dark)"/>` +
		`<img src="${src_light}" alt="${alt}" title="${alt}"/></picture></a>`
	)
}

export const profile_info = async (input, cfg, clean) => {
	const { hireTag, ghViewsTag, repo } = cfg
	const user = repo.split('/')[0]
	const { hireable, profile_age } = await gh_profile(user)

	const minimum_views = profile_age * (10 + 2)
	const shield = clean ? '' : renderShield(shortnum(minimum_views), cfg)
	const hire = clean ? '' : renderHireable(hireable, cfg)

	let data = input
	data = dynamic(ghViewsTag, data, shield)
	data = dynamic(hireTag, data, hire)
	return data
}
