import Vue from 'vue'
import CreateAPI from 'vue-create-api'

import Alert from '../../components/alert'
import Login from '../../components/login'
import Search from '../../components/search'
import Album from '../../components/album'

Vue.use(CreateAPI)

Vue.createAPI(Alert, true)
Vue.createAPI(Login, true)
Vue.createAPI(Search, true)
Vue.createAPI(Album, true)

// 设置全局 mixin
Vue.mixin({
  methods: {
    showAlert (...args) {
      this.$createCompAlert(...args).show()
    },
    showLogin (...args) {
      this.$createCompLogin(...args).show()
    },
    showSearch (...args) {
      this.$createCompSearch(...args).show()
    },
    showAlbum (...args) {
      this.$createCompAlbum(...args).show()
    },
    
    // $showAside, $hideAside 是在 aside 组件中 mounted 定义的
    showAside (...args) {
      Vue.prototype.$showAside(...args)
    },
    hideAside (...args) {
      Vue.prototype.$hideAside(...args)
    }
  }
})
