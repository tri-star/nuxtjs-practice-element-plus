export default defineNuxtConfig({
  srcDir: 'src',
  devtools: { enabled: true },
  css: ['assets/common.css'],
  typescript: {
    strict: true,
    tsConfig: {
      include: ['.eslintrc.cjs'],
      compilerOptions: {
        types: ['element-plus/global'],
      },
    },
  },
  modules: ['@element-plus/nuxt'],
})
