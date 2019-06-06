<template>
  <v-dialog
    v-model="innerValue"
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
          @click="innerValue = false">
          关闭
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import _ from 'lodash';

  import mixinTwoVModel from '../../assets/script/two-v-model';

  export default {
    name: 'my-search',
    mixins: [ mixinTwoVModel ],
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
        this.innerValue = false;
      }
    },
    watch: {
      innerValue (bl) {
        // 显示时获取焦点
        if (bl) {
          setTimeout(() => {
            this.$refs.autocomplete.$el.querySelector('input').focus();
          }, 20);
        }
        // 关闭时清空状态
        else {
          this.selectedId = null;
          this.keywords = '';
          this.resultArr = [];
        }
      },
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
