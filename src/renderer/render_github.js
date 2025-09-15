import { github_stars } from '../api/github.js'
import { dynamic, encodeSVG } from '../utils.js'

const round_corners = true
const profile_icon = async (url, roundness = 5) => {
	const req = await fetch(url)
	const arrayBuffer = await req.arrayBuffer()
	const buffer = Buffer.from(arrayBuffer)
	const base64String = buffer.toString('base64')
	const w = 40
	const structure = `<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width="${w}" height="${w}" viewBox="0 0 ${w} ${w}"><image width="${w}" height="${w}" clip-path="inset(0% round ${roundness}px)" href="data:image/jpeg;base64,${base64String}"/></svg>`
	return 'data:image/svg+xml,' + encodeSVG(structure)
}

const github_stargazers = async stars => {
	const max_people = 10
	const { count, count_int, people } = stars

	const noun = count_int === 1 ? 'person' : 'people'
	const more = count_int > max_people ? ' including...' : '.'
	const caption = `<b>${count} ${noun}</b> ⭐ starred this repository${more}`
	const person = async obj => {
		let img_tag = obj.pfp
		if (round_corners) img_tag = await profile_icon(obj.pfp)
		return `<a href="${obj.link}"><img src="${img_tag}" width="40px" title="@${obj.handle}"/></a> `
	}

	let peopleArray = []
	for (let i = 0, n = Math.min(count_int, max_people); i < n; i++) {
		const individual = await person(people[i])
		peopleArray.push(individual)
	}

	return `<p>${caption}</p>\n<p align="left">${peopleArray.join('')}</p>`
}

export const github = async (input, cfg, clean) => {
	const { githubTag } = cfg
	const gh_stars = await github_stars(cfg)
	const gh_stargazers = await github_stargazers(gh_stars)

	let data = input
	data = dynamic(githubTag, data, clean ? '' : gh_stargazers)
	return data
}
