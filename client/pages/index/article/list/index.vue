<template>
  <my-article-list :data="articleArr"/>
</template>

<script>
  import { CATEGORY_CURRENT } from '../../../../store/data';

  export default {
    async asyncData ({ app }) {
      return {
        articleArr: (await app.$api.getAllArticle()).data
      };
    },
    data () {
      return {
        articleArr: null
      };
    },
    created () {
      this.$store.commit(`data/${ CATEGORY_CURRENT }`, { id: '*' });
    }
  };
</script>

<style lang="scss" module>

</style>
