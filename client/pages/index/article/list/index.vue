<template>
  <my-article-list :data="articleArr"/>
</template>

<script>
  import { CURRENT_CATEGORY } from '../../../../store/article';

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
      this.$store.commit(`article/${ CURRENT_CATEGORY }`, { id: '*' });
    }
  };
</script>

<style lang="scss" module>

</style>
