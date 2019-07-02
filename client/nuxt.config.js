const pkg = require('./package');
const config = require('./config');

const isPro = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';

const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

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
    color: '#ff5252',
    height: '3px'
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
    },
    {
      src: '@/plugins/photoswipe',
      ssr: false
    },
    {
      src: '@/plugins/alert',
      ssr: false
    },
    {
      src: '@/plugins/vue-qr',
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
      target: isPro
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
    plugins: [
      new VuetifyLoaderPlugin(),
      // 删除 console
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: isPro
          }
        }
      })
    ],
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
