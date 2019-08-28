<template>
  <div>
    <my-search/>
    <my-login/>
    <my-album/>
    <my-jason/>
  </div>
</template>

<script>
  import mixinShow from '../../assets/script/mixin-show'

  export default {
    name: 'my-dialog',
    mixins: [ mixinShow ],
    mounted () {
      // default open jason
      location.hash === '#jason' && this.showJason()
    }
  }
</script>

<style lang="scss" module>

</style>
