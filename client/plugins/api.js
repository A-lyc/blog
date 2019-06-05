// 项目中的接口封装
import { JWT } from '../store/user';

export default function ({ app, store }, inject) {
  let { $axios } = app;
  
  // 若 jwt 失效，则清空 jwt
  $axios.interceptors.response.use(function (res) {
    return res;
  });
  
  inject('api', {
    // 获取所有文章分类
    getAllCategory (params) {
      this.$debug('refreshMe')('检查参数');
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
          _sort: 'weight:DESC'
        }
      });
    },
    // 登陆
    login (params) {
      return $axios.post('/auth/local', params);
    },
    
    // 更新状态
    refreshMe () {
      this.$debug('refreshMe')('检查参数');
      return $axios.get('/users/me', {
        headers: {
          Authorization: `Bearer ${ store.state.user[ JWT ] }`
        }
      });
    }
  });
}
