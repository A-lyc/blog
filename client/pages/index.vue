<template>
  <v-app :class="$style.root">
    <!-- aside -->
    <v-navigation-drawer v-model="showAside" app>
      <v-layout fill-height column>
        <!-- 分类 -->
        <v-list two-line>
          <!-- title -->
          <v-subheader>
            文章分类
          </v-subheader>
          <!-- 全部 -->
          <nuxt-link
            :class="{
              [ $style.navLink ]: true,
              [ $style.active ]: currentCategory && currentCategory.id === '*'
            }"
            to="/article/list">
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
          <!-- 分类列表 -->
          <template v-if="categoryArr" v-for="category in categoryArr">
            <nuxt-link
              :class="{
                [ $style.navLink ]: true,
                [ $style.active ]: currentCategory && currentCategory.id === category.id
              }"
              :to="`/article/list/${category.id}`">
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
        </v-list>
        <!-- space -->
        <v-spacer/>
        <!-- up -->
        <img :class="$style.up" src="../assets/images/index-up.gif" alt="">
        <!-- 格言 -->
        <div :class="$style.motto" v-if="mottoArr && mottoArr.length">
          <span v-for="motto in mottoArr">
            {{ motto }}
          </span>
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
      <v-footer :class="$style.footer" absolute>
        <v-flex class="text-xs-center">
          网站用于个人学习，无任何商业用途，素材来自网络搜集，侵删致歉。
        </v-flex>
      </v-footer>
    </v-content>
  </v-app>
</template>

<script>
  import _ from 'lodash';
  import { CURRENT_CATEGORY } from '../store/article';

  export default {
    async asyncData ({ app }) {
      return {
        categoryArr: (await app.$api.getAllCategory()).data,
        mottoArr: (await app.$api.getAllMotto()).data
      };
    },
    data () {
      return {
        // 侧边栏显示和隐藏
        showAside: true,
        // 文章分类
        categoryArr: [],
        // 格言
        mottoArr: []
      };
    },
    computed: {
      // 记载着页面的所属文章分类
      // 会改变导航激活状态
      currentCategory () {
        return this.$store.state.article[ CURRENT_CATEGORY ];
      },
      // 所有文章总数
      total () {
        let { categoryArr } = this;
        if (categoryArr) {
          return _.reduce(categoryArr, (sum, category) => {
            return sum + category.articles.length;
          }, 0);
        }
        else {
          return '加载中...';
        }
      }
    }
  };
</script>

<style lang="scss" module>
  .root {

  }
  .navLink {
    display: block;
    text-decoration: none;
    color: inherit;
    transition: all .3s;
    &.active {
      background-color: rgba(#000, .08);
    }
  }
  .up {
    display: block;
    margin: 0 auto;
    max-width: 85%;
  }
  .motto {
    display: flex;
    flex-direction: column;
    text-align: center;
    line-height: 1.5;
    font-size: 12px;
    padding-bottom: 20px;
  }
  .footer {
    height: auto !important;
    padding: 12px !important;
  }
</style>
