const wakatime_api = (usr, ep) => `https://wakatime.com/api/v1/users/${usr}/${ep}`
const wakatime_auth = {
	headers: {
		Authorization: 'Basic ' + Buffer.from(`${process.env.WAKATIME_API_KEY}:`).toString('base64')
	}
}

const getToday = () => {
	const dateObj = new Date()
	const full = dateObj
		.toLocaleString('en-US', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			timeZone: 'Asia/Dhaka'
		})
		.split('/')
	return [full[2], full[0], full[1]].join('-')
}

export async function wakatime_total(usr) {
	const wakatime = await fetch(wakatime_api(usr, 'stats'))
	const json = await wakatime.json()
	if (json.data) return json.data['human_readable_total_including_other_language']
	return false
}

export async function wakatime_today(usr) {
	const today = getToday()
	const request1 = await fetch(`${wakatime_api(usr, 'summaries')}?start=${today}&end=${today}`, wakatime_auth)
	const json1 = await request1.json()
	const { cumulative_total, data } = json1

	const codedToday = cumulative_total.text
	const seconds = cumulative_total.seconds
	if (seconds > 60) {
		const request2 = await fetch(`${wakatime_api(usr, 'durations')}?date=${today}`, wakatime_auth)
		const json2 = await request2.json()
		const data2 = json2.data
		if (data2.length > 0) {
			const { duration, time } = data2[data2.length - 1]
			const total = (duration + time) * 1000
			const timeLastActive = new Date(total).toLocaleTimeString('en-US', {
				hour: 'numeric',
				minute: '2-digit',
				hour12: true,
				timeZone: 'Asia/Dhaka'
			})
			const { categories } = data[0]
			let list_items = []
			for (let item of categories) {
				const activity = (item.name + '').toLowerCase()
				let activity_past = ''
				if (activity.startsWith('cod')) activity_past = 'coded'
				else if (activity.endsWith('docs')) activity_past = 'authored documentation'
				else activity_past = 'wrote unit tests'

				const time = item.text
				list_items.push(`<li>I ${activity_past} for <b>${time}</b>.</li>`)
			}

			const parts = [
				`In case you were wondering,`,
				`today I coded for <b>${codedToday}</b>`,
				`and I was last active at <b>${timeLastActive}</b> 😉`
			]
			return `<p>${parts.join(' ')}</p>\n<ul>${list_items.join('')}</ul>`
		}
	} else {
		return "Unfortunately, I couldn't code today 🙁"
	}
	return `Today I coded for <b>${codedToday}</b> ✨`
}
