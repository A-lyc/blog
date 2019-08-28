import { mapState } from 'vuex'
import mixinShow from '../../assets/script/mixin-show'

export default function (name) {
  return {
    mixins: [ mixinShow ],
    data () {
      return {
        innerIsShow: false
      }
    },
    computed: {
      ...mapState('show', {
        isShow: state => state[ name ]
      })
    },
    watch: {
      isShow: {
        immediate: true,
        handler (isShow) {
          // 防止触发两次
          if (isShow !== this.innerIsShow) {
            this.innerIsShow = isShow
          }
        }
      },
      innerIsShow (innerIsShow) {
        // 防止触发两次
        if (innerIsShow !== this.isShow) {
          this.$store.commit(`show/${ name }`, innerIsShow)
        }
      }
    }
  }
};
