<template>
  <v-app :class="$style.root">
    <!-- aside -->
    <my-aside/>
    <!-- header -->
    <my-header/>
    <!-- body -->
    <v-content>
      <v-container fluid>
        <nuxt/>
        <!-- 间距 -->
        <p class="mt-4"/>
      </v-container>
      <!-- footer -->
      <my-footer/>
    </v-content>
    <!-- 各种功能性对话框 -->
    <my-dialog/>
  </v-app>
</template>

<style lang="scss" module>
  .root {

  }
</style>
