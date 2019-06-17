export const CATEGORY_ARR = 'categoryArr';
export const CATEGORY_CURRENT = 'categoryCurrent';
export const MOTTO_ARR = 'mottoArr';

export const state = () => ({
  [ CATEGORY_ARR ]: [],
  [ CATEGORY_CURRENT ]: {
    id: '*'
  },
  [ MOTTO_ARR ]: []
});
export const mutations = {
  [ CATEGORY_ARR ] (state, data) {
    state[ CATEGORY_ARR ] = data;
  },
  [ CATEGORY_CURRENT ] (state, data) {
    state[ CATEGORY_CURRENT ] = data;
  },
  [ MOTTO_ARR ] (state, data) {
    state[ MOTTO_ARR ] = data;
  }
};

