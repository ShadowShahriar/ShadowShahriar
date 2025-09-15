import env from '../src/env.js'
import { instagram_stats } from '../src/api/instagram.js'
import { threads_stats } from '../src/api/threads.js'
import { youtube_stats, youtube_vids } from '../src/api/youtube.js'
import { wakatime_today, wakatime_total } from '../src/api/wakatime.js'
env()

async function main() {
	console.log('')

	const yt_vids = await youtube_vids()
	console.log('YouTube videos')
	console.log(yt_vids)
	console.log('')

	const yt_stats = await youtube_stats()
	console.log('YouTube stats:  ', yt_stats, '\t\t\t(subscribers, views)')

	const th_stats = await threads_stats()
	console.log('Threads stats:  ', th_stats, '\t\t(followers, views, likes)')

	const ig_stats = await instagram_stats()
	console.log('Instagram stats:', ig_stats, '\t\t(followers, username)')

	const wk_user = process.env.WAKATIME_USER_NAME
	console.log('')

	const wk_total = await wakatime_total(wk_user)
	console.log('WakaTime total time  :', wk_total)

	const wk_today = await wakatime_today(wk_user)
	console.log('WakaTime active today:', wk_today)
}
main()
