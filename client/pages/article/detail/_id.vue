<template>
  <section v-if="article">
    <article
      class="markdown-body"
      :class="$style.view"
      v-html="html"/>
  </section>
</template>

<script>
  import { CATEGORY_CURRENT } from '../../../store/data';

  import moment from 'moment';
  import marked from 'marked';
  import highlight from 'highlight.js';
  import 'highlight.js/styles/github.css';
  import 'github-markdown-css/github-markdown.css';

  export default {
    validate ({ params }) {
      return params.id;
    },
    async asyncData ({ app, params, error, store }) {
      try {
        let article = (await app.$api.getOneArticle(params.id)).data;
        store.commit(`data/${ CATEGORY_CURRENT }`, article.category);
        return { article };
      }
      catch (err) {
        return error({
          statusCode: 404,
          message: '所访问的文章不存在'
        });
      }
    },
    data () {
      return {
        article: null
      };
    },
    computed: {
      html () {
        let baseMarkdown = `# ${ this.article.title } \n > ${ moment(this.article.updatedAt).format('YYYY-MM-DD HH:mm:ss') } \n\n`;
        return marked(baseMarkdown + this.article.content, {
          highlight (code) {
            return highlight.highlightAuto(code).value;
          }
        });
      }
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

<style lang="scss" module>
  .view {
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
