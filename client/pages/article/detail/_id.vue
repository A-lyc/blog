<template>
  <section>
    <h3 class="display-1">
      {{ article.title }}
    </h3>
    <time class="time">
      {{ article.updatedAt | moment('YYYY-MM-DD HH:mm:ss') }}
    </time>
    <p class="description">
      {{ article.description }}
    </p>
    <div
      class="markdown-body"
      :class="$style.body"
      v-html="html">
    </div>
  </section>
</template>

<script>
  import { CATEGORY_CURRENT } from '../../../store/category'

  import marked from 'marked'
  import highlight from 'highlight.js'
  import 'highlight.js/styles/github.css'
  import 'github-markdown-css/github-markdown.css'

  export default {
    validate ({ params }) {
      return params.id
    },
    async asyncData ({ app, params, error, store }) {
      try {
        let article = (await app.$api.getOneArticle(params.id)).data
        store.commit(`category/${ CATEGORY_CURRENT }`, article.category)
        return { article }
      }
      catch (err) {
        return error({
          statusCode: 404,
          message: '所访问的文章不存在'
        })
      }
    },
    data () {
      return {
        article: null
      }
    },
    computed: {
      html () {
        return marked(this.article.content, {
          highlight (code) {
            return highlight.highlightAuto(code).value
          }
        })
      }
    },
    head () {
      return {
        title: this.article.title,
        meta: [
          { hid: 'description', name: 'description', content: this.article.description }
        ]
      }
    }
  }
</script>

<style lang="scss" module>
  .title {
    font-size: 36px;
    margin-bottom: 15px;
  }
  .body {
    pre {
      background-color: #f1f1f1;
    }
    code {
      box-shadow: none;
      color: inherit;
      &:before, &:after {
        display: none;
      }
    }
    code,
    kbd {
      font-weight: normal;
    }
  }
</style>
