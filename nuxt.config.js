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
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
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
