<template>
  <div>
    <!-- 相册分类 -->
    <v-dialog
      v-model="isShow"
      :persistent="openLoading"
      max-width="600">
      <v-container class="container" fluid grid-list-lg>
        <!-- list -->
        <template v-if="albumArr">
          <v-layout wrap>
            <v-flex
              v-for="(album, i) in albumArr"
              :key="album.id"
              xs6>
              <v-card
                href="javascript:"
                @click="openPreview(album)">
                <!-- cover -->
                <v-img
                  :src="album.cover ? album.cover.url : ''"
                  :aspect-ratio="1"/>
                <!-- name -->
                <v-card-title primary-title>
                  {{ album.name }}
                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </template>
        <!-- loading -->
        <v-progress-circular
          class="loading"
          v-if="updateLoading"
          indeterminate
          color="primary"/>
        <!-- close btn -->
        <v-btn
          color="primary"
          block
          @click="isShow = false">
          关闭
        </v-btn>
      </v-container>
    </v-dialog>
    <!-- photoswipe -->
    <div ref="photoswipe" class="pswp" tabindex="-1" role="dialog" aria-hidden="true">

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

            <!--<button class="pswp__button pswp__button&#45;&#45;share" title="Share"></button>-->

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
  import _ from 'lodash'
  import { mapState } from 'vuex'
  import { JWT } from '../../store'

  import 'photoswipe/dist/photoswipe.css'

  export default {
    name: 'comp-album',
    data () {
      return {
        isShow: false,
        albumArr: [],
        updateLoading: false,
        openLoading: false
      }
    },
    computed: {
      ...mapState({
        jwt: state => state[ JWT ]
      })
    },
    methods: {
      async update () {
        this.albumArr = []
        this.updateLoading = true
        try {
          this.albumArr = (await this.$api.getAllAlbum()).data
        }
        catch (err) {
          this.showAlert({
            $props: {
              icon: 'error',
              text: '更新相册信息时出错，请稍后尝试'
            }
          })
        }
        this.updateLoading = false
      },
      async openPreview (album) {
        let PhotoSwipe = require('photoswipe/dist/photoswipe.min')
        let PhotoSwipeUI_Default = require('photoswipe/dist/photoswipe-ui-default.min')
        let el = this.$refs.photoswipe
        let { pics } = album
        let preview = new PhotoSwipe(el, PhotoSwipeUI_Default, _.map(pics, pic => ({
          src: pic.url,
          w: pic.width,
          h: pic.height,
          title: pic.caption
        })))

        preview.init()
      },
      show () {
        this.isShow = true
      },
      hide () {
        this.isShow = false
      }
    },
    watch: {
      isShow (isShow) {
        if (!isShow) {
          return false
        }
        else if (!this.jwt) {
          this.hide()
          this.showAlert({
            $props: {
              color: 'info',
              text: '请先登陆'
            }
          })
          this.showLogin({
            $events: {
              success: () => {
                this.show()
              }
            }
          })
        }
        else {
          this.update()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    background-color: #fff;
  }
  .loading {
    display: block;
    margin: 0 auto;
  }
</style>
