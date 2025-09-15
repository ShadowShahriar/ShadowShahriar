import { Octokit } from 'octokit'
import { shortnum } from '../utils.js'

export async function github_stars(cfg) {
	const { repo } = cfg
	const per_page = 100
	const req = await fetch(`https://api.github.com/repos/${repo}`)
	const { stargazers_count } = await req.json()
	const approx_page = Math.round(stargazers_count / per_page)
	const octokit = new Octokit({ auth: process.env.GH_PAT })
	const headers = { 'X-GitHub-Api-Version': '2022-11-28' }
	const stargazers = await octokit.request(`GET /repos/${repo}/stargazers`, { page: approx_page, per_page, headers })
	const people = stargazers.data
		.map(p => {
			return { link: p.html_url, pfp: p.avatar_url, handle: p.login }
		})
		.reverse()
	return { count: shortnum(stargazers_count), count_int: stargazers_count, people }
}
