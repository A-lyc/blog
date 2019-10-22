import { JWT } from '../store'
import Alert from '../components/alert'
import Login from '../components/login'

export default function (context) {
  let { $axios, store } = context
  
  $axios.interceptors.request.use(
    // 拦截设置登陆状态 jwt
    function (config) {
      let jwt = store.state[ JWT ]
      
      config.headers = config.headers || {}
      config.params = config.params || {}
      
      if (jwt && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${ jwt }`
      }
      
      return config
    }
  )
  
  $axios.interceptors.response.use(
    function (res) {
      return res
    },
    // 拦截无权限响应，提示并弹出登陆框
    function (err) {
      let { status } = err.response
      if (status === 401 || status === 403) {
        Alert.$create({
          color: 'error',
          text: status === 401 ?
            '您的登陆状态已过期' :
            '您无权查看，请登陆'
        }).show()
        Login.$create({
          $props: { store }
        }).show()
        store.commit(JWT, '')
      }
      return Promise.reject(err)
    }
  )
  
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
    // 判断当前的 jwt 是否有效
    async refreshMe (jwt) {
      return $axios.get('/users/me', {
        headers: {
          Authorization: `Bearer ${ jwt }`
        }
      })
    }
  }
}
