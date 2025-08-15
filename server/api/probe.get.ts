import fs from 'node:fs'
import path from 'node:path'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - shim provided in types/
import probe from 'probe-image-size'
import { defineEventHandler, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  const { src } = getQuery(event) as { src?: string }
  if (!src) {
    return { ok: false, error: 'missing src' }
  }

  const attempts: Array<{ label: string; url?: string; file?: string; result?: any; error?: string }> = []

  const isHttp = (u: string) => u.startsWith('http://') || u.startsWith('https://')
  const strip = (u: string) => {
    const i = u.indexOf('?')
    return i === -1 ? u : u.slice(0, i)
  }

  try {
    if (isHttp(src)) {
      const url = src
      try {
        const r = await probe(url, { timeout: 3000 })
        attempts.push({ label: 'absolute', url, result: { width: r.width, height: r.height } })
      } catch (e: any) {
        attempts.push({ label: 'absolute', url, error: e?.message || String(e) })
      }
    } else {
      const rel = strip(src.startsWith('/') ? src.slice(1) : src)

      // 1) local public
      const publicDir = path.resolve(process.cwd(), 'public')
      const file = path.join(publicDir, rel)
      if (fs.existsSync(file)) {
        try {
          const r = await probe(`file://${file}`)
          attempts.push({ label: 'local-public', file, result: { width: r.width, height: r.height } })
        } catch (e: any) {
          attempts.push({ label: 'local-public', file, error: e?.message || String(e) })
        }
      } else {
        attempts.push({ label: 'local-public', file, error: 'not found' })
      }

      // 2) imagekit endpoint
      const endpoint = (process.env.IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/mxm').replace(/\/+$/, '')
      const ikUrl = `${endpoint}/${rel}`
      try {
        const r = await probe(ikUrl, { timeout: 3000 })
        attempts.push({ label: 'imagekit', url: ikUrl, result: { width: r.width, height: r.height } })
      } catch (e: any) {
        attempts.push({ label: 'imagekit', url: ikUrl, error: e?.message || String(e) })
      }

      // 3) public remote base
      const remoteBase = (process.env.PUBLIC_ASSETS_BASE || '').replace(/\/+$/, '')
      if (remoteBase) {
        const remoteUrl = `${remoteBase}/${rel}`
        try {
          const r = await probe(remoteUrl, { timeout: 3000 })
          attempts.push({ label: 'public-remote', url: remoteUrl, result: { width: r.width, height: r.height } })
        } catch (e: any) {
          attempts.push({ label: 'public-remote', url: remoteUrl, error: e?.message || String(e) })
        }
      }
    }
  } catch (e: any) {
    attempts.push({ label: 'general', error: e?.message || String(e) })
  }

  // Log attempts server-side for visibility
  // eslint-disable-next-line no-console
  console.log('[api/probe]', { src, attempts })
  return { ok: true, src, attempts }
})


