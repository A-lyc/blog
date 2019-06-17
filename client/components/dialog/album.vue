<template>
  <div>
    <!-- 相册分类 -->
    <v-dialog
      v-model="innerIsShow"
      :persistent="true"
      max-width="600">
      <v-container :class="$style.container" fluid grid-list-lg>
        <!-- list -->
        <template v-if="albumCategoryAll && albumCategoryAll.length">
          <v-layout wrap>
            <v-flex
              v-for="albumCategory in albumCategoryAll"
              :key="albumCategory.id"
              xs6>
              <v-card
                href="javascript:"
                @click="openAlbum(albumCategory)">
                <!-- cover -->
                <v-img
                  :src="albumCategory.cover.url"
                  :aspect-ratio="1"/>
                <!-- name -->
                <v-card-title primary-title>
                  {{ albumCategory.name }}
                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </template>
        <!-- loading -->
        <v-progress-circular
          class="mb-3"
          :class="$style.loading"
          v-else
          indeterminate
          color="primary"/>
        <!-- close btn -->
        <v-btn
          color="primary"
          block
          @click="hideAlbum">
          关闭
        </v-btn>
      </v-container>
    </v-dialog>
    <!-- photoswipe 相册 -->
    <div ref="album" class="pswp" tabindex="-1" role="dialog" aria-hidden="true">

      <!-- Background of PhotoSwipe.
           It's a separate element as animating opacity is faster than rgba(). -->
      <div class="pswp__bg"></div>

      <!-- Slides wrapper with overflow:hidden. -->
      <div class="pswp__scroll-wrap">

        <!-- Container that holds slides.
            PhotoSwipe keeps only 3 of them in the DOM to save memory.
            Don't modify these 3 pswp__item elements, data is added later on. -->
        <div class="pswp__container">
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
        </div>

        <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
        <div class="pswp__ui pswp__ui--hidden">

          <div class="pswp__top-bar">

            <!--  Controls are self-explanatory. Order can be changed. -->

            <div class="pswp__counter"></div>

            <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

            <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

            <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

            <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR -->
            <!-- element will get class pswp__preloader--active when preloader is running -->
            <div class="pswp__preloader">
              <div class="pswp__preloader__icn">
                <div class="pswp__preloader__cut">
                  <div class="pswp__preloader__donut"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
            <div class="pswp__share-tooltip"></div>
          </div>

          <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
          </button>

          <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
          </button>

          <div class="pswp__caption">
            <div class="pswp__caption__center"></div>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { JWT } from '../../store/user';
  import { SHOW_ALBUM } from '../../store/show';
  import _ from 'lodash';
  import mixinInnerIsShow from '../../assets/script/mixin-inner-is-show';

  export default {
    name: 'my-album',
    mixins: [ mixinInnerIsShow(SHOW_ALBUM) ],
    data () {
      return {
        albumCategoryAll: [],
        albumCategoryLoading: false
      };
    },
    computed: {
      ...mapState('user', {
        jwt: state => state[ JWT ]
      })
    },
    methods: {
      // 更新相册分类
      async updateCategory () {
        this.albumCategoryAll = [];
        this.albumCategoryLoading = true;
        try {
          let { data } = await this.$api.getAllAlbumCategory();
          this.albumCategoryAll = data;
          console.info(`相册分类更新成功：${ data.length }`);
        }
        catch (err) {
          this.innerValue = false;
          console.error('相册分类更新失败');
        }
        this.albumCategoryLoading = false;
      },
      async openAlbum (albumCategory) {
        // 若相册中没有照片则不显示
        if (albumCategory.albums && albumCategory.albums.length) {
          new this.$PhotoSwipe(
            this.$refs.album,
            this.$PhotoSwipeUI_Default,
            _.map(albumCategory.albums, pic => {
              return {
                title: pic.title,
                src: pic.pic.url,
                w: pic.pic.width,
                h: pic.pic.height
              };
            }),
            {
              bgOpacity: 0.75,
              history: false
            }
          ).init();
        }
      }
    },
    watch: {
      innerIsShow (isShow) {
        // 隐藏不执行任何操作
        if (!isShow) return false;
        // 若未登录，则弹出登录框
        else if (!this.jwt) {
          this.hideAlbum();
          this.showLogin();
          console.info('相册框弹出失败：未登录，已弹出登录框');
        }
        // 若已登录，则刷新数据
        else {
          isShow && this.updateCategory();
          console.info('my-album watcher: 更新了相册分类');
        }
      }
    }
  };
</script>

<style lang="scss" module>
  .container {
    background-color: #fff;
  }
  .loading {
    display: block;
    margin: 0 auto;
  }
</style>
