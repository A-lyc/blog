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
    name: 'my-alert',
    data () {
      return {
        isShow: false,
        color: '',
        text: '',
        timeout: 4000
      };
    }
  };
</script>

<style lang="scss" module>

</style>
