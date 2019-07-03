import { JWT } from './user';
import { CATEGORY_ARR, MOTTO_ARR } from './data';

export const actions = {
  nuxtServerInit ({ commit, dispatch }, { app, req, error }) {
    // 检验 jwt 是否有效
    // 有效则设置 user 和 jwt
    // 无效不做任何操作
    (async () => {
      let jwt = req.cookies[ JWT ];
      if (!jwt) return null;
      try {
        dispatch('user/refresh', jwt);
      }
      catch (err) {
      }
    })();
    // 获取文章分类和格言数据存入 store
    (async () => {
      try {
        commit(`data/${ CATEGORY_ARR }`, (await app.$api.getAllCategory()).data);
        commit(`data/${ MOTTO_ARR }`, (await app.$api.getAllMotto()).data);
      }
      catch (err) {
        return error({
          statusCode: 500,
          message: '获取文章分类和格言时发生错误'
        });
      }
    })();
  }
};
