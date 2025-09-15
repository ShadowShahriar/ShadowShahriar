import { serialize, badge_endpoint } from '../utils.js'

const shield_api = (data, cfg, opts) => {
	return serialize(`${badge_endpoint}/${data.replaceAll(' ', '%20')}-black`, opts) + `&style=${cfg.shield}`
}

export const shield = (data, cfg, commons, opts_light, opts_dark = {}) => {
	const src_light = shield_api(data, cfg, { ...commons, ...opts_light })
	const src_dark = shield_api(data, cfg, { ...commons, ...opts_dark })
	return { src_light, src_dark }
}
