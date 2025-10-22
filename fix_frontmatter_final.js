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

// Function to generate unique filename
function generateUniqueFilename(baseName, existingFiles) {
	let filename = `${toKebabCase(baseName)}.md`
	let counter = 1

	while (existingFiles.includes(filename)) {
		filename = `${toKebabCase(baseName)}-${counter}.md`
		counter++
	}

	return filename
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
	const newFilenames = []

	console.log('Fixing frontmatter and renaming files...\n')

	// First pass: process all files and collect new filenames
	const fileData = []

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

		// Generate unique filename
		const newFilename = generateUniqueFilename(frontmatter.name, newFilenames)
		newFilenames.push(newFilename)

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

		fileData.push({
			originalFile: file,
			newFilename,
			newContent,
			currentZoning,
			newZoning,
			currentSeason,
			newSeason,
		})

		processedCount++
	}

	// Second pass: write all files with new names
	for (const data of fileData) {
		const newFilePath = path.join(schedeDir, data.newFilename)

		fs.writeFileSync(newFilePath, data.newContent, 'utf8')

		if (data.originalFile !== data.newFilename) {
			// Delete old file only if it's different from new filename
			const oldFilePath = path.join(schedeDir, data.originalFile)
			if (fs.existsSync(oldFilePath)) {
				fs.unlinkSync(oldFilePath)
			}
			renamedCount++
			console.log(`✅ Fixed and renamed: ${data.originalFile} → ${data.newFilename}`)
		} else {
			console.log(`✅ Fixed: ${data.originalFile}`)
		}

		console.log(`   Zoning: "${data.currentZoning}" → "${data.newZoning}"`)
		console.log(`   Season: "${data.currentSeason}" → "${data.newSeason}"`)
		console.log('')
	}

	console.log(`Summary:`)
	console.log(`- Files processed: ${processedCount}`)
	console.log(`- Files renamed: ${renamedCount}`)
	console.log(`- Files updated in place: ${processedCount - renamedCount}`)
}

// Run the script
fixFrontmatterAndRename()
