import { serialize, shortnum } from '../utils.js'

const threads_endpoint = 'https://graph.threads.net/v1.0'
const since = 1742490000 // unix timestamp

export async function threads_stats() {
	const api = `${threads_endpoint}/${process.env.THREADS_USER_ID}/threads_insights`
	const metric = 'views,followers_count,likes'
	const access_token = process.env.THREADS_ACCESS_TOKEN

	const req = await fetch(serialize(api, { metric, since, access_token }))
	if (req.status != 200) {
		console.log(req.headers.get('WWW-Authenticate'))
		return [null, null, null]
	}

	const { data } = await req.json()
	const views = data[0].values
	const totalViews = views.reduce((sum, item) => sum + item.value, 0)
	const followers = data[1].total_value.value
	const likes = data[2].total_value.value

	return [shortnum(followers), shortnum(totalViews), shortnum(likes)]
}
