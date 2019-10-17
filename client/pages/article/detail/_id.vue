<template>
  <section v-if="article">
    <div class="header">
      <h3 class="title">
        {{ article.title }}
      </h3>
      <time class="time">
        {{ article.updatedAt | moment('YYYY-MM-DD HH:mm:ss') }}
      </time>
      <p class="description" v-if="article.description">
        介绍：{{ article.description }}
      </p>
    </div>
    <div
      class="body markdown-body"
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

<style lang="scss" scoped>
  .header {
    margin-bottom: 30px;
  }
  .title {
    font-size: 24px !important;
  }
  .time, .description {
    color: #8d8d8d;
  }
  .time {
    display: block;
    margin-top: 15px;
    font-size: 14px;
  }
  .description {
    margin-top: 20px;
    font-size: 14px;
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
