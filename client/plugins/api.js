export default function ({ app }, inject) {
  let { $axios } = app;
  
  inject('api', {
    // 获取所有文章分类
    getAllCategory (params) {
      return $axios.get('/categories', {
        params: {
          _sort: 'weight:DESC,updatedAt:DESC',
          ...params
        }
      });
    },
    // 获取单个分类
    getOneCategory (id) {
      return $axios.get(`/categories/${ id }`);
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
    }
  });
}
