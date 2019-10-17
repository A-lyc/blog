<template>
  <v-app>
    <!-- aside -->
    <comp-aside/>
    <!-- header -->
    <comp-header/>
    <!-- body -->
    <v-content>
      <v-container fluid>
        <nuxt/>
      </v-container>
      <!-- footer -->
      <comp-footer/>
    </v-content>
  </v-app>
</template>

<script>
  export default {
  }
</script>

<style lang="scss" scoped>

</style>
