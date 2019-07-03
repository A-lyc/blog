<template>
  <my-article-list :data="articleArr"/>
</template>

<script>
  import { CATEGORY_CURRENT } from '../../../../store/data';

  export default {
    async fetch ({ app, store, error }) {
      return store.commit(
        `data/${ CATEGORY_CURRENT }`,
        { id: '*' }
      );
    },
    async asyncData ({ app, error }) {
      try {
        return {
          articleArr: (await app.$api.getAllArticle()).data
        };
      }
      catch (err) {
        error({
          statusCode: 500,
          message: '获取文章列表失败，服务器错误'
        });
      }
    },
    data () {
      return {
        articleArr: null
      };
    }
  };
</script>

<style lang="scss" module>

</style>
