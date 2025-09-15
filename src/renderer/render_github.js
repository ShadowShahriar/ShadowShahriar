import { github_stars } from '../api/github.js'
import { dynamic } from '../utils.js'

const github_stargazers = stars => {
	const max_people = 10
	const { count, count_int, people } = stars

	const noun = count_int === 1 ? 'person' : 'people'
	const more = count_int > max_people ? ' including...' : '.'
	const caption = `<b>${count} ${noun}</b> ⭐ starred this repository${more}`
	const person = obj => `<a href="${obj.link}"><img src="${obj.pfp}" width="40px" title="@${obj.handle}"/></a> `

	let peopleArray = []
	for (let i = 0, n = Math.min(count_int, max_people); i < n; i++) peopleArray.push(person(people[i]))

	return `<p>${caption}</p>\n<p align="left">${peopleArray.join('')}</p>`
}

export const github = async (input, cfg, clean) => {
	const { githubTag } = cfg
	const gh_stars = await github_stars(cfg)
	const gh_stargazers = clean ? '' : github_stargazers(gh_stars)

	let data = input
	data = dynamic(githubTag, data, clean ? '' : gh_stargazers)
	return data
}
