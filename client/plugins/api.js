import { JWT } from '../store/user';

export default function ({ app, store }, inject) {
  let { $axios } = app;
  let api = {
    /**
     *  无需登录状态的
     **/
    // 获取所有文章分类
    getAllCategory (params) {
      return $axios.get('/articlecategories', {
        params: {
          _sort: 'weight:DESC,updatedAt:DESC',
          ...params
        }
      });
    },
    // 获取单个分类
    getOneCategory (id) {
      return $axios.get(`/articlecategories/${ id }`);
    },
    // 获取所有文章
    getAllArticle (params) {
      return $axios.get('/articles', {
        params: {
          _sort: 'weight:DESC,updatedAt:DESC',
          ...params
        }
      });
    },
    // 获取单个文章
    getOneArticle (id) {
      return $axios.get('/articles/' + id);
    },
    // 获取格言
    getAllMotto (params) {
      return $axios.get('/mottos', {
        params: {
          _sort: 'weight:DESC,updatedAt:DESC',
          ...params
        }
      });
    },
    // 登陆
    login (params) {
      return $axios.post('/auth/local', params);
    },
    // 获取秦佳信息
    getJason (params) {
      return $axios.get('/users', {
        params: {
          _sort: 'weight:DESC,updatedAt:DESC',
          ...params
        }
      }).then(res => {
        res.data = res.data[ 0 ];
        return res;
      });
    },
    // 获取技能信息
    getSkills (params) {
      return $axios.get('/skills', {
        params: {
          _sort: 'weight:DESC,updatedAt:DESC',
          ...params
        }
      });
    },
    // 获取项目经验
    getProject (params) {
      return $axios.get('/projects', {
        params: {
          _sort: 'weight:DESC,updatedAt:DESC',
          ...params
        }
      });
    },
    
    /**
     *  需要登录状态的
     **/
    // 检查 jwt 是否有效，更新用户
    refreshMe () {
      return $axios.get('/users/me', {
        headers: {
          Authorization: `Bearer ${ store.state.user[ JWT ] }`
        }
      });
    },
    // 获取相册分类列表
    getAllAlbumCategory (params) {
      return $axios.get('/albumcategories', {
        headers: {
          Authorization: `Bearer ${ store.state.user[ JWT ] }`
        },
        params: {
          _sort: 'weight:DESC,updatedAt:DESC',
          ...params
        }
      });
    },
    // 获取相册图片列表
    getAllAlbum (params) {
      return $axios.get('/albums', {
        headers: {
          Authorization: `Bearer ${ store.state.user[ JWT ] }`
        },
        params: {
          _sort: 'weight:DESC,updatedAt:DESC',
          ...params
        }
      });
    }
  };
  
  inject('api', api);
}
