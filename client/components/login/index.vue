<template>
  <div>
    <!-- 模态框表单 -->
    <v-dialog v-model="innerValue" max-width="500">
      <!-- 表单 -->
      <v-card class="pa-3">
        <v-card-title class="headline">
          登陆
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="username"
            label="username"
            @keyup.enter.native="submit"/>
          <v-text-field
            v-model="password"
            label="password"
            type="password"
            @keyup.enter.native="submit"/>
          <v-btn
            color="primary"
            :loading="loading"
            @click="submit">
            GO
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- 错误提示 -->
    <v-snackbar
      v-model="showError"
      absolute
      color="error"
      :timeout="3000">
      用户名或密码错误
      <v-btn
        dark
        flat
        @click="showError = false">
        关闭
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import { USER, JWT } from '../../store/user';
  import mixinTwoVModel from '../../assets/script/two-v-model';

  export default {
    name: 'my-login',
    mixins: [ mixinTwoVModel ],
    data () {
      return {
        username: '',
        password: '',
        loading: false,
        showError: false
      };
    },
    methods: {
      async submit () {
        this.loading = true;
        try {
          let { user, jwt } = (await this.$api.login({
            identifier: this.username,
            password: this.password
          })).data;
          this.$store.commit(`user/${ USER }`, user);
          this.$store.commit(`user/${ JWT }`, jwt);
          console.info('登录成功，设置 jwt 和 user 到 store 中');
        }
        catch (err) {
          this.showError = true;
          console.error('登陆失败，用户名或密码错误');
        }
        this.loading = false;
      }
    }
  };
</script>

<style lang="scss" module>

</style>
