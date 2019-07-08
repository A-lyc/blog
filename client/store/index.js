import { JWT } from './user';
import { CATEGORY_ARR, MOTTO_ARR } from './data';

export const actions = {
  async nuxtServerInit ({ commit, dispatch }, { app, req, error }) {
    return Promise.all([
      new Promise(async resolve => {
        let jwt = req.cookies[ JWT ];
        if (jwt) {
          try {
            await dispatch('user/refresh', jwt);
          }
          catch (err) {
          }
        }
        resolve();
      }),
      new Promise(async resolve => {
        try {
          commit(`data/${ CATEGORY_ARR }`, (await app.$api.getAllCategory()).data);
          commit(`data/${ MOTTO_ARR }`, (await app.$api.getAllMotto()).data);
        }
        catch (err) {
          error({
            statusCode: 500,
            message: '获取文章分类和格言时发生错误'
          });
        }
        resolve();
      })
    ]);
  }
};
