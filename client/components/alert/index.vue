<template>
  <v-snackbar
    v-model="isShow"
    absolute
    top
    :color="color"
    :timeout="timeout">
    {{ text }}
    <v-btn
      dark
      flat
      @click="isShow = false">
      关闭
    </v-btn>
  </v-snackbar>
</template>

<script>
  export default {
    name: 'comp-alert',
    props: {
      color: {
        type: String
      },
      text: {
        type: String
      },
      timeout: {
        type: Number,
        default: 4000
      }
    },
    data () {
      return {
        isShow: false
      }
    },
    methods: {
      show () {
        this.isShow = true
      },
      hide () {
        this.isShow = false
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
