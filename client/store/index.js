import { CATEGORY_ARR } from '../store/category'

export const actions = {
  async nuxtServerInit ({ commit, dispatch }, { app, req, error }) {
    let { $api } = app
    try {
      let { data: categoryData } = await $api.getAllCategory()
      commit(`category/${ CATEGORY_ARR }`, categoryData)
    }
    catch (err) {
      error(`获取文章分类信息时发生错误`)
      console.error(err)
      return err
    }
  }
}
