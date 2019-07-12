<template>
  <v-dialog
    v-model="innerIsShow"
    :content-class="$style.root"
    :persistent="true"
    max-width="1500">
    <!-- content -->
    <v-container fluid grid-list-xl>
      <v-layout :class="$style.row" wrap>
        <!-- 简历 -->
        <v-flex :class="$style.col" sm4 xs12>
          <div :class="$style.chunk">
            <div :class="$style.resume" v-if="jason">
              <div :class="[ $style.group ]">
                <v-avatar :size="60">
                  <img :src="jason.avatar.url" alt="">
                </v-avatar>
              </div>
              <div :class="$style.group">
                <label :class="$style.subtitle">
                  <i class="primary" :class="[ $style.icon, $style.float ]"/>
                  姓名：
                </label>
                <p :class="$style.desc">
                  {{ jason.name }}
                </p>
              </div>
              <div :class="$style.group">
                <label :class="$style.subtitle">
                  <i class="primary" :class="[ $style.icon, $style.float ]"/>
                  性别：
                </label>
                <p :class="$style.desc">
                  {{ jason.gender }}
                </p>
              </div>
              <div :class="$style.group">
                <label :class="$style.subtitle">
                  <i class="primary" :class="[ $style.icon, $style.float ]"/>
                  年龄：
                </label>
                <p :class="$style.desc">
                  {{ age }}
                </p>
              </div>
              <div :class="$style.group">
                <label :class="$style.subtitle">
                  <i class="primary" :class="[ $style.icon, $style.float ]"/>
                  学历：
                </label>
                <p :class="$style.desc">
                  {{ jason.xueli }}
                </p>
              </div>
              <div :class="[ $style.group, $style.full ]">
                <label :class="$style.subtitle">
                  <i class="primary" :class="[ $style.icon ]"/>
                  工作经验：
                </label>
                <div :class="[ $style.desc, $style.pre ]" v-text="jason.workHistory"/>
              </div>
              <div :class="[ $style.group, $style.full ]">
                <label :class="$style.subtitle">
                  <i class="primary" :class="[ $style.icon ]"/>
                  学习途径：
                </label>
                <div :class="[ $style.desc, $style.pre ]" v-text="jason.studyWay"/>
              </div>
            </div>
          </div>
        </v-flex>
        <!-- 技能栈 -->
        <v-flex :class="$style.col" sm4 xs12>
          <div :class="$style.chunk">
            <div :class="$style.skill" v-if="skillArr && skillArr.length">
              <h4 :class="$style.title">
                技术栈：
              </h4>
              <div
                :class="[ $style.group, $style.full ]"
                v-for="skill in skillArr"
                :key="skill.id">
                <label :class="$style.subtitle">
                  <i class="primary" :class="[ $style.icon ]"/>
                  {{ skill.title }}：
                </label>
                <div :class="$style.desc" v-html="skill.content"/>
              </div>
            </div>
          </div>
        </v-flex>
        <!-- 项目经验 -->
        <v-flex :class="$style.col" sm4 xs12>
          <div :class="$style.chunk">
            <div :class="$style.project" v-if="projectArr && projectArr.length">
              <h4 :class="$style.title">
                项目经验：
              </h4>
              <div
                :class="[$style.group, $style.full]"
                v-for="project in projectArr"
                :key="project.id">
                <!-- 项目名称 -->
                <label :class="$style.subtitle">
                  <i class="primary" :class="[ $style.icon ]"/>
                  {{ project.name }}
                </label>
                <!-- 项目简单描述 -->
                <p :class="$style.desc">
                  {{ project.description }}
                </p>
                <!-- 项目链接 二维码形式 -->
                <vue-qr
                  :class="$style.qr"
                  v-if="project.isQr"
                  :text="project.url"
                  :size="100"
                  :dotScale="1"
                  :margin="0"/>
                <!-- 项目链接 url 形式-->
                <a
                  :class="$style.addr"
                  v-else-if="$validator.isURL(project.url)"
                  :href="project.url"
                  target="_blank">
                  {{ project.url }}
                </a>
                <!-- 项目链接文字形式 -->
                <div v-else>
                  {{ project.url }}
                </div>
              </div>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- close btn -->
    <v-btn
      :class="$style.close"
      color="primary"
      large
      @click="hideJason">
      关闭
    </v-btn>
  </v-dialog>
</template>

<script>
  import mixinInnerIsShow from '../../assets/script/mixin-inner-is-show';
  import { SHOW_JASON } from '../../store/show';

  export default {
    name: 'my-jason',
    mixins: [ mixinInnerIsShow(SHOW_JASON) ],
    data () {
      return {
        jason: null,
        skillArr: [],
        projectArr: []
      };
    },
    computed: {
      age () {
        if (!this.jason) return '';
        if (!this.jason.birthday) return '';
        return this.$moment().diff(this.$moment(this.jason.birthday), 'years');
      }
    },
    methods: {
      async getData () {
        try {
          this.$api.getJason().then(({ data }) => {
            this.jason = data;
          });
          this.$api.getSkills().then(({ data }) => {
            this.skillArr = data;
          });
          this.$api.getProject().then(({ data }) => {
            this.projectArr = data;
          });
        }
        catch (err) {
          this.$alert.show('error', '获取简历数据时发生错误');
        }
      }
    },
    watch: {
      innerIsShow (bl) {
        bl && this.getData();
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
  .close {
    display: block;
    margin: 15px auto 0 auto;
  }
  // 新增的
  .resume, .skill, .project {
    display: flex;
    flex-wrap: wrap;
    /*align-items: center;*/
  }
  .group {
    flex-grow: 1;
    padding: 12px 0;
    line-height: 2.0;
    &:not(:last-child) {
      border-bottom: 1px solid rgba(#000, .1);
    }
    &.full {
      width: 100%;
    }
  }
  .title {
    display: block;
    font-size: 16px;
  }
  .subtitle {
    position: relative;
    display: flex;
    align-items: center;
    font-size: 14px;
    .icon {
      height: 5px;
      width: 5px;
      border-radius: 50%;
      margin-right: 8px;
      // 颜色由 primary 指定
    }
    .icon.float {
      position: absolute;
      top: 50%;
      right: 100%;
      transform: translate(-8px, -50%);
      margin-right: 0;
    }
  }
  .desc {
    margin-bottom: 0;
    font-size: 14px;
    &.pre {
      white-space: pre;
    }
  }
  .qr {
    margin-top: 6px;
  }
</style>
