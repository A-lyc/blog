<template>
  <section v-if="article">
    <section
      class="markdown-body"
      v-html="html"/>
  </section>
</template>

<script>
  import marked from 'marked';
  import 'github-markdown-css/github-markdown.css';

  export default {
    validate ({ params }) {
      return params.id;
    },
    async asyncData ({ app, params, error }) {
      try {
        let article = (await app.$api.getArticleDetail(params.id)).data;
        // 将 markdown 转为 html 代码片段
        let html = marked(article.content);

        return {
          article,
          html
        };
      }
      catch (err) {
        console.error(err);
        error({
          statusCode: 404,
          message: '所访问的文章不存在'
        });
      }
    },
    data () {
      return {
        // 文章对象
        article: null,
        // 转好好的 html 代码片段
        html: ''
      };
    },
    head () {
      return {
        title: this.article.title,
        meta: [
          { hid: 'keywords', name: 'keywords', content: this.article.keywords },
          { hid: 'description', name: 'description', content: this.article.description }
        ]
      };
    }
  };
</script>

<style lang="scss">
  .markdown-body {
    // light
    /deep/ pre {
      background-color: #f1f1f1;
    }
    /deep/ code {
      box-shadow: none;
      color: inherit;
      &:before, &:after {
        display: none;
      }
    }
    /deep/ code,
    /deep/ kbd {
      font-weight: normal;
    }
    .theme--dark & {
      color: rgba(#fff, .8);
      /deep/ blockquote {
        color: rgba(#fff, .5);
        border-left-color: rgba(#fff, .5);
      }
      /deep/ pre {
        background-color: #494949;
      }
      /deep/ tr {
        background-color: transparent;
      }
    }
  }
</style>
