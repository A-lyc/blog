<template>
  <v-dialog
    v-model="isShow"
    max-width="700">

  </v-dialog>
</template>

<script>
  export default {
    name: 'comp-jason',
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

<style scoped>

</style>
