/**
 * vuetify ui 库
 **/
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'font-awesome/css/font-awesome.min.css'

Vue.use(Vuetify, {
  iconfont: 'fa4',
  theme: {
    primary: '#ff5252',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})
