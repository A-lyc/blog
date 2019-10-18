<template>
  <div>
    <!-- 相册分类 -->
    <v-dialog
      v-model="isShow"
      :persistent="true"
      max-width="600">
      <v-container class="container" fluid grid-list-lg>
        <!-- list -->
        <template v-if="albumArr">
          <v-layout wrap>
            <v-flex
              v-for="album in albumArr"
              :key="album.id"
              xs6>
              <v-card
                href="javascript:"
                @click="openAlbum(album)">
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
          v-else
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
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { JWT } from '../../store'

  export default {
    name: 'comp-album',
    data () {
      return {
        isShow: false,
        albumArr: [],
        loading: false
      }
    },
    computed: {
      ...mapState({
        jwt: state => state[ JWT ]
      })
    },
    methods: {
      async update () {
        this.album = []
        this.loading = true
        try {
          this.albumArr = (await this.$api.getAllAlbum()).data
        }
        catch (err) {
          console.error(err)
          this.showAlert({
            $props: {
              icon: 'error',
              text: '更新相册信息时出错，请稍后尝试'
            }
          })
        }
        this.loading = false
      },
      async openAlbum (album) {
        this.showAlert({
          $props: {
            color: 'info',
            text: '未完成打开相册'
          }
        })
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
