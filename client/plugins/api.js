// 项目中的接口封装
import JWT from '../store/user';

import debug from '../assets/script/debug';

debug = debug('app:api');

export default function ({ app, store }, inject) {
  let { $axios } = app;
  
  // 请求拦截
  $axios.interceptors.request.use(function (config) {
    let jwt = store.state.user[ JWT ];
    
    debug(`
      axios 请求拦截，附带 header jwt，参数检查：
      jwt：${ jwt }
    `);
    
    if (!jwt) {
      return config;
    }
    else if (config.headers) {
      config.headers.Authorization = `Bearer ${ jwt }`;
      return config;
    }
    else {
      config.headers = {
        Authorization: `Bearer ${ jwt }`
      };
      return config;
    }
  });
  // 若 jwt 失效，则清空 jwt
  $axios.interceptors.response.use(function (res) {
    console.log(res);
    return res;
  });
  
  inject('api', {
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
          _sort: 'weight:DESC'
        }
      });
    },
    // 登陆
    login (params) {
      debug(`
        即将发送登陆请求，参数检查：
        identifier： ${ params.identifier }
        password：${ params.password }
      `);
      return $axios.post('/auth/local', params);
    },
    // 更新状态
    refreshMe () {
      debug(`
        即将发送请求，更新 jwt 和 user，检查参数：
        jwt: ${ store.state.user[ JWT ] }
      `);
      return $axios.get('/users/me');
    }
  });
}
