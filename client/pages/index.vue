<template>
  <v-app :class="$style.root">
    <!-- aside -->
    <my-aside/>
    <!-- header -->
    <my-header/>
    <!-- body -->
    <v-content>
      <v-container fluid>
        <nuxt-child :key="$route.fullPath"/>
        <!-- 间距 -->
        <p class="mt-4"/>
      </v-container>
      <!-- footer -->
      <v-footer :class="$style.footer" absolute>
        <v-flex class="text-xs-center">
          网站用于个人学习，无任何商业用途，素材来自网络搜集，侵删致歉。
        </v-flex>
      </v-footer>
    </v-content>
    <!-- 各种模态框 -->
    <my-model/>
  </v-app>
</template>

<script>
  import { mapState } from 'vuex';
  import { CATEGORY_ARR, MOTTO_ARR } from '../store/data';
  import { JWT, USER } from '../store/user';

  export default {
    /**
     *  获取数据（存入 store）
     *  1. 文章分类
     *  2. 格言
     **/
    async fetch ({ app, store }) {
      store.commit(`data/${ CATEGORY_ARR }`, (await app.$api.getAllCategory()).data);
      store.commit(`data/${ MOTTO_ARR }`, (await app.$api.getAllMotto()).data);
    },
    computed: {
      ...mapState('user', {
        jwt: state => state[ JWT ],
        user: state => state[ USER ]
      })
    },
    async created () {
      if (process.client) {
        let jwt = localStorage[ JWT ];
        console.info(`检测 localStorage 中是否含有 jwt：${ Boolean(jwt) }`);

        // required jwt
        if (!jwt) return false;

        // 存入 store
        this.$store.commit(`user/${ JWT }`, jwt);
        // 检查 jwt 是否有效
        await this.$api.refreshMe()
        // 认证成功，设置 user
          .then(({ data: user }) => {
            console.info('jwt 认证成功');
            this.$store.commit(`user/${ USER }`, user);
          })
          // 认证失败，删除 jwt
          .catch(err => {
            console.error('jwt 认证失败');
            this.$store.commit(`user/${ JWT }`, null);
          });
      }
    },
    watch: {
      jwt (newVal, oldVal) {
        if (newVal) {
          console.info('登陆成功，关闭登陆模态框');
        }
        if (oldVal && !newVal) {
          // this.showLoginFn();
          console.error('访问令牌到期，弹出登陆模态框');
        }
      }
    }
  };
</script>

<style lang="scss" module>
  .root {

  }
  .footer {
    height: auto !important;
    padding: 12px !important;
  }
</style>
