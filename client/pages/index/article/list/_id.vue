<template>
  <my-article-list
    v-if="articleArr && articleArr.length"
    :data="articleArr"/>
</template>

<script>
  import { CURRENT_CATEGORY } from '../../../../store/article';

  export default {
    validate ({ params }) {
      return params.id;
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
    created () {
      this.$store.commit(`article/${ CURRENT_CATEGORY }`, this.category);
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
