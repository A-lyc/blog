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
  }
};
