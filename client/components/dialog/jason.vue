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
              <div :class="[ $style.group, $style.full ]">
                <div :class="$style.value">
                  <v-avatar :size="80">
                    <img :src="jason.avatar.url" alt="">
                  </v-avatar>
                </div>
              </div>
              <div :class="$style.group">
                <label :class="$style.key">
                  姓名：
                </label>
                <p :class="$style.value">
                  {{ jason.name }}
                </p>
              </div>
              <div :class="$style.group">
                <label :class="$style.key">
                  性别：
                </label>
                <p :class="$style.value">
                  {{ jason.gender }}
                </p>
              </div>
              <div :class="$style.group">
                <label :class="$style.key">
                  年龄：
                </label>
                <p :class="$style.value">
                  {{ age }}
                </p>
              </div>
              <div :class="$style.group">
                <label :class="$style.key">
                  学历：
                </label>
                <p :class="$style.value">
                  {{ jason.xueli }}
                </p>
              </div>
              <div :class="[ $style.group, $style.full ]">
                <label :class="$style.key">
                  工作经验：
                </label>
                <div :class="[ $style.value, $style.pre ]" v-text="jason.workHistory"/>
              </div>
              <div :class="[ $style.group, $style.full ]">
                <label :class="$style.key">
                  学习途径:
                </label>
                <div :class="[ $style.value, $style.pre ]" v-text="jason.studyWay"/>
              </div>
            </div>
          </div>
        </v-flex>
        <!-- 技能栈 -->
        <v-flex :class="$style.col" sm4 xs12>
          <div :class="$style.chunk">
            <div :class="$style.skill" v-if="skillArr && skillArr.length">
              <div :class="[ $style.group, $style.full ]">
                <label :class="$style.key">
                  技术栈：
                </label>
              </div>
              <div
                :class="[ $style.group, $style.full ]"
                v-for="skill in skillArr"
                :key="skill.id">
                <label :class="$style.key">
                  {{ skill.title }}
                </label>
                <div :class="$style.value" v-html="skill.content"/>
              </div>
            </div>
          </div>
        </v-flex>
        <!-- 项目经验 -->
        <v-flex :class="$style.col" sm4 xs12>
          <div :class="$style.chunk">
            <div :class="$style.project" v-if="projectArr && projectArr.length">
              <div
                :class="$style.item"
                v-for="project in projectArr"
                :key="project.id">
                <!-- 项目名称 -->
                <h5 :class="$style.name">
                  {{ project.name }}
                </h5>
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
                  v-else
                  :href="project.url"
                  target="_blank">
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
  </v-dialog>
</template>

<script>
  import moment from 'moment';
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
        return moment().diff(moment(this.jason.birthday), 'years');
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
    line-height: 1.7;
  }
  .btn {
    display: block;
    margin: 15px auto 0 auto;
  }
  .resume, .skill {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
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
      font-weight: bold;
    }
    .value {
      margin-bottom: 0;
    }
    .value.pre {
      white-space: pre;
    }
  }
  .resume {
  }
  .skill {

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
      margin-top: 5px;
    }
  }
</style>
