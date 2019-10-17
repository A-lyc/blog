<template>
  <v-dialog
    v-model="isShow"
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
          @click="hide">
          退出
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import Alert from '../alert'
  import { mapActions } from 'vuex'

  export default {
    name: 'comp-login',
    props: {
      cb: Function
    },
    data () {
      return {
        isShow: false,
        loading: false,
        username: '',
        password: ''
      }
    },
    computed: {
      ...mapActions('user', [
        'login'
      ])
    },
    methods: {
      show () {
        this.isShow = true
      },
      hide () {
        this.isShow = false
      },
      async submit () {
        this.loading = true
        try {
          await this.login({
            identifier: this.username,
            password: this.password
          })
          Alert.$create({
            $props: {
              color: 'success',
              text: '登陆成功'
            }
          }).show()
          this.hide()
          this.$emit('success')
        }
        catch (err) {
          Alert.$create({
            $props: {
              color: 'error',
              text: '用户名或密码错误，请重新输入'
            }
          }).show()
          this.$emit('error')
        }
        this.loading = false
      }
    }
  }
</script>
