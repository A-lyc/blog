<template>
  <my-article-list :data="articleArr"/>
</template>

<script>
  import { CATEGORY_CURRENT } from '../../../store/data';

  export default {
    validate ({ params }) {
      return params.id;
    },
    async fetch ({ app, store, params, error }) {
      try {
        return store.commit(
          `data/${ CATEGORY_CURRENT }`,
          (await app.$api.getOneCategory(params.id)).data
        );
      }
      catch (err) {
        error({
          statusCode: 404,
          message: '所访问的分类不存在'
        });
      }
    },
    async asyncData ({ app, params, error }) {
      try {
        return {
          category: (await app.$api.getOneCategory(params.id)).data,
          articleArr: (await app.$api.getAllArticle({ category: params.id })).data
        };
      }
      catch (err) {
        error({
          statusCode: 404,
          message: '所访问的分类不存在'
        });
      }
    },
    data () {
      return {
        category: null,
        articleArr: []
      };
    },
    head () {
      return {
        title: this.category.name,
        meta: [
          { hid: 'keywords', name: 'keywords', content: this.category.keywords },
          { hid: 'description', name: 'description', content: this.category.description }
        ]
      };
    }
  };
</script>

<style lang="scss" module>

</style>
