<template>
  <!-- 模态框表单 -->
  <v-dialog
    v-model="innerIsShow"
    :persistent="true"
    max-width="500">
    <!-- 表单 -->
    <v-card class="pa-3">
      <v-card-title class="headline">
        登陆
      </v-card-title>
      <v-card-text class="body-2">
        闲杂人等退散
      </v-card-text>
      <v-card-text>
        <v-text-field
          v-model="username"
          label="用户名："
          @keyup.enter.native="submit"/>
        <v-text-field
          v-model="password"
          label="密码："
          type="password"
          @keyup.enter.native="submit"/>
        <v-btn
          color="primary"
          :loading="loading"
          @click="submit">
          登陆
        </v-btn>
        <v-btn
          color="primary"
          @click="hideLogin">
          退出
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import { JWT } from '../../store/user';
  import { SHOW_LOGIN } from '../../store/show';
  import mixinInnerIsShow from '../../assets/script/mixin-inner-is-show';

  export default {
    name: 'my-login',
    mixins: [ mixinInnerIsShow(SHOW_LOGIN) ],
    data () {
      return {
        username: '',
        password: '',
        loading: false
      };
    },
    computed: {
      ...mapState('user', {
        jwt: state => state[ JWT ]
      })
    },
    methods: {
      ...mapActions('user', [
        'login'
      ]),
      async submit () {
        this.loading = true;
        try {
          await this.login({
            identifier: this.username,
            password: this.password
          });
          this.$alert.show('success', '登录成功');
        }
        catch (err) {
          this.$alert.show('error', '用户名或密码错误');
          console.error('登陆失败，用户名或密码错误', err);
        }
        this.loading = false;
      }
    },
    watch: {
      // 若已登录则不会显示
      innerisShow (bl) {
        if (bl && this.jwt) {
          this.hideLogin();
        }
      },
      // jwt 赋值时，隐藏登录框
      jwt (jwt) {
        jwt && this.hideLogin();
      }
    }
  };
</script>

<style lang="scss" module>

</style>
