import * as TYPES from '../../store/show';

const moduleName = 'show';

export default {
  methods: {
    showAside () {
      this.$store.commit(`${ moduleName }/${ TYPES.SHOW_ASIDE }`, true);
    },
    showSearch () {
      this.$store.commit(`${ moduleName }/${ TYPES.SHOW_SEARCH }`, true);
    },
    hideSearch () {
      this.$store.commit(`${ moduleName }/${ TYPES.SHOW_SEARCH }`, false);
    },
    showAlbum () {
      this.$store.commit(`${ moduleName }/${ TYPES.SHOW_ALBUM }`, true);
    },
    hideAlbum () {
      this.$store.commit(`${ moduleName }/${ TYPES.SHOW_ALBUM }`, false);
    },
    showLogin () {
      this.$store.commit(`${ moduleName }/${ TYPES.SHOW_LOGIN }`, true);
    },
    hideLogin () {
      this.$store.commit(`${ moduleName }/${ TYPES.SHOW_LOGIN }`, false);
    },
    showJason () {
      this.$store.commit(`${ moduleName }/${ TYPES.SHOW_JASON }`, true);
    },
    hideJason () {
      this.$store.commit(`${ moduleName }/${ TYPES.SHOW_JASON }`, false);
    }
  }
};