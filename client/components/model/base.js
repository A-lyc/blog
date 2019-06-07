import { mapState } from 'vuex';
import mixinModel from '../../assets/script/mixin-model';

export default function (name) {
  return {
    mixins: [ mixinModel ],
    data () {
      return {
        innerIsShow: false
      };
    },
    computed: {
      ...mapState('model', {
        isShow: state => state[ name ]
      })
    },
    watch: {
      isShow (isShow) {
        // 防止触发两次
        if (isShow !== this.innerIsShow) {
          this.innerIsShow = isShow;
        }
      },
      innerIsShow (innerIsShow) {
        // 防止触发两次
        if (innerIsShow !== this.isShow) {
          this.$store.commit(`model/${ name }`, innerIsShow);
        }
      }
    }
  };
};
