<template>
  <v-dialog v-model="innerValue" max-width="500">
    <v-card class="pa-3">
      <v-card-title class="headline">
        登陆
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="username"
          label="username"
          @keyup.enter.native="submit"/>
        <v-text-field
          v-model="password"
          label="password"
          type="password"
          @keyup.enter.native="submit"/>
        <v-btn
          color="primary"
          :loading="loading"
          @click="submit">
          GO
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import { USER, JWT } from '../../store/user';
  import mixinTwoVModel from '../../assets/script/two-v-model';

  export default {
    name: 'my-login',
    mixins: [ mixinTwoVModel ],
    data () {
      return {
        username: '',
        password: '',
        loading: false
      };
    },
    methods: {
      async submit () {
        this.loading = true;

        let { user, jwt } = (await this.$api.login({
          identifier: this.username,
          password: this.password
        })).data;

        // set store
        this.$store.commit(`user/${ USER }`, user);
        this.$store.commit(`user/${ JWT }`, jwt);

        this.loading = false;
      }
    }
  };
</script>

<style lang="scss" module>

</style>
