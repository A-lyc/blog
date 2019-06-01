import _ from 'lodash';

export default function ({ app }, inject) {
  let axios = app.$axios;
  
  inject('api', {
    // 获取文章分类
    getArticleCategoryList (params) {
      return axios.get('/categories', {
        params: _.assign({
          _sort: 'createdAt:ASC'
        }, params)
      });
    },
    // 获取单个违章分类
    getArticleCategoryDetail (id) {
      return axios.get(`/categories/${ id }`);
    },
    // 获取文章列表
    getArticleList (params) {
      return axios.get('/articles', {
        params: _.assign({
          _sort: 'createdAt:DESC'
        }, params)
      });
    },
    // 获取文章详情
    getArticleDetail (id) {
      return axios.get(`/articles/${ id }`);
    }
  });
}
