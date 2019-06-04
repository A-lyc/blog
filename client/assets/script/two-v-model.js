export default {
  props: {
    value: [ Boolean, Object, String ]
  },
  data () {
    return {
      innerValue: this.value
    };
  },
  watch: {
    value (value) {
      this.innerValue = value;
    },
    innerValue (value) {
      this.$emit('input', value);
    },
  }
};
