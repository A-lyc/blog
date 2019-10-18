export const CATEGORY_ARR = 'categoryArr'
export const CATEGORY_CURRENT = 'categoryCurrent'
export const CATEGORY_ALL = {
  id: '*'
}

export const USER = 'user'
export const JWT = 'jwt'

export const state = function () {
  return {
    [ CATEGORY_ARR ]: [],
    [ CATEGORY_CURRENT ]: CATEGORY_ALL,
    
    [ USER ]: null,
    [ JWT ]: null
  }
}

export const actions = {
  async nuxtServerInit ({ commit, dispatch }, { app, req, error }) {
    let { $api } = app
    try {
      let { data: categoryArr } = await $api.getAllCategory()
      commit(CATEGORY_ARR, categoryArr)
    }
    catch (err) {
      error(`获取文章分类信息时发生错误`)
      console.error(err)
      return err
    }
  },
  // 登陆
  async login ({ commit }, payload) {
    let { user, jwt } = (await this.$api.login(payload)).data
    commit(USER, user)
    commit(JWT, jwt)
  },
  // 登出
  logout ({ commit }) {
    commit(JWT, null)
    commit(USER, null)
  },
  // 更新自己的数据
  async refresh ({ state, commit }, jwt) {
    jwt = jwt || state[ JWT ]
    if (jwt) {
      try {
        let { user } = (await this.$api.refreshMe(jwt)).data
        commit(USER, user)
        commit(JWT, jwt)
      }
      catch (err) {
        return err
      }
    }
    else {
      console.error('无法更新用户信息，jwt 不存在')
    }
  }
}

export const mutations = {
  [ CATEGORY_ARR ] (state, data) {
    state[ CATEGORY_ARR ] = data
  },
  [ CATEGORY_CURRENT ] (state, data) {
    state[ CATEGORY_CURRENT ] = data
  },
  
  [ USER ] (state, user) {
    state[ USER ] = user
  },
  [ JWT ] (state, jwt) {
    state[ JWT ] = jwt
  }
}
