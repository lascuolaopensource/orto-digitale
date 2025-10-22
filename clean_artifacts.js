#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Function to clean pandoc formatting artifacts
function cleanPandocArtifacts(content) {
	let cleaned = content

	// Remove empty mark spans: []{.mark}
	cleaned = cleaned.replace(/\[\]\{\.mark\}/g, '')

	// Remove mark spans: [text]{.mark}
	cleaned = cleaned.replace(/\[([^\]]*)\]\{\.mark\}/g, '$1')

	// Remove underline spans: [text]{.underline}
	cleaned = cleaned.replace(/\[([^\]]*)\]\{\.underline\}/g, '$1')

	// Remove any other pandoc spans with various classes
	// Pattern: [text]{.classname} or [text]{.class1 .class2}
	cleaned = cleaned.replace(/\[([^\]]*)\]\{[^}]*\}/g, '$1')

	// Clean up any double spaces that might have been created
	cleaned = cleaned.replace(/  +/g, ' ')

	// Clean up any empty lines that might have been created
	cleaned = cleaned.replace(/\n\s*\n\s*\n/g, '\n\n')

	return cleaned
}

// Main function
function cleanMarkdownFiles() {
	const schedeDir =
		'/Users/giovanniabbatepaolo/Documents/GitHub/giardino-digitale/src/db/seed/content/schede botaniche'

	const files = fs
		.readdirSync(schedeDir)
		.filter((file) => file.endsWith('.md'))
		.sort()

	let processedCount = 0
	let totalChanges = 0

	console.log('Cleaning pandoc formatting artifacts from markdown files...\n')

	for (const file of files) {
		const filePath = path.join(schedeDir, file)
		const originalContent = fs.readFileSync(filePath, 'utf8')

		const cleanedContent = cleanPandocArtifacts(originalContent)

		// Check if any changes were made
		if (originalContent !== cleanedContent) {
			fs.writeFileSync(filePath, cleanedContent, 'utf8')

			// Count approximate number of changes by counting removed artifacts
			const originalArtifacts =
				(originalContent.match(/\[\]\{\.mark\}/g) || []).length +
				(originalContent.match(/\[([^\]]*)\]\{\.mark\}/g) || []).length +
				(originalContent.match(/\[([^\]]*)\]\{\.underline\}/g) || []).length +
				(originalContent.match(/\[([^\]]*)\]\{[^}]*\}/g) || []).length

			console.log(`✅ Cleaned ${file} (removed ~${originalArtifacts} formatting artifacts)`)
			totalChanges += originalArtifacts
			processedCount++
		} else {
			console.log(`⚪ No changes needed for ${file}`)
		}
	}

	console.log(`\nSummary:`)
	console.log(`- Files processed: ${files.length}`)
	console.log(`- Files cleaned: ${processedCount}`)
	console.log(`- Total artifacts removed: ~${totalChanges}`)
}

// Run the script
cleanMarkdownFiles()
