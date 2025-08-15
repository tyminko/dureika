// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import type { FileAfterParseHook } from '@nuxt/content'
import { ContentAfterParseTransform } from './scripts/md-after-parse-transform'

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/eslint',
  ],
  css: ['~/assets/css/main.css'],
  components: {
    global: true,
    dirs: [
      '~/components',
      '~/components/content'
    ]
  },

  app: {
    baseURL: '/dureika/'
  },

  // @ts-ignore - Nuxt Image module types
  image: {
    provider: 'imagekit',
    imagekit: {
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/mxm',
      baseURL: process.env.IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/mxm'
    },
    presets: {
      default: {
        provider: 'imagekit',
        sizes: 'sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw 2xl:100vw',
      }
    }
  },
  nitro: {
    compatibilityDate: '2025-08-08'
  },
  hooks: {
    async 'content:file:afterParse'(ctx: FileAfterParseHook) {
      await ContentAfterParseTransform(ctx)
    }
  }
})