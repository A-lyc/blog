export const USER = 'user';
export const JWT = 'jwt';

export const state = () => ({
  [ USER ]: null,
  [ JWT ]: null
});
export const actions = {
  // 登陆
  login ({ commit }, payload) {
    return this.$api.login(payload)
      .then(({ data }) => {
        commit(USER, data.user);
        commit(JWT, data.jwt);
      });
  },
  // 登出
  logout ({ commit }) {
    commit(JWT, null);
    commit(USER, null);
  },
  // 更新自己的数据
  refresh ({ state, commit }, jwt) {
    jwt = jwt || state[ JWT ];
    if (jwt) {
      this.$api.getMe(jwt)
        .then(({ data: user }) => {
          commit(USER, user);
          commit(JWT, jwt);
        });
    }
    else {
      console.error('refresh 时，jwt 不存在');
    }
  }
};
export const mutations = {
  [ USER ] (state, user) {
    state[ USER ] = user;
  },
  [ JWT ] (state, jwt) {
    state[ JWT ] = jwt;
    // 存储 jwt 到 cookie
    if (jwt) {
      // 条件为客户端环境，并且 jwt 不重复
      if (process.client && this.$cookies.get(JWT) !== jwt) {
        this.$cookies.set(JWT, jwt, { expires: 30 });
      }
    }
    // jwt 不存在，删除 user 和相应 cookie
    else {
      this.$cookies.remove(JWT);
    }
  }
};
