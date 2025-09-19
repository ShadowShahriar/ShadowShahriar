import { Octokit } from 'octokit'

export async function gh_profile(user) {
	const octokit = new Octokit({ auth: process.env.GH_PAT })
	const headers = { 'X-GitHub-Api-Version': '2022-11-28' }
	const gh_profile = await octokit.request(`GET /users/${user}`, { headers })
	const { hireable, created_at } = gh_profile.data
	const joined = new Date(created_at)

	const oneDay = 1000 * 60 * 60 * 24
	const diff = new Date().getTime() - joined.getTime()
	const profile_age = Math.round(diff / oneDay)
	return { hireable, profile_age }
}
