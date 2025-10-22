#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// AREAS_IDS from Areas.ts
const AREAS_IDS = {
	atelier: 'atelier',
	entrata: 'entrata',
	percorsoAromatico: 'percorso-aromatico',
	tepee: 'tepee',
	vasche: 'vasche',
	percorsoAlimurgico: 'percorso-alimurgico',
	compostiera: 'compostiera',
	ricettario: 'ricettario',
	serra: 'serra',
	eventi: 'eventi',
	alberiDaFrutto: 'alberi-da-frutto',
}

// Mapping from current zoning values to AREAS_IDS values
const zoningMapping = {
	'Percorso Aromatiche': 'percorso-aromatico',
	'Percorso Alimurgiche': 'percorso-alimurgico',
	Verdure: 'serra', // Default to serra for vegetables
	'Arboree da Frutto': 'alberi-da-frutto',
	Fiori: 'serra', // Default to serra for flowers
	altro: 'serra', // Default to serra for other categories
}

// Mapping from current season values to Plants.ts schema values
const seasonMapping = {
	'Primavera/Estate': 'spring-summer',
	'Autunno/Inverno': 'fall-winter',
	'Entrambi - cambia grafica': 'all-year',
}

// Function to convert name to kebab-case
function toKebabCase(str) {
	return str
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
		.replace(/\s+/g, '-') // Replace spaces with hyphens
		.replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
		.replace(/^-|-$/g, '') // Remove leading/trailing hyphens
}

// Function to parse frontmatter
function parseFrontmatter(content) {
	const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n/)
	if (!frontmatterMatch) return null

	const frontmatterText = frontmatterMatch[1]
	const frontmatter = {}

	for (const line of frontmatterText.split('\n')) {
		const match = line.match(/^(\w+):\s*"([^"]*)"$/)
		if (match) {
			frontmatter[match[1]] = match[2]
		}
	}

	return frontmatter
}

// Function to create new frontmatter
function createFrontmatter(data) {
	return `---
name: "${data.name}"
latinName: "${data.latinName}"
zoning: "${data.zoning}"
season: "${data.season}"
---

`
}

// Function to fix frontmatter and rename files
function fixFrontmatterAndRename() {
	const schedeDir =
		'/Users/giovanniabbatepaolo/Documents/GitHub/giardino-digitale/src/db/seed/content/schede botaniche'

	const files = fs
		.readdirSync(schedeDir)
		.filter((file) => file.endsWith('.md'))
		.sort()

	let processedCount = 0
	let renamedCount = 0

	console.log('Fixing frontmatter and renaming files...\n')

	for (const file of files) {
		const filePath = path.join(schedeDir, file)
		const content = fs.readFileSync(filePath, 'utf8')

		// Parse current frontmatter
		const frontmatter = parseFrontmatter(content)
		if (!frontmatter) {
			console.log(`❌ No frontmatter found in ${file}`)
			continue
		}

		// Fix zoning
		const currentZoning = frontmatter.zoning
		const newZoning = zoningMapping[currentZoning] || 'serra'

		// Fix season
		const currentSeason = frontmatter.season
		const newSeason = seasonMapping[currentSeason] || 'all-year'

		// Create new frontmatter
		const newFrontmatter = createFrontmatter({
			name: frontmatter.name,
			latinName: frontmatter.latinName,
			zoning: newZoning,
			season: newSeason,
		})

		// Get content without frontmatter
		const contentWithoutFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n/, '')

		// Create new content
		const newContent = newFrontmatter + contentWithoutFrontmatter

		// Generate new filename
		const newFilename = `${toKebabCase(frontmatter.name)}.md`
		const newFilePath = path.join(schedeDir, newFilename)

		// Write new content
		fs.writeFileSync(newFilePath, newContent, 'utf8')

		// Rename file if needed
		if (file !== newFilename) {
			fs.unlinkSync(filePath) // Delete old file
			renamedCount++
			console.log(`✅ Fixed and renamed: ${file} → ${newFilename}`)
			console.log(`   Zoning: "${currentZoning}" → "${newZoning}"`)
			console.log(`   Season: "${currentSeason}" → "${newSeason}"`)
		} else {
			fs.writeFileSync(filePath, newContent, 'utf8') // Overwrite existing file
			console.log(`✅ Fixed: ${file}`)
			console.log(`   Zoning: "${currentZoning}" → "${newZoning}"`)
			console.log(`   Season: "${currentSeason}" → "${newSeason}"`)
		}

		processedCount++
		console.log('')
	}

	console.log(`Summary:`)
	console.log(`- Files processed: ${processedCount}`)
	console.log(`- Files renamed: ${renamedCount}`)
	console.log(`- Files updated in place: ${processedCount - renamedCount}`)
}

// Run the script
fixFrontmatterAndRename()
