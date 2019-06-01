<template>
  <my-list
    v-if="articleArr"
    :data="articleArr"/>
</template>

<script>
  import MyList from '../../../../components/list';

  export default {
    validate ({ params }) {
      return params.id;
    },
    async asyncData ({ app, params, error }) {
      try {
        return {
          category: (await app.$api.getArticleCategoryDetail(params.id)).data,
          articleArr: (await app.$api.getArticleList({ category: params.id })).data
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
        // 分类信息
        category: null,
        // 分类下的文章
        articleArr: null
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
    },
    components: {
      MyList
    }
  };
</script>

<style lang="scss">
  .alist {
    &-link {
      display: block;
      text-decoration: none;
      transition: all .3s;
      &:hover {
        transform: translate3d(0, -5px, 0);
        box-shadow: 0 2px 15px rgba(#000, .2);
      }
    }
    &-empty {
      max-width: 90%;
    }
  }
</style>
