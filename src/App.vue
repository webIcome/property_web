<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
    created() {
      document.title = this.$t("title")
    }
}
</script>

<style>
#app {
 height: 100%;
}
</style>
