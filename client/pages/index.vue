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
                <v-avatar :size="30">
                  <img src="" alt="">
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
                [ $style.active ]: currentCategory && currentCategory.id === category.id
              }"
              :to="`/article/list/${category.id}`">
              <v-list-tile ripple @click="" tag="section">
                <!-- icon -->
                <v-list-tile-action>
                  <v-avatar :size="30">
                    <img :src="category.icon" alt="">
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
          <v-list-tile ripple @click="showSearchFn" tag="section">
            <!-- icon -->
            <v-list-tile-action>
              <v-icon :size="30">fa fa-search</v-icon>
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
          <v-list-tile ripple @click="showAlbumFn" tag="section">
            <!-- icon -->
            <v-list-tile-action>
              <v-icon :size="30">fa fa-image</v-icon>
            </v-list-tile-action>
            <!-- text -->
            <v-list-tile-content>
              <v-list-tile-title>
                相册
              </v-list-tile-title>
              <v-list-tile-sub-title>
                ctrl + q
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <!-- hr -->
          <v-divider/>
        </v-list>
        <!-- space -->
        <v-spacer/>
        <!-- up -->
        <img :class="$style.up" src="../assets/images/index-up.gif" alt="">
        <!-- 格言 -->
        <div :class="$style.motto" v-if="mottoArr && mottoArr.length">
          <span v-for="motto in mottoArr">
            {{ motto.text }}
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
        <nuxt-child :key="$route.fullPath"/>
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
    <!-- 搜索模态框 -->
    <my-search v-model="showSearch"/>
    <!-- 登陆模态框 -->
    <my-login v-model="showLogin"/>
    <!-- 相册模态框 -->
    <my-album v-model="showAlbum"/>
  </v-app>
</template>

<script>
  import { mapState } from 'vuex';
  import { CURRENT_CATEGORY } from '../store/article';
  import { JWT, USER } from '../store/user';
  import _ from 'lodash';

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
        // 搜索模态框的显示和隐藏
        showSearch: false,
        // 相册显示和隐藏
        showAlbum: false,
        // 登陆的显示和隐藏
        showLogin: false,
        // 个人简历的显示和隐藏
        showJason: false,

        // 文章分类
        categoryArr: [],
        // 格言
        mottoArr: []
      };
    },
    computed: {
      ...mapState('article', {
        currentCategory: state => state[ CURRENT_CATEGORY ]
      }),
      ...mapState('user', {
        jwt: state => state[ JWT ],
        user: state => state[ USER ]
      }),
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
    },
    methods: {
      showSearchFn () {
        this.showSearch = true;
      },
      hideSearchFn () {
        this.showSearch = false;
      },
      showAlbumFn () {
        if (this.jwt) {
          this.showAlbum = true;
        }
        else {
          this.showLogin = true;
        }
      },
      hideAlbumFn () {
        this.showAlbum = false;
      },
      showLoginFn () {
        this.showLogin = !this.jwt;
      },
      hideLoginFn () {
        this.showLogin = false;
      }
    },
    async created () {
      if (process.client) {
        let jwt = localStorage[ JWT ];
        console.info(`检测 localStorage 中是否含有 jwt：${ Boolean(jwt) }`);

        // required jwt
        if (!jwt) return false;

        // 存入 store
        this.$store.commit(`user/${ JWT }`, jwt);
        // 检查 jwt 是否有效
        await this.$api.refreshMe()
        // 认证成功，设置 user
          .then(({ data: user }) => {
            console.info('jwt 认证成功');
            this.$store.commit(`user/${ USER }`, user);
          })
          // 认证失败，删除 jwt
          .catch(err => {
            console.error('jwt 认证失败');
            this.$store.commit(`user/${ JWT }`, null);
          });
      }
    },
    mounted () {
      // 搜索快捷键
      this.$key('ctrl+z', () => {
        console.info('触发了 ctrl + z');
        this.showSearchFn();
      });
      // 相册快捷键（登陆快捷键）
      this.$key('ctrl+q', () => {
        console.info('触发了 ctrl + q');
        this.showAlbumFn();
      });
    },
    watch: {
      jwt (newVal, oldVal) {
        if (newVal) {
          this.hideLoginFn();
          console.info('登陆成功，关闭登陆模态框');
        }
        if (oldVal && !newVal) {
          this.showLoginFn();
          console.error('访问令牌到期，弹出登陆模态框');
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
