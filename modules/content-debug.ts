import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: { name: 'content-debug-hooks' },
  setup(_, nuxt) {
    const DEBUG = true

    nuxt.hooks.hook('content:file:beforeParse', (file: any) => {
      if (!DEBUG) return
      const id = file?._id || file?.path || file?.id || '(no-id)'
      console.log('[mod:beforeParse]', id, { ext: file?.extension, mtime: file?.mtime })
    })

    nuxt.hooks.hook('content:file:afterParse', (file: any) => {
      const id = file?._id || file?.path || file?.id || '(no-id)'
      if (!file?.body) {
        DEBUG && console.log('[mod:afterParse:skip]', id)
        return
      }
      let nodes = 0
      let mdImages = 0
      let hastImgs = 0
      let mdcImgs = 0

      const walk = (node: any) => {
        if (!node) return
        if (Array.isArray(node)) return node.forEach(walk)
        nodes++
        const isMdAstImage = node && node.type === 'image' && typeof node.url === 'string'
        const isHAstImg = node && (node.tag === 'img' || node.tagName === 'img')
        const tagName = String((node && (node.name || node.tag || node.tagName)) || '').toLowerCase()
        const isMdcImageComponent = ['im', 'contentimage', 'imagecomponent', 'cimg'].includes(tagName)
        if (isMdAstImage) mdImages++
        if (isHAstImg) hastImgs++
        if (isMdcImageComponent) mdcImgs++
        const children = node.children || node.body || []
        if (Array.isArray(children)) children.forEach(walk)
      }

      walk(file.body)
      DEBUG && console.log('[mod:afterParse:summary]', {
        file: id,
        nodes,
        mdImages,
        hastImgs,
        mdcImgs
      })
    })
  }
})


