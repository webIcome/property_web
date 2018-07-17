<template>
  <aside-nav-component :navs="navs" @collapse="collapse" @initCollapse="initCollapse"></aside-nav-component>
</template>
<script>
    import AsideNavComponent from "./aside-nav-component";
    import asideNavMixin from "./aside-nav-mixin"
    export default {
        components: {AsideNavComponent},
        mixins: [asideNavMixin],
        name: 'asideNavSystem',
        data() {
            return {
                navs: []
            }
        },
        methods: {

        }
    }
</script>
<style lang="less" scoped>

</style>