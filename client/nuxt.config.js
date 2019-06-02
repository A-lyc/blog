const pkg = require('./package');

const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

module.exports = {
  mode: 'universal',
  
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },
  
  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#eac02a',
    height: '4px'
  },
  
  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.styl'
  ],
  
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify',
    '@/plugins/api'
  ],
  
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/proxy'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options,
    proxy: true,
    prefix: '/api'
  },
  
  proxy: {
    '/api': {
      target: process.env.NODE_ENV === 'development'
        // dev
        ? 'http://127.0.0.1:1337'
        // pro
        : 'http://www.qteam.site:1337',
      pathRewrite: {
        '^/api': '/'
      }
    }
  },
  
  /*
  ** Build configuration
  */
  build: {
    transpile: [ 'vuetify/lib' ],
    plugins: [ new VuetifyLoaderPlugin() ],
    loaders: {
      stylus: {
        import: [ '~assets/style/variables.styl' ]
      }
    },
    
    // css 提取成文件
    extractCSS: { allChunks: true },
    
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    
    }
  },
  
  router: {
    linkExactActiveClass: 'active'
  }
  
};
