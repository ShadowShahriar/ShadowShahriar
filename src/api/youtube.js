import { shortnum, unixTime } from '../utils.js'
import { google } from 'googleapis'
import { parse, toSeconds } from 'iso8601-duration'

const youtube = google.youtube({ version: 'v3', auth: process.env.YOUTUBE_API_KEY })
const getPlaylistItems = () => {
	return new Promise((resolve, _) => {
		const config = { part: 'contentDetails', playlistId: process.env.YOUTUBE_PLAYLIST_ID }
		youtube.playlistItems.list(config, (err, response) => {
			if (err) {
				resolve([])
			} else {
				const videos = response.data.items.map(i => i.contentDetails.videoId)
				resolve(videos)
			}
		})
	})
}

export async function youtube_stats() {
	return new Promise((resolve, _) => {
		youtube.channels.list({ part: 'statistics', id: process.env.YOUTUBE_CHANNEL_ID }, (err, response) => {
			if (err) resolve([0, 0])
			const channels = response.data.items
			if (channels.length > 0) {
				const cs = channels[0].statistics
				resolve([shortnum(cs.subscriberCount), shortnum(cs.viewCount)])
			}
			resolve([0, 0])
		})
	})
}

export async function youtube_vids() {
	const list = await getPlaylistItems()
	if (list.length > 0) {
		return new Promise((resolve, _) => {
			youtube.videos.list({ part: 'id,snippet,contentDetails', id: list.join(',') }, (err, response) => {
				if (err) resolve([])
				else {
					let details = []
					const items = response.data.items
					for (let item of items) {
						const { snippet, contentDetails, id } = item
						const { title, publishedAt } = snippet
						const { duration } = contentDetails
						details.push({
							id,
							title,
							timestamp: unixTime(publishedAt),
							duration: toSeconds(parse(duration))
						})
					}
					resolve(details)
				}
			})
		})
	}
	return []
}
