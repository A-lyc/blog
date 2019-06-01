<template>
  <section class="list">
    <v-timeline
      v-if="data.length"
      :dense="$vuetify.breakpoint.name === 'xs'">
      <v-timeline-item v-for="article in data" :key="article.id" fill-dot small>
        <!-- card -->
        <nuxt-link class="list-link" :to="`/article/detail/${article.id}`">
          <v-card>
            <v-card-title class="headline">
              {{ article.title }}
            </v-card-title>
            <v-card-text>
              {{ article.description }}
            </v-card-text>
          </v-card>
        </nuxt-link>
        <!-- 圆圈 + 时间 -->
        <span slot="opposite">
          {{ article.createdAt | createdAt}}
        </span>
      </v-timeline-item>
    </v-timeline>
    <!-- 空 -->
    <div v-else>
      <my-empty class="list-empty"/>
    </div>
  </section>
</template>

<script>
  import MyEmpty from '../empty';
  import moment from 'moment';

  export default {
    props: {
      data: {
        type: Array,
        required: true
      }
    },
    // 解决 时间线组件 屏幕断点值初始错误
    mounted () {
      this.$forceUpdate();
    },
    filters: {
      createdAt (at) {
        return moment(new Date(at)).format('YYYY-MM-DD hh:mm:ss');
      }
    },
    components: {
      MyEmpty
    }
  };
</script>

<style lang="scss">
  .list {
    &-link {
      display: block;
      text-decoration: none;
      transition: all .3s;
      &:hover {
        transform: translate3d(0, -5px, 0);
        box-shadow: 0 2px 15px rgba(#000, .2);
      }
    }
    &-empty {
      max-width: 90%;
    }
  }
</style>
