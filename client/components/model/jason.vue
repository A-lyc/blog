<template>
  <v-dialog
    v-model="innerIsShow"
    :persistent="true"
    max-width="600">
    <v-card>
      <v-card-title>
        未完成...
      </v-card-title>
      <v-card-text>
        <v-btn
          block
          color="primary"
          @click="hideJason">
          关闭
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import base from './base';
  import { SHOW_JASON } from '../../store/model';

  export default {
    name: 'my-jason',
    mixins: [ base(SHOW_JASON) ]
  };
</script>

<style lang="scss" module>

</style>
