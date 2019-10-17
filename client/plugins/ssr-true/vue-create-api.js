import Vue from 'vue'
import CreateAPI from 'vue-create-api'

import Alert from '../../components/alert'
import Login from '../../components/login'
import Search from '../../components/search'

Vue.use(CreateAPI)

// 保证执行顺序
Vue.createAPI(Alert)
Vue.createAPI(Login, true)
Vue.createAPI(Search)
