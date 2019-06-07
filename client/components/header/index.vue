<template>
  <v-toolbar app>
    <!-- logo -->
    <v-toolbar-title>
      Qteam
    </v-toolbar-title>
    <!-- space -->
    <v-spacer/>
    <!-- 按钮组 -->
    <v-toolbar-items>
      <!-- github -->
      <v-btn icon href="https://github.com/q-jason" target="_blank">
        <v-icon :size="30">
          fa fa-github
        </v-icon>
      </v-btn>
      <!-- hamburger -->
      <v-btn
        class="hidden-lg-and-up"
        icon
        @click="showAside = true">
        <v-icon :size="30">
          fa fa-bars
        </v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  export default {
    name: 'my-header'
  };
</script>

<style lang="scss" module>

</style>
