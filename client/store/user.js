export const USER = 'user';
export const JWT = 'jwt';

export const state = () => ({
  [ USER ]: null,
  [ JWT ]: null
});
export const mutations = {
  [ USER ] (state, user) {
    state[ USER ] = user;
  },
  [ JWT ] (state, jwt) {
    state[ JWT ] = jwt;
    
    // 存入 localStorage 中
    if (process.client) {
      if (jwt) {
        window.localStorage[ JWT ] = jwt;
      }
      else {
        delete window.localStorage[ JWT ];
      }
    }
  }
};
