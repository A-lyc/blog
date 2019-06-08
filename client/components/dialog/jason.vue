<template>
  <v-dialog
    :content-class="$style.root"
    v-model="innerIsShow"
    :persistent="true"
    max-width="1500">
    <div :class="$style.wrapper">
      <div :class="$style.chunk">
        这里放照片...
      </div>
      <div :class="$style.chunk">
        这里放基础信息 + 技能栈
      </div>
      <div :class="$style.chunk">
        这里放项目经验
      </div>
    </div>
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
  import mixinDialog from '../../assets/script/mixin-dialog';
  import { SHOW_JASON } from '../../store/show';

  export default {
    name: 'my-jason',
    mixins: [ mixinDialog(SHOW_JASON) ]
  };
</script>

<style lang="scss" module>
  .root {
    box-shadow: none !important;
  }
  .jason {
  }
  .wrapper {
    display: flex;
  }
  .chunk {
    width: 33.333333%;
    background-color: #fff;
    height: 600px;
    &:not(:last-child) {
      margin-right: 20px;
    }
  }
  .btn {
    display: block;
    margin: 15px auto 0 auto;
  }
</style>
