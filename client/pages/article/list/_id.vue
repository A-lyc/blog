<template>
  <comp-article-list :data="articleArr"/>
</template>

<script>
  import { CATEGORY_CURRENT } from '../../../store'

  export default {
    validate ({ params }) {
      return params.id
    },
    async asyncData ({ app, store, params, error }) {
      try {
        let [ { data: category }, { data: articleArr } ] = await Promise.all([
          app.$api.getOneCategory(params.id),
          app.$api.getAllArticle({ category: params.id })
        ])
        // store currentCategory
        store.commit(CATEGORY_CURRENT, category)
        return {
          category,
          articleArr
        }
      }
      catch (err) {
        return error({
          statusCode: 404,
          message: '所访问的分类不存在'
        })
      }
    },
    data () {
      return {
        category: null,
        articleArr: []
      }
    },
    head () {
      return {
        title: this.category.name,
        meta: [
          { hid: 'keywords', name: 'keywords', content: this.category.keywords },
          { hid: 'description', name: 'description', content: this.category.description }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
