import { dynamic, serialize } from '../utils.js'
import { shield } from './shield.js'
import { youtube_stats, youtube_vids } from '../api/youtube.js'

const youtube_shield_subs = (data, cfg) => {
	const alt = 'Subscribe to my YouTube channel'
	const { src_light } = shield(
		data,
		cfg,
		{ label: 'Subscribe', logo: 'video' },
		{ color: 'E05D44', logoColor: 'white', labelColor: 'CE4630' }
	)

	return (
		`<a href="https://www.youtube.com/channel/${process.env.YOUTUBE_CHANNEL_ID}?sub_confirmation=1"><picture>` +
		`<source srcset="${src_light}" media="(max-width: 768px)"/>` +
		`<source srcset="${src_light}" media="(prefers-color-scheme: dark)"/>` +
		`<img src="${src_light}" alt="${alt}" title="${alt}"/></picture></a>`
	)
}

const youtube_shield_views = (data, cfg) => {
	const alt = 'Total YouTube views'
	const { src_light } = shield(
		data,
		cfg,
		{ label: 'Views', logo: 'eye' },
		{ color: '1f6feb', logoColor: 'white', labelColor: '004feb' }
	)

	return (
		`<a href="https://www.youtube.com/channel/${process.env.YOUTUBE_CHANNEL_ID}"><picture>` +
		`<source srcset="${src_light}" media="(max-width: 768px)"/>` +
		`<source srcset="${src_light}" media="(prefers-color-scheme: dark)"/>` +
		`<img src="${src_light}" alt="${alt}" title="${alt}"/></picture></a>`
	)
}

const youtube_cards = (data, cfg) => {
	let cards = []
	const cards_api = 'https://ytcards.demolab.com'
	for (let item of data) {
		const { id, title, timestamp, duration } = item
		const commons = {
			id,
			title,
			timestamp,
			duration,
			lang: 'en',
			max_title_lines: 2,
			border_radius: 5
		}
		const src_light = serialize(cards_api, {
			...commons,
			background_color: '#ffffff',
			title_color: '#24292f',
			stats_color: '#57606a'
		})
		const src_dark = serialize(cards_api, {
			...commons,
			background_color: '#0d1117',
			title_color: '#ffffff',
			stats_color: '#dedede'
		})
		const card =
			`<a href="https://www.youtube.com/watch?v=${id}"><picture>` +
			`<source srcset="${src_dark}" media="(max-width: 768px)" width="90%"/>` +
			`<source srcset="${src_dark}" media="(prefers-color-scheme: dark)" width="250px"/>` +
			`<img src="${src_light}" alt="${title}" title="${title}" width="250px"/></picture></a>`
		cards.push(card)
	}
	return cards.join('\n')
}

export const youtube = async (input, cfg, clean) => {
	const { viewsTag, subsTag, vidsTag } = cfg
	const yt_stats = await youtube_stats()
	const yt_vids = await youtube_vids()
	const shield_subs = clean ? '' : youtube_shield_subs(yt_stats[0], cfg)
	const shield_views = clean ? '' : youtube_shield_views(yt_stats[1], cfg)
	const vid_cards = clean ? '' : youtube_cards(yt_vids, cfg)

	let data = input
	data = dynamic(subsTag, data, clean ? '' : shield_subs)
	data = dynamic(viewsTag, data, clean ? '' : shield_views)
	data = dynamic(vidsTag, data, clean ? '' : vid_cards)
	return data
}
