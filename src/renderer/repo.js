import { serialize } from '../utils.js'
const pinned_repo_endpoint = 'https://github-readme-stats.vercel.app/api/pin'

export const repo = (obj, theme) => {
	const sec = obj[0].split('/')
	const { light, dark } = theme
	const repo_light = {
		username: sec[0],
		repo: sec[1],
		description_lines_count: obj[1],
		theme: light.colorscheme,
		hide_border: !light.border
	}
	const repo_dark = {
		username: sec[0],
		repo: sec[1],
		description_lines_count: obj[1],
		theme: dark.colorscheme,
		hide_border: !dark.border
	}

	const src_light = serialize(pinned_repo_endpoint, repo_light)
	const src_dark = serialize(pinned_repo_endpoint, repo_dark)

	return (
		`<a href="https://github.com/${obj[0]}"><picture>` +
		`<source srcset="${src_dark}" media="(max-width: 768px)" width="100%"/>` +
		`<source srcset="${src_dark}" media="(prefers-color-scheme: dark)" width="47%"/>` +
		`<img src="${src_light}" width="47%" alt="<!-- Repository Card -->"/></picture></a>`
	)
}

export const empty_repo = href => {
	return (
		`<a href="#${href}"><picture>` +
		`<source srcset="placeholder.svg" media="(max-width: 768px)" width="0%" height="0%"/>` +
		`<img src="placeholder.svg" width="47%" alt="<!-- Empty Card -->"/>` +
		`</picture></a>`
	)
}
