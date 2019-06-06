export const CATEGORY_ARR = 'categoryArr';
export const CURRENT_CATEGORY = 'currentCategory';

export const state = () => ({
  // 文章分类数组
  [ CATEGORY_ARR ]: [],
  // 当前页面所属的文章分类
  // 给导航定位使用
  [ CURRENT_CATEGORY ]: {
    id: '*'
  }
});
export const mutations = {
  [ CATEGORY_ARR ] (state, categoryArr) {
    state[ CATEGORY_ARR ] = categoryArr;
  },
  [ CURRENT_CATEGORY ] (state, category) {
    state[ CURRENT_CATEGORY ] = category;
  }
};
