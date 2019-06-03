<template>
  <section/>
</template>

<script>
  export default {
    // 重定向回分类首页
    asyncData ({ redirect }) {
      redirect('/article/list');
    }
  };
</script>

<style lang="scss" module>

</style>
