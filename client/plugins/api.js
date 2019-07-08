import { JWT } from '../store/user';

export default function ({ app, store }, inject) {
  let { $axios } = app;
  
  // 设置 jwt 和 _sort
  $axios.interceptors.request.use(function (config) {
    let jwt = store.state.user[ JWT ];
    
    config.headers = config.headers || {};
    config.params = config.params || {};
    
    if (jwt && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${ jwt }`;
    }
    if (config.method === 'get' && !config.params._sort) {
      config.params._sort = 'weight:DESC,updatedAt:DESC';
    }
    
    return config;
  });
  
  let api = {
    // 获取所有文章分类
    async getAllCategory (params) {
      return $axios.get('/articlecategories', { params });
    },
    // 获取单个分类
    async getOneCategory (id) {
      return $axios.get(`/articlecategories/${ id }`);
    },
    // 获取所有文章
    async getAllArticle (params) {
      return $axios.get('/articles', { params });
    },
    // 获取单个文章
    async getOneArticle (id) {
      return $axios.get('/articles/' + id);
    },
    // 获取格言
    async getAllMotto (params) {
      return $axios.get('/mottos', { params });
    },
    // 登陆
    async login (params) {
      return $axios.post('/auth/local', params);
    },
    // 获取秦佳信息
    async getJason (params) {
      return $axios.get('/users', { params }).then(res => {
        res.data = res.data[ 0 ];
        return res;
      });
    },
    // 获取技能信息
    async getSkills (params) {
      return $axios.get('/skills', { params });
    },
    // 获取项目经验
    async getProject (params) {
      return $axios.get('/projects', { params });
    },
    // 更新用户信息（检验 jwt 是否有效）
    async refreshMe (jwt) {
      jwt = jwt || store.state.user[ JWT ];
      return $axios.get('/users/me', {
        headers: {
          Authorization: `Bearer ${ jwt }`
        }
      });
    },
    // 获取相册分类列表
    async getAllAlbumCategory (params) {
      return $axios.get('/albumcategories', { params });
    },
    // 获取相册图片列表
    async getAllAlbum (params) {
      return $axios.get('/albums', { params });
    }
  };
  
  inject('api', api);
}
