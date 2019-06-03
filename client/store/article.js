export const CURRENT_CATEGORY = 'currentCategory';

export const state = () => ({
  // 当前页面所属的文章分类
  // 给导航定位使用
  [ CURRENT_CATEGORY ]: {
    id: '*'
  }
});
export const mutations = {
  [ CURRENT_CATEGORY ] (state, category) {
    state[ CURRENT_CATEGORY ] = category;
  }
};
