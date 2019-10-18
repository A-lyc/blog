import { JWT } from '../store'

export default function (context) {
  let { $axios, store } = context
  
  // 拦截设置登陆状态 jwt
  $axios.interceptors.request.use(function (config) {
    let jwt = store.state[ JWT ]
    
    config.headers = config.headers || {}
    config.params = config.params || {}
    
    if (jwt && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${ jwt }`
    }
    
    return config
  })
  
  return {
    // 获取所有文章分类
    async getAllCategory (params) {
      return $axios.get('/categories', { params })
    },
    // 获取单个分类
    async getOneCategory (id) {
      return $axios.get(`/categories/${ id }`)
    },
    // 获取所有文章
    async getAllArticle (params) {
      return $axios.get('/articles', { params })
    },
    // 获取单个文章
    async getOneArticle (id) {
      return $axios.get('/articles/' + id)
    },
    // 获取相册图片列表
    async getAllAlbum (params) {
      return $axios.get('/albums', { params })
    },
    // 获取项目经验
    async getAllProject (params) {
      return $axios.get('/projects', { params })
    },
    // 获取秦佳信息
    async getJason (params) {
      return $axios.get('/users', { params }).then(res => {
        res.data = res.data[ 0 ]
        return res
      })
    },
    
    // 登陆
    async login (params) {
      return $axios.post('/auth/local', params)
    },
    // 根据 jwt 获取用户信息
    async refreshMe (jwt) {
      jwt = jwt || store.state.user[ JWT ]
      return $axios.get('/users/me', {
        headers: {
          Authorization: `Bearer ${ jwt }`
        }
      })
    }
  }
}
