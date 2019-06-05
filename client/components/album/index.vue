<template>
  <v-dialog v-model="innerValue" max-width="1300">
    album
  </v-dialog>
</template>

<script>
  import mixinTwoVModel from '../../assets/script/two-v-model';

  export default {
    name: 'my-album',
    mixins: [ mixinTwoVModel ],
    data () {
      return {
        albumCategoryAll: [],
        albumCategoryLoading: false
      };
    },
    methods: {
      async updateCategory () {
        this.albumCategoryLoading = true;
        try {
          let { data } = await this.$api.getAllAlbumCategory();
          this.albumCategoryAll = data;
        }
        catch (err) {
          this.innerValue = false;
          console.error('相册分类更新失败');
        }
        this.albumCategoryLoading = false;
      },
      async openAlbum () {}
    },
    watch: {
      innerValue (isShow) {
        isShow && this.updateCategory();
        console.info('my-album: innerValue watcher：更新了相册分类');
      }
    }
  };
</script>

<style lang="scss" module>

</style>
