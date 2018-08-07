<template>
  <aside-nav-component :navs="navs" @collapse="collapse" @initCollapse="initCollapse"></aside-nav-component>
</template>
<script>
    import AsideNavComponent from "./aside-nav-component";
    import asideNavMixin from "./aside-nav-mixin"
    export default {
        components: {AsideNavComponent},
        mixins: [asideNavMixin],
        name: 'asideNavAnalyze',
        data() {
            return {
                code: 'PROPERTYTJFX',
                navs: [
                    {modulename: "统计报表", ename: 'statistical-statement', url: 'statistical-statement'},
                    {modulename: "数据分析", ename: 'data-analysis', url: 'data-analysis'},
                ],
                localNavs: [
                    {modulename: "统计报表", ename: 'statistical-statement', url: 'statistical-statement', modulecode: 'PROPERTYTJBB'},
                    {modulename: "数据分析", ename: 'data-analysis', url: 'data-analysis', modulecode: 'PROPERTYSJFX'},
                ]
            }
        },
        created() {
        }
    }
</script>
<style lang="less" scoped>

</style>