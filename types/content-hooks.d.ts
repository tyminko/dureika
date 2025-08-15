declare module 'nitropack' {
  interface NitroRuntimeHooks {
    'content:file:afterParse': (
      ctx: import('@nuxt/content').FileAfterParseHook
    ) => void | Promise<void>
  }
}