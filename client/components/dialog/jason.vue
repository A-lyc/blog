<template>
  <v-dialog
    v-model="innerIsShow"
    :content-class="$style.root"
    :persistent="true"
    max-width="1500">
    <!-- content -->
    <v-container fluid :grid-list-xl="anime || result">
      <v-layout :class="$style.row" wrap>
        <!-- 提示板 -->
        <v-flex :class="$style.col" sm4 xs12>
          <div :class="$style.chunk">
            <div :class="$style.notice">
              <!-- anime -->
              <vue-typed-js
                :class="$style.typed"
                v-if="anime"
                ref="noticeTyped"
                :strings="[ notice ]">
                <span class="typing"/>
              </vue-typed-js>
              <!-- result -->
              <span v-else-if="result" v-html="notice"/>
            </div>
          </div>
        </v-flex>
        <!-- 简历 -->
        <v-flex :class="$style.col" sm4 xs12>
          <div :class="$style.chunk">
            <div :class="$style.jianli">
              <div :class="$style.group">
                <label :class="$style.key">
                  姓名：
                </label>
                <p :class="$style.value">
                  秦佳
                </p>
              </div>
              <div :class="$style.group">
                <label :class="$style.key">
                  性别：
                </label>
                <p :class="$style.value">
                  男
                </p>
              </div>
              <div :class="$style.group">
                <label :class="$style.key">
                  年龄：
                </label>
                <p :class="$style.value">
                  23
                </p>
              </div>
              <div :class="$style.group">
                <label :class="$style.key">
                  学历：
                </label>
                <p :class="$style.value">
                  大专
                </p>
              </div>
              <div :class="[ $style.group, $style.full ]">
                <label :class="$style.key">
                  工作经验：
                </label>
                <div :class="$style.value">
                  <p>1. 2020 ~ 2010 - 北京携程有限公司</p>
                  <p>2. 2019 ~ 2020 - 上海阿里有限公司</p>
                  <p>3. 2018 ~ 2019 - 济南椰果科技</p>
                  <p>4. 2017 ~ 2018 - 京东开发部</p>
                </div>
              </div>
              <div :class="[ $style.group, $style.full ]">
                <label :class="$style.key">
                  技术栈：
                </label>
                <div :class="$style.value">
                  <p>h5, ejs, art-template, H5 plus hBuilder</p>
                  <p>scss, less, css model, postcss</p>
                  <p>Promise, async await, let const, ...</p>
                  <p>
                    webpack,
                    <a href="https://github.com/q-jason/generator-jason" target="_blank">
                      基于 yeoman, webpack 自写自用的模板网站前端脚手架
                    </a>
                  </p>
                  <p>lodash, swiper, ... github 众多解决方案 ...</p>
                  <p>vue全家桶(router, vuex, ...), nuxt, element-ui, cube-ui, vant, vuetifyjs</p>
                  <p>react 较为熟悉，通常使用 vue 多一些</p>
                  <p>express, koa, keystone, strapi, socket.io</p>
                </div>
              </div>
              <div :class="[ $style.group, $style.full ]">
                <label :class="$style.key">
                  业务经验：
                </label>
                <div :class="$style.value">
                  <p>展示类网站开发, 后台网站开发, 响应式网站开发, 移动端网站开发（rem, vw 适配）</p>
                  <p>微信公众网页开发, 微信小程序开发</p>
                  <p>h5+ HBuilder 开发</p>
                  <p>第三方 oAuth 登陆，微信支付宝支付</p>
                </div>
              </div>
            </div>
          </div>
        </v-flex>
        <!-- 项目经验 -->
        <v-flex :class="$style.col" sm4 xs12>
          <div :class="$style.chunk">
            <div :class="$style.project">
              <div :class="$style.item">
                <h5 :class="$style.name">
                  海信网络科技
                </h5>
                <p :class="$style.desc">
                  响应式门户网站
                </p>
                <a :class="$style.addr" href="http://transtech.websiter.cn/" target="_blank">
                  http://transtech.websiter.cn/
                </a>
              </div>
              <div :class="$style.item">
                <h5 :class="$style.name">
                  海信地产微网站
                </h5>
                <p :class="$style.desc">
                  微信公众号网站，请在手机微信下扫码访问，需要关注公众号才能正常访问。
                </p>
                <img :class="$style.qr" src="./image/test-qr.png" alt="">
              </div>
              <div :class="$style.item">
                <h5 :class="$style.name">
                  海信网络科技
                </h5>
                <p :class="$style.desc">
                  响应式门户网站
                </p>
                <a :class="$style.addr" href="http://transtech.websiter.cn/" target="_blank">
                  http://transtech.websiter.cn/
                </a>
              </div>
              <div :class="$style.item">
                <h5 :class="$style.name">
                  海信网络科技
                </h5>
                <p :class="$style.desc">
                  响应式门户网站
                </p>
                <a :class="$style.addr" href="http://transtech.websiter.cn/" target="_blank">
                  http://transtech.websiter.cn/
                </a>
              </div>
              <div :class="$style.item">
                <h5 :class="$style.name">
                  海信网络科技
                </h5>
                <p :class="$style.desc">
                  响应式门户网站
                </p>
                <a :class="$style.addr" href="http://transtech.websiter.cn/" target="_blank">
                  http://transtech.websiter.cn/
                </a>
              </div>
              <div :class="$style.item">
                <h5 :class="$style.name">
                  海信网络科技
                </h5>
                <p :class="$style.desc">
                  响应式门户网站
                </p>
                <a :class="$style.addr" href="http://transtech.websiter.cn/" target="_blank">
                  http://transtech.websiter.cn/
                </a>
              </div>
              <div :class="$style.item">
                <h5 :class="$style.name">
                  海信网络科技
                </h5>
                <p :class="$style.desc">
                  响应式门户网站
                </p>
                <a :class="$style.addr" href="http://transtech.websiter.cn/" target="_blank">
                  http://transtech.websiter.cn/
                </a>
              </div>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- close btn -->
    <v-btn
      :class="$style.btn"
      color="primary"
      large
      @click="hideJason">
      关闭
    </v-btn>
    <!-- start panel -->
    <div
      v-if="!anime && !result"
      :class="$style.startPanel"
      transition="fade-transition">
      <!-- hello gif -->
      <img :class="$style.hello" src="./image/jason-start-hello.gif" alt="">
      <!-- btn -->
      <v-btn
        color="success"
        @click="anime = true">
        观看动画
      </v-btn>
      <v-btn
        color="success"
        @click="result = true">
        跳过动画
      </v-btn>
    </div>
  </v-dialog>
