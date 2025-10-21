export function getRecipeAuthor(recipe: any): string {
  const content = recipe.content || recipe

  // Check if autore exists and handle as simple text field
  if (content && content.autore) {
    if (typeof content.autore === 'string') {
      return content.autore
    }
    // Extract author from rich text field if it exists (fallback for compatibility)
    if (typeof content.autore === 'object' && content.autore?.root?.children?.[0]?.text) {
      const text = content.autore.root.children
        .map((child: any) => child.text || '')
        .join(' ')
        .trim()
      return text
    }
  }

  return 'Autore non specificato'
}

export function getRecipeDescription(recipe: any): string {
  const content = recipe.content || recipe

  // First check for short_description field
  if (content && content.short_description) {
    return content.short_description
  }

  // Fall back to rich text descrizione field
  if (content && content.descrizione) {
    // Try to extract text from the rich text field if it exists
    if (typeof content.descrizione === 'object' && content.descrizione?.root?.children?.[0]?.text) {
      const text = content.descrizione.root.children
        .map((child: any) => child.text || '')
        .join(' ')
        .trim()
      return text.substring(0, 100) + (text.length > 100 ? '...' : '')
    }
  }

  return 'Esplora questa ricetta'
}
