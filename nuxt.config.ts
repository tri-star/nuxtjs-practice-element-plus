export default defineNuxtConfig({
  srcDir: 'src',
  devtools: { enabled: true },
  css: ['assets/common.css'],
  typescript: {
    strict: true,
    tsConfig: {
      include: ['../.eslintrc.cjs'],
      compilerOptions: {
        types: ['element-plus/global'],
      },
    },
  },
  modules: ['@element-plus/nuxt', '@nuxtjs/tailwindcss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/element.scss" as element;`,
        },
      },
    },
  },
  elementPlus: {
    icon: 'ElIcon',
    importStyle: 'scss',
  },
})
