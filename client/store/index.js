import { JWT } from './user';
import { CATEGORY_ARR, MOTTO_ARR } from './data';

export const actions = {
  async nuxtServerInit ({ commit, dispatch }, { app, req, error }) {
    return Promise.all([
      // 根据 cookie 设置登陆状态
      // 存入 store user 和 jwt
      new Promise(async (resolve, reject) => {
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
      // 获取文章分类，格言存入 store
      new Promise(async (resolve, reject) => {
        try {
          let resultArr = await Promise.all([
            app.$api.getAllCategory(),
            app.$api.getAllMotto()
          ]);
          commit(`data/${ CATEGORY_ARR }`, resultArr[ 0 ].data);
          commit(`data/${ MOTTO_ARR }`, resultArr[ 1 ].data);
          resolve();
        }
        catch (err) {
          error({
            statusCode: 500,
            message: '获取文章分类和格言时发生错误'
          });
          reject();
        }
      })
    ]);
  }
};
