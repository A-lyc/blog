<template>
  <v-dialog
    v-model="isShow"
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
          @click="hide">
          退出
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'comp-login',
    data () {
      return {
        isShow: false,
        loading: false,
        username: '',
        password: ''
      }
    },
    methods: {
      ...mapActions([ 'login' ]),
      show () {
        this.isShow = true
      },
      hide () {
        this.isShow = false
      },
      async submit () {
        this.loading = true
        try {
          // 尝试登陆
          await this.login({
            identifier: this.username,
            password: this.password
          })
          // 登陆成功提示
          this.showAlert({
            $props: {
              color: 'success',
              text: '登陆成功'
            }
          })
          // 隐藏登陆框
          this.hide()
          // 触发事件
          this.$emit('success')
        }
        catch (err) {
          this.showAlert({
            $props: {
              color: 'error',
              text: '用户名或密码错误，请重新输入'
            }
          })
          this.$emit('fail')
          console.error(err)
        }
        this.loading = false
      }
    }
  }
</script>
