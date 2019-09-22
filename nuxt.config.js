const webpack = require('webpack')

// path
const baseUrl = process.env.BASE_URL || 'https://motivation-switch.firebaseapp.com'
const baseDir = process.env.BASE_DIR || '/'
const basePath = baseUrl + baseDir
const isDev = process.env.NODE_ENV !== 'production'

// meta
const lang = 'ja'
const siteName = 'モチベーションスイッチ'
const siteDesc = '気分や好みに合わせた名言が届いて、モチベーションを上げてくれるサービスです。'
//const siteKeywords = '１つ目,２つ目,３つ目,４つ目'

// images
const iconImages = baseDir + 'img/icons/'
// このURLはnuxt.configにはダメらしい
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

      // 参考にしたサイトの設定方法
      //<meta property="og:title" content="${TITLE}">
      // <meta property="og:image" content="${IMAGE}">
      // <meta property="og:description" content="${DESCRIPTION}">
      // <meta property="og:url" content="${SITEURL}">
      // <meta property="og:type" content="website">
      // <meta property="og:site_name" content="${TITLE}">
      // <meta name="twitter:site" content="">
      // <meta name="twitter:card" content="summary_large_image">
      // <meta name="twitter:title" content="${TITLE}">
      // <meta name="twitter:image" content="${IMAGE}">
      // <meta name="twitter:description" content="${DESCRIPTION}">
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // render: {
  //       csp: {
  //           enabled: !isDev,
  //           policies: {
  //               'default-src': ['*'],
  //           }
  //       }
  //   },
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
    /*
    ** You can extend webpack config here
    */
    // extend (config, ctx) {
    //   /**
    //    * vue-loader に オプションを渡す
    //    */
    //   const vueLoader = config.module.rules.find(rule => rule.loader === 'vue-loader');
    //   const { options: {loaders} } = vueLoader || { options: {} }
    //   if (loaders) {
    //     for (const loader of Object.values(loaders)) {
    //       changeLoaderOptions(Array.isArray(loader) ? loader : [loader])
    //     }
    //   }
    //   config.module.rules.forEach(rule => changeLoaderOptions(rule.use))
    // }
  }
}

// /**
//  * loader の名前一致でオプションをセットする
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
