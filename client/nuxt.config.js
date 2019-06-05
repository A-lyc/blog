const pkg = require('./package');
const config = require('./config');

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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
    // 将 components 文件下的组件注册为全局组件
    '@/components/index',
    '@/plugins/vuetify',
    '@/plugins/api',
    {
      src: '@/plugins/keymaster',
      ssr: false
    }
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
      target: process.env.NODE_ENV === 'production'
        // pro
        ? config.proBaseUrl
        // dev
        : config.devBaseUrl,
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
    
    // 提取 css 为文件
    extractCSS: true,
    
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