</template>

<script>
  import _ from 'lodash';
  import mixinInnerIsShow from '../../assets/script/mixin-inner-is-show';
  import { SHOW_JASON } from '../../store/show';

  const NOTICE = `
    Hi
    这是我的简历面板，我命名它为 "jason"
    ...
    马上开始:
    请看右侧的面板，他即将要开始了
    ...
    最右侧即将显示我的项目经验
    部分为内网访问，外网是进不去的...

  `;

  export default {
    name: 'my-jason',
    mixins: [ mixinInnerIsShow(SHOW_JASON) ],
    data () {
      return {
        // 观看动画
        anime: false,
        // 跳过动画
        result: false,

        // 提示语句
        notice: _.chain(NOTICE)
          .trim()
          .replace(/ /g, '')
          .value()
      };
    },
    methods: {
      init () {
        this.anime = false;
        this.result = false;
      }
    },
    watch: {
      // 不缓存状态
      innerIsShow (bl) {
        bl && this.init();
      }
    }
  };
</script>

<style lang="scss" module>
  .root {
    box-shadow: none !important;
  }
  .row, .col {
    transition: all .3s;
  }
  .chunk {
    background-color: #fff;
    height: 600px;
    padding: 22px;
    overflow: auto;
  }
  .btn {
    display: block;
    margin: 15px auto 0 auto;
  }
  .startPanel {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .hello {
      display: block;
      margin: 0 auto 18px 0;
    }
  }
  .notice {
    white-space: pre;
    .typed {
      display: block !important;
    }
  }
  .jianli {
    display: flex;
    flex-wrap: wrap;
    line-height: 1.7;
    p {
      margin-bottom: 0;
    }
    .group {
      flex-grow: 1;
      margin-bottom: 12px;
    }
    .group.full {
      width: 100%;
    }
    .key {
      display: block;
    }
    .value {
      margin-bottom: 0;
    }
  }
  .project {
    .item {
      margin-bottom: 12px;
    }
    .name {
      font-size: inherit;
    }
    .desc {
      margin-bottom: 0;
      font-size: 80%;
    }
    .qr {
      max-width: 100px;
      margin-top: 5px;
    }
  }
</style>
