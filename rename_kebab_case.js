#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const targetDir =
	'/Users/giovanniabbatepaolo/Documents/GitHub/giardino-digitale/src/db/seed/content/schede botaniche'

function toKebabCase(str) {
	return str
		.toLowerCase()
		.replace(/[^a-z0-9\s-\.\(\)]/g, '') // keep spaces, dashes, dots, parentheses for now
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '')
}

function ensureUnique(name, existing) {
	let base = name
	let ext = ''
	const dot = name.lastIndexOf('.')
	if (dot !== -1) {
		base = name.slice(0, dot)
		ext = name.slice(dot)
	}
	let candidate = name
	let i = 1
	while (existing.has(candidate) || fs.existsSync(path.join(targetDir, candidate))) {
		candidate = `${base}-${i}${ext}`
		i += 1
	}
	return candidate
}

function main() {
	const entries = fs
		.readdirSync(targetDir, { withFileTypes: true })
		.filter((e) => e.isFile() && e.name.endsWith('.md'))

	const planned = []
	const newNamesSet = new Set()

	for (const e of entries) {
		const oldName = e.name
		const base = oldName.replace(/\.md$/, '')
		const kebab = toKebabCase(base)
		const finalName = ensureUnique(`${kebab}.md`, newNamesSet)
		planned.push({ oldName, newName: finalName })
		newNamesSet.add(finalName)
	}

	for (const { oldName, newName } of planned) {
		if (oldName === newName) {
			console.log(`= ${oldName}`)
			continue
		}
		fs.renameSync(path.join(targetDir, oldName), path.join(targetDir, newName))
		console.log(`${oldName} -> ${newName}`)
	}

	console.log(
		`\nRenamed ${planned.filter((p) => p.oldName !== p.newName).length} of ${planned.length} files.`,
	)
}

main()
