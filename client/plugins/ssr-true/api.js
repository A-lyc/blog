import api from '../../api'
import { JWT } from '../../store/user'

export default function ({ app, store }, inject) {
  let { $axios } = app
  
  $axios.interceptors.request.use(function (config) {
    let jwt = store.state.user[ JWT ]
    
    config.headers = config.headers || {}
    config.params = config.params || {}
    
    // 请求头中设置默认 jwt
    if (jwt && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${ jwt }`
    }
    
    return config
  })
  
  inject('api', api($axios))
}
