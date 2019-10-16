<template>
  <section :class="$style.root">
    <v-timeline
      v-if="data && data.length"
      :dense="$vuetify.breakpoint.name === 'xs'">
      <v-timeline-item
        v-for="article in data"
        :key="article.id"
        fill-dot
        small>
        <!-- card -->
        <nuxt-link
          :class="$style.item"
          :to="`/article/detail/${article.id}`">
          <v-card>
            <v-card-title class="headline">
              {{ article.title }}
            </v-card-title>
            <v-card-text>
              <p :class="$style.desc">
                {{ article.description }}
              </p>
            </v-card-text>
          </v-card>
        </nuxt-link>
        <!-- 圆圈 + 时间 -->
        <span slot="opposite">
          {{ article.updatedAt | moment('YYYY-MM-DD HH:mm:ss') }}
        </span>
      </v-timeline-item>
    </v-timeline>
    <!-- 空 -->
    <my-empty v-else :class="$style.empty"/>
  </section>
</template>

<script>
  export default {
    name: 'my-article-list',
    props: {
      data: {
        type: Array,
        required: true
      }
    },
    // 解决 时间线组件 屏幕断点值初始错误
    mounted () {
      this.$forceUpdate()
    }
  }
</script>

<style lang="scss" module>
  .root {

  }
  .item {
    display: block;
    text-decoration: none;
    transition: all .3s;
    .desc {
      margin-bottom: 0;
      overflow: hidden;
    }
    // hover
    &:hover {
      transform: translate3d(0, -5px, 0);
      box-shadow: 0 2px 15px rgba(#000, .2);
    }
  }
  .empty {
    max-width: 90%;
  }
</style>
