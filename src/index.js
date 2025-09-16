import env from './env.js'
import { readConfig, read, write, dynamic } from './utils.js'
import { repo, empty_repo } from './renderer/repo.js'
import { comp } from './renderer/comp.js'
import { wakatime } from './renderer/render_wakatime.js'
import { youtube } from './renderer/render_youtube.js'
import { instagram } from './renderer/render_instagram.js'
import { threads } from './renderer/render_threads.js'
import { github } from './renderer/render_github.js'
import { lastUpdated } from './renderer/render_last_updated.js'
env()

async function main() {
	const clean = false
	const cfg = await readConfig()
	const { pinned, components, theme } = cfg
	let readme = await read()

	// ===========================
	// === Pinned Repositories ===
	// ===========================
	console.time('✅ Pinned Repositories')
	for (let section in pinned) {
		let repos = []
		const len = pinned[section].length
		for (let item of pinned[section]) repos.push(repo(item, theme))
		if (len % 2 != 0) repos.push(empty_repo(section))
		readme = dynamic(section, readme, clean ? '' : repos.join('\n'))
	}
	console.timeEnd('✅ Pinned Repositories')

	// ================================
	// === GitHub Readme Components ===
	// ================================
	console.time('✅ GitHub Readme Components')
	for (let component in components) {
		const item = components[component]
		readme = dynamic(component, readme, clean ? '' : comp(item, theme))
	}
	console.timeEnd('✅ GitHub Readme Components')

	// =============================
	// === Dynamic Social Badges ===
	// =============================
	console.time('✅ WakaTime')
	readme = await wakatime(readme, cfg, clean)
	console.timeEnd('✅ WakaTime')

	console.time('✅ YouTube')
	readme = await youtube(readme, cfg, clean)
	console.timeEnd('✅ YouTube')

	console.time('✅ Instagram')
	const insta_shield = await instagram(readme, cfg, clean)
	readme = insta_shield[0]
	console.timeEnd('✅ Instagram')

	console.time('✅ Threads')
	readme = await threads(readme, cfg, clean, insta_shield[1])
	console.timeEnd('✅ Threads')

	// ==========================
	// === Dynamic Stargazers ===
	// ==========================
	console.time('✅ GitHub Stargazers')
	readme = await github(readme, cfg, clean)
	console.timeEnd('✅ GitHub Stargazers')

	// ====================
	// === Last Updated ===
	// ====================
	console.time('✅ Last Updated')
	readme = lastUpdated(readme, cfg, clean)
	console.timeEnd('✅ Last Updated')

	await write(readme)
}
main()
