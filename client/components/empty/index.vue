<template>
  <img
    :class="$style.empty"
    src="./images/empty.png">
</template>

<script>
  export default {
    name: 'my-empty'
  };
</script>

<style lang="scss" module>
  .empty {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
  }
</style>
