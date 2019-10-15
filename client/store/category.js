export const CATEGORY_ARR = 'categoryArr'
export const CATEGORY_CURRENT = 'categoryCurrent'

export const state = () => ({
  [ CATEGORY_ARR ]: [],
  [ CATEGORY_CURRENT ]: {
    id: '*'
  }
})
export const mutations = {
  [ CATEGORY_ARR ] (state, data) {
    state[ CATEGORY_ARR ] = data
  },
  [ CATEGORY_CURRENT ] (state, data) {
    state[ CATEGORY_CURRENT ] = data
  }
}
