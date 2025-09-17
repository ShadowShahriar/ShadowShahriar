import { configDotenv } from 'dotenv'
import { Octokit } from 'octokit'
configDotenv({ quiet: true })

async function main() {
	const octokit = new Octokit({ auth: process.env.GH_PAT })
	const response = await octokit.request('POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches', {
		headers: { 'X-GitHub-Api-Version': '2022-11-28', accept: 'application/vnd.github+json' },
		owner: 'ShadowShahriar',
		repo: 'ShadowShahriar',
		workflow_id: 'default.yml',
		ref: 'main'
	})
	if (response.status) console.log('✅ Sent a workflow dispatch event')
}

main()
