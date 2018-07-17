<template>
  <aside-nav-component :navs="navs" @collapse="collapse" @initCollapse="initCollapse"></aside-nav-component>
</template>
<script>
    import AsideNavComponent from "./aside-nav-component";
    import asideNavMixin from "./aside-nav-mixin"
    export default {
        components: {AsideNavComponent},
        mixins: [asideNavMixin],
        name: 'asideNavJustTime',
        data() {
            return {
                navs: []
            }
        }
    }
</script>
<style lang="less" scoped>

</style>