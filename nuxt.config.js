const webpack = require('webpack')

// path
const baseUrl = process.env.BASE_URL || 'https://motivation-switch.firebaseapp.com'
const baseDir = process.env.BASE_DIR || '/'
const basePath = baseUrl + baseDir

// meta
const lang = 'ja'
const siteName = 'モチベーションスイッチ'
const siteDesc = '気分や好みに合わせた名言が届いて、モチベーションを上げてくれるサービスです。'
//const siteKeywords = '１つ目,２つ目,３つ目,４つ目'

// images
const iconImages = baseDir + 'img/icons/'
const ogpImage = basePath + 'ogp.png'

// pwa
const shortName = 'モチベスイッチ'
const manifestIcon = 'img/icons/icon-1024.png'
const splashscreens = baseDir + 'img/splashscreens/'

// etc
// const apiUrl = process.env.API_URL || 'https://example.com'
// const colorPrimary = '#0A428C'
// const colorSecondary = '#FA4988'

import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },

      // ogp関連
      { hid: 'og:title', property: 'og:title', content: siteName },
      { hid: 'og:image', property: 'og:image', content: ogpImage },
      { hid: 'og:description', property: 'og:description', content: siteDesc },
      { hid: 'og:url', property: 'og:url', content: basePath },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:site_name', property: 'og:site_name', content: siteName },
      { name: 'twitter:site', content: '@Twitter' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: siteName },
      { name: 'twitter:image', content: ogpImage },
      { name: 'twitter:description', content: siteDesc },
      // { property: 'article:publisher', content: 'FacebookURL' },
      // { property: 'fb:app_id', content: 'FacebookAppID' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
  ],

  axios: {
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {

  },
  /*
  ** Build configuration
  */
  build: {

    terser: {
      terserOptions: {
        compress: { drop_console: true }
      },
    },
  }
}

// /**
//  * loader の名前一致でオプションをセットする
//  * うまくいかずコメントアウトしているが、いつか復活させたいところ
//  */
// function changeLoaderOptions(loaders) {
//   if (loaders) {
//     for (const loader of loaders) {
//       let options;
//       switch (loader.loader) {
//         case 'sass-loader':
//           options = {
//             includePaths: [
//               path.resolve(__dirname, './assets/sass/foundation/variable/'),
//               path.resolve(__dirname, './assets/sass/foundation/mixin/')
//             ],
//             data: '@import "_variable";\n@import "_mixin";'
//           };
//           break
// // 他の loader を追加できる
// //        case 'stylus-loader':
// //          options = {
// //            includePaths: [path.resolve(__dirname, './assets/sass/')],
// //            import: ['_import']
// //          }
// //          break
//       }
//       if (options) {
//         Object.assign(loader.options, options)
//       }
//     }
//   }
// }
