<template>
  <v-navigation-drawer v-model="innerIsShow" app>
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
              [ $style.active ]: categoryCurrent && categoryCurrent.id === '*'
            }"
          to="/article/list">
          <v-list-tile ripple @click="" tag="section">
            <!-- icon -->
            <v-list-tile-action>
              <v-avatar :size="38" :tile="true">
                <img src="./images/all.png" alt="">
              </v-avatar>
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
                [ $style.active ]: categoryCurrent && categoryCurrent.id === category.id
              }"
            :to="`/article/list/${category.id}`">
            <v-list-tile ripple @click="" tag="section">
              <!-- icon -->
              <v-list-tile-action>
                <v-avatar :size="38" :tile="true">
                  <img :src="category.icon.url" alt="">
                </v-avatar>
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
      <!-- 快捷键 -->
      <v-list two-line>
        <!-- title -->
        <v-subheader>
          快捷键
        </v-subheader>
        <!-- 查找文章 -->
        <v-list-tile ripple @click="showSearch" tag="section">
          <!-- icon -->
          <v-list-tile-action>
            <v-avatar :size="38" :tile="true">
              <img src="./images/search.png" alt="">
            </v-avatar>
          </v-list-tile-action>
          <!-- text -->
          <v-list-tile-content>
            <v-list-tile-title>
              查找
            </v-list-tile-title>
            <v-list-tile-sub-title>
              ctrl + z
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- hr -->
        <v-divider/>
        <!-- 图集 -->
        <v-list-tile ripple @click="showAlbum" tag="section">
          <!-- icon -->
          <v-list-tile-action>
            <v-avatar :size="38" :tile="true">
              <img src="./images/album.png" alt="">
            </v-avatar>
          </v-list-tile-action>
          <!-- text -->
          <v-list-tile-content>
            <v-list-tile-title>
              相册
            </v-list-tile-title>
            <v-list-tile-sub-title>
              ctrl + x
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- hr -->
        <v-divider/>
        <!-- 简历 -->
        <v-list-tile ripple @click="showJason" tag="section">
          <!-- icon -->
          <v-list-tile-action>
            <v-avatar :size="38" :tile="true">
              <img src="./images/album.png" alt="">
            </v-avatar>
          </v-list-tile-action>
          <!-- text -->
          <v-list-tile-content>
            <v-list-tile-title>
              简历
            </v-list-tile-title>
            <v-list-tile-sub-title>
              ctrl + c
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- hr -->
        <v-divider/>
      </v-list>
      <!-- space -->
      <v-spacer/>
      <!-- up -->
      <img :class="$style.up" src="./images/up.gif" alt="">
      <!-- 格言 -->
      <div :class="$style.motto" v-if="mottoArr && mottoArr.length">
          <span v-for="motto in mottoArr">
            {{ motto.text }}
          </span>
      </div>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
  import _ from 'lodash';
  import { mapState } from 'vuex';
  import { CATEGORY_ARR, CATEGORY_CURRENT, MOTTO_ARR } from '../../store/data';
  import { SHOW_ASIDE } from '../../store/show';
  import mixinDialog from '../../assets/script/mixin-dialog';

  export default {
    name: 'my-aside',
    mixins: [ mixinDialog(SHOW_ASIDE) ],
    computed: {
      ...mapState('data', {
        categoryArr: state => state[ CATEGORY_ARR ],
        categoryCurrent: state => state[ CATEGORY_CURRENT ],
        mottoArr: state => state[ MOTTO_ARR ]
      }),
      // 统计文章总数
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
    },
    mounted () {
      // 搜索快捷键
      this.$key('ctrl+z', () => {
        console.info('触发了 ctrl + z');
        this.showSearch();
      });
      // 相册快捷键（登陆快捷键）
      this.$key('ctrl+x', () => {
        console.info('触发了 ctrl + x');
        this.showAlbum();
      });
      // 简历
      this.$key('ctrl+c', () => {
        console.info('触发了 ctrl + c');
        this.showJason();
      });
    }
  };
</script>

<style lang="scss" module>
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
</style>
