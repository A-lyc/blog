<template>
  <my-list
    v-if="articleArr"
    :data="articleArr"/>
</template>

<script>
  import MyList from '../../../../components/list';

  export default {
    async asyncData ({ app }) {
      return {
        articleArr: (await app.$api.getArticleList()).data
      };
    },
    data () {
      return {
        articleArr: null
      };
    },
    components: {
      MyList
    }
  };
</script>

<style lang="scss">

</style>
