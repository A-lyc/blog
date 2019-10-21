<template>
  <v-navigation-drawer v-model="isShow" app>
    <v-layout fill-height column>
      <!-- 分类 -->
      <v-list two-line>
        <!-- title -->
        <v-subheader>文章分类</v-subheader>
        <!-- 全部 -->
        <nuxt-link
          class="nav-link"
          :class="{ active: categoryCurrent && categoryCurrent.id === '*' }"
          to="/article/list"
        >
          <v-list-tile ripple @click tag="section">
            <!-- icon -->
            <v-list-tile-action>
              <v-avatar :size="38" :tile="true">
                <img src="./images/all.png" alt/>
              </v-avatar>
            </v-list-tile-action>
            <!-- text -->
            <v-list-tile-content>
              <!-- 分类名称 -->
              <v-list-tile-title>全部</v-list-tile-title>
              <!-- 文章总计 -->
              <v-list-tile-sub-title>文章数：{{ total }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </nuxt-link>
        <!-- hr -->
        <v-divider/>
        <!-- 分类列表 -->
        <template v-if="categoryArr" v-for="category in categoryArr">
          <nuxt-link
            class="nav-link"
            :class="{ active: categoryCurrent && categoryCurrent.id === category.id }"
            :to="`/article/list/${category.id}`"
          >
            <v-list-tile ripple @click tag="section">
              <!-- icon -->
              <v-list-tile-action>
                <v-avatar :size="38" :tile="true">
                  <img :src="category.icon ? category.icon.url : ''" alt/>
                </v-avatar>
              </v-list-tile-action>
              <!-- text -->
              <v-list-tile-content>
                <!-- 分类名称 -->
                <v-list-tile-title>{{ category.name }}</v-list-tile-title>
                <!-- 文章总计 -->
                <v-list-tile-sub-title>文章数：{{ category.articles.length }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <!-- hr -->
            <v-divider/>
          </nuxt-link>
        </template>
      </v-list>
      <!-- 功能 -->
      <v-list two-line>
        <!-- title -->
        <v-subheader>网站功能</v-subheader>
        <!-- 查找文章 -->
        <v-list-tile ripple @click="showSearch" tag="section">
          <!-- icon -->
          <v-list-tile-action>
            <v-avatar :size="38" :tile="true">
              <img src="./images/search.png" alt/>
            </v-avatar>
          </v-list-tile-action>
          <!-- text -->
          <v-list-tile-content>
            <v-list-tile-title>查找</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- hr -->
        <v-divider/>
        <!-- 相册 -->
        <v-list-tile ripple @click="showAlbum" tag="section">
          <!-- icon -->
          <v-list-tile-action>
            <v-avatar :size="38" :tile="true">
              <img src="./images/album.png" alt/>
            </v-avatar>
          </v-list-tile-action>
          <!-- text -->
          <v-list-tile-content>
            <v-list-tile-title>相册</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- hr -->
        <v-divider/>
        <!-- jason -->
        <v-list-tile ripple @click="" tag="section">
          <!-- icon -->
          <v-list-tile-action>
            <v-avatar :size="38" :tile="true">
              <img src="./images/jason.png" alt/>
            </v-avatar>
          </v-list-tile-action>
          <!-- text -->
          <v-list-tile-content>
            <v-list-tile-title>jason</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- hr -->
        <v-divider/>
        <!-- 项目记录 -->
        <v-list-tile ripple @click="" tag="section">
          <!-- icon -->
          <v-list-tile-action>
            <v-avatar :size="38" :tile="true">
              <img src="./images/jason.png" alt/>
            </v-avatar>
          </v-list-tile-action>
          <!-- text -->
          <v-list-tile-content>
            <v-list-tile-title>项目记载</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- hr -->
        <v-divider/>
      </v-list>
      <!-- 退出登陆按钮 -->
      <v-btn
        v-if="jwt"
        color="primary"
        @click="logout">
        退出登录
      </v-btn>
      <!-- space -->
      <v-spacer/>
      <!-- up -->
      <img class="up" src="./images/up.gif" alt/>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
  import Vue from 'vue'
  import _ from 'lodash'
  import { mapState, mapActions } from 'vuex'
  import { JWT, CATEGORY_ARR, CATEGORY_CURRENT } from '../../store'

  export default {
    name: 'comp-aside',
    data () {
      return {
        isShow: true
      }
    },
    computed: {
      ...mapState({
        jwt: state => state[ JWT ],
        categoryArr: state => state[ CATEGORY_ARR ],
        categoryCurrent: state => state[ CATEGORY_CURRENT ]
      }),
      // 统计文章总数
      total () {
        let { categoryArr } = this
        if (categoryArr) {
          return _.reduce(categoryArr, (sum, category) => {
            return sum + category.articles.length
          }, 0)
        }
        else {
          return '加载中...'
        }
      }
    },
    methods: {
      ...mapActions([ 'logout' ]),
      show () {
        this.isShow = true
      },
      hide () {
        this.isShow = false
      }
    },
    mounted () {
      Vue.prototype.$showAside = () => {
        this.isShow = true
      }
      Vue.prototype.$hideAside = () => {
        this.isShow = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .nav-link {
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
