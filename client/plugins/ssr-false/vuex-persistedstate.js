import createPersistedState from 'vuex-persistedstate'
import { JWT } from '../../store'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'qteam-blog-client',
      paths: [ JWT ]
    })(store)
  })
}
