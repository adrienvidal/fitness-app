import sharp from 'sharp'
import { readdir, unlink } from 'fs/promises'
import { join, extname, basename } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectsDir = join(__dirname, '../public')

async function getFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await getFiles(fullPath)))
    } else if (['.png', '.jpg', '.jpeg'].includes(extname(entry.name).toLowerCase())) {
      files.push(fullPath)
    }
  }
  return files
}

const files = await getFiles(projectsDir)

if (files.length === 0) {
  console.log('No PNG/JPG files found.')
  process.exit(0)
}

for (const file of files) {
  const webpPath = file.replace(/\.(png|jpg|jpeg)$/i, '.webp')
  const { size: before } = await import('fs').then(m => m.promises.stat(file))
  await sharp(file).webp({ quality: 85 }).toFile(webpPath)
  const { size: after } = await import('fs').then(m => m.promises.stat(webpPath))
  const saving = (((before - after) / before) * 100).toFixed(1)
  console.log(`${basename(file)} → ${basename(webpPath)} (${saving}% smaller)`)
  await unlink(file)
}

console.log(`\nDone — converted ${files.length} file(s).`)
