import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  try {
    const contentDir = join(process.cwd(), 'content')
    const files = readdirSync(contentDir, { recursive: true })

    const contentFiles = files.filter(file =>
      typeof file === 'string' && file.endsWith('.md')
    )

    const content = contentFiles.map(file => {
      const filePath = join(contentDir, file as string)
      const content = readFileSync(filePath, 'utf-8')
      return {
        file,
        content: content.substring(0, 200) + '...' // First 200 chars
      }
    })

    return {
      success: true,
      files: contentFiles,
      content
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}) 