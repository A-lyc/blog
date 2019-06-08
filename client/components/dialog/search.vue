<template>
  <v-dialog
    v-model="innerIsShow"
    :persistent="true"
    max-width="500">
    <v-card class="pa-3">
      <v-card-title class="headline">
        搜索
      </v-card-title>
      <v-card-text>
        <v-autocomplete
          ref="autocomplete"
          v-model="selectedId"
          :search-input.sync="keywords"
          :items="resultArr"
          :loading="searching"
          item-text="title"
          item-value="id"
          placeholder="请输入关键词："
          no-data-text="没有搜索到文章..."/>
        <v-btn
          color="primary"
          block
          @click="hideSearch">
          关闭
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import _ from 'lodash';
  import { SHOW_SEARCH } from '../../store/show';
  import mixinDialog from '../../assets/script/mixin-dialog';

  export default {
    name: 'my-search',
    mixins: [ mixinDialog(SHOW_SEARCH) ],
    data () {
      return {
        // 搜索关键词
        keywords: '',
        // 选中的文章 id
        selectedId: null,
        // 搜索结果
        resultArr: [],
        // 搜索中
        searching: false
      };
    },
    methods: {
      search: _.debounce(async function () {
        let { keywords } = this;
        this.searching = true;
        this.resultArr = (await this.$api.getAllArticle({
          title_containss: _.trim(this.keywords)
        })).data;
        this.searching = false;
      }, 500),
      jump () {
        let { selectedId: articleId } = this;
        this.$router.push({
          path: `/article/detail/${ articleId }`
        });
        // 清空状态
        this.hideSearch();
        this.keywords = '';
        this.resultArr = [];
        this.selectedId = null;
      }
    },
    watch: {
      keywords (str) {
        _.trim(str) && this.search();
      },
      selectedId (id) {
        id && this.jump();
      }
    }
  };
</script>

<style lang="scss" module>

</style>
