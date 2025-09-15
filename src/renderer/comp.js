import { serialize } from '../utils.js'

export const comp = (obj, theme) => {
	const { light, dark } = theme
	const obj_light = { theme: light.colorscheme, hide_border: !light.border }
	const src_light = serialize(obj.api, Object.assign(obj_light, obj.opts))

	const obj_dark = { theme: dark.colorscheme, hide_border: !dark.border }
	const src_dark = serialize(obj.api, Object.assign(obj_dark, obj.opts))
	const align = obj['align'] ? ` align="${obj['align']}"` : ''

	return (
		`<picture>` +
		`<source srcset="${src_dark}" media="(max-width: 768px)" width="${obj.sizes[0]}%"/>` +
		`<source srcset="${src_dark}" media="(prefers-color-scheme: dark)" width="${obj.sizes[1]}%"${align}/>` +
		`<img src="${src_light}" width="${obj.sizes[1]}%" alt="${obj.alt}"${align}/>` +
		`</picture>`
	)
}
