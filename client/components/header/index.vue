<template>
  <v-toolbar app>
    <!-- logo -->
    <v-toolbar-title>Qteam</v-toolbar-title>
    <!-- space -->
    <v-spacer />
    <!-- 按钮组 -->
    <v-toolbar-items>
      <!-- github -->
      <v-btn icon href="https://github.com/q-jason" target="_blank">
        <v-icon :size="30">fa fa-github</v-icon>
      </v-btn>
      <!-- hamburger -->
      <v-btn class="hidden-lg-and-up" icon @click="showAside">
        <v-icon :size="30">fa fa-bars</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  import mixinShow from '../../assets/script/mixin-show';

  export default {
    name: 'comp-header',
    mixins: [ mixinShow ]
  };
</script>

<style lang="scss" scoped>

</style>
