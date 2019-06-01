<template>
  <v-app class="index">
    <!-- aside -->
    <v-navigation-drawer v-model="showAside" app>
      <v-layout fill-height column>
        <!-- 搜索框 -->
        <v-list two-line>
          <!-- title -->
          <v-subheader>
            搜索文章
          </v-subheader>
          <!-- input -->
          <v-list-tile>
            <v-autocomplete
              v-model="selectedArticleId"
              label="请输入文章关键词"
              :items="searchResults"
              item-text="title"
              item-value="id"
              :search-input.sync="searchKeyword"/>
          </v-list-tile>
        </v-list>
        <!-- hr -->
        <v-divider/>
        <!-- 分类 -->
        <v-list two-line>
          <!-- title -->
          <v-subheader>
            文章分类
          </v-subheader>
          <!-- item -->
          <div class="index-link">
            <!-- 全部 -->
            <nuxt-link class="index-link-item" to="/article/list">
              <v-list-tile ripple @click="" tag="section">
                <!-- icon -->
                <v-list-tile-action>
                  <v-icon :size="30">fa fa-book</v-icon>
                </v-list-tile-action>
                <!-- text -->
                <v-list-tile-content>
                  <!-- 分类名称 -->
                  <v-list-tile-title>
                    全部
                  </v-list-tile-title>
                  <!-- 文章总计 -->
                  <v-list-tile-sub-title>
                    文章数：{{ total }}
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </nuxt-link>
            <!-- hr -->
            <v-divider/>
            <!-- 某一分类 -->
            <template v-if="articleCategory" v-for="category in articleCategory">
              <nuxt-link class="index-link-item" :to="`/article/list/${category.id}`">
                <v-list-tile ripple @click="" tag="section">
                  <!-- icon -->
                  <v-list-tile-action>
                    <v-icon :size="30">fa fa-book</v-icon>
                  </v-list-tile-action>
                  <!-- text -->
                  <v-list-tile-content>
                    <!-- 分类名称 -->
                    <v-list-tile-title>
                      {{ category.name }}
                    </v-list-tile-title>
                    <!-- 文章总计 -->
                    <v-list-tile-sub-title>
                      文章数：{{ category.articles.length }}
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <!-- hr -->
                <v-divider/>
              </nuxt-link>
            </template>
          </div>
        </v-list>
        <!-- space -->
        <v-spacer/>
        <!-- footer -->
        <img class="index-up" src="../assets/images/index-up.gif">
        <!-- 哲学语句 -->
        <div class="index-philosophy">
          <span>做任何事前过脑子</span>
          <span>不要钻牛角尖</span>
          <span>不要沉迷于任何一样东西</span>
          <span>做一个拥有良好心态的男神</span>
        </div>
      </v-layout>
    </v-navigation-drawer>
    <!-- header -->
    <v-toolbar app>
      <!-- logo -->
      <v-toolbar-title>
        Qteam
      </v-toolbar-title>
      <!-- space -->
      <v-spacer/>
      <!-- 按钮组 -->
      <v-toolbar-items>
        <!-- github -->
        <v-btn icon href="https://github.com/q-jason" target="_blank">
          <v-icon :size="30">
            fa fa-github
          </v-icon>
        </v-btn>
        <!-- hamburger -->
        <v-btn
          class="hidden-lg-and-up"
          icon
          @click="showAside = true">
          <v-icon :size="30">
            fa fa-bars
          </v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <!-- body -->
    <v-content>
      <v-container fluid>
        <nuxt-child/>
        <!-- 间距 -->
        <p class="mt-4"/>
      </v-container>
      <!-- footer -->
      <v-footer class="index-footer" absolute>
        <v-flex class="text-xs-center">
          网站用于个人学习，无任何商业用途，素材来自网络搜集，侵删致歉。
        </v-flex>
      </v-footer>
    </v-content>
  </v-app>
</template>

<script>
  import _ from 'lodash';

  export default {
    async asyncData ({ app, req }) {
      return {
        articleCategory: (await app.$api.getArticleCategoryList()).data
      };
    },
    data () {
      return {
        // 侧边栏显示和隐藏
        showAside: true,
        // 文章分类
        articleCategory: null,
        // 搜索关键词
        searchKeyword: '',
        // 搜索结果
        searchResults: [],
        // 选中的文章 id
        selectedArticleId: ''
      };
    },
    computed: {
      // 所有文章总数
      total () {
        let { articleCategory } = this;
        if (articleCategory) {
          return _.reduce(articleCategory, function (sum, category) {
            return sum + category.articles.length;
          }, 0);
        }
        else {
          return '加载中...';
        }
      }
    },
    methods: {
      async goSearch () {
        this.searching = true;
        this.searchResults = (await this.$api.getArticleList({
          title_containss: _.trim(this.searchKeyword)
        })).data;
        this.searching = false;
      }
    },
    watch: {
      // 监听关键词的变化，搜索匹配内容
      searchKeyword: _.debounce(function (newVal, oldVal) {
        if (_.trim(newVal)) {
          this.goSearch();
        }
      }, 500),
      // 监听选中id的变化，执行跳转
      selectedArticleId (newVal) {
        if (newVal) {
          this.$router.push(`/article/detail/${ newVal }`);
          // 等 autocomplete 组件赋值一次 keyword
          setTimeout(() => {
            this.searchKeyword = '';
            this.selectedArticleId = null;
          }, 20);
        }
      }
    }
  };
</script>

<style lang="scss">
  .index {
    &-link {
      &-item {
        display: block;
        text-decoration: none;
        color: inherit;
        transition: all .3s;
        &.active {
          background-color: rgba(#000, .08);
        }
      }
    }
    &-up {
      display: block;
      margin: 0 auto;
      max-width: 85%;
    }
    &-philosophy {
      display: flex;
      flex-direction: column;
      text-align: center;
      line-height: 1.5;
      font-size: 12px;
      padding-bottom: 20px;
    }
    &-footer {
      height: auto !important;
      padding: 12px !important;
    }
  }
</style>
