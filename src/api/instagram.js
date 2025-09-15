import { serialize, shortnum } from '../utils.js'

const instagram_endpoint = 'https://graph.instagram.com'
export async function instagram_stats() {
	const api = `${instagram_endpoint}/me`
	const fields = 'id,name,followers_count,username'
	const access_token = process.env.INSTAGRAM_ACCESS_TOKEN

	const req = await fetch(serialize(api, { fields, access_token }))
	const { followers_count, username } = await req.json()

	return [shortnum(followers_count), username]
}
