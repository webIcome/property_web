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
                code: 'PROPERTYXTGL',
                navs: [
                    {modulename: "角色管理", ename: 'role', url: 'role'},
                    {modulename: "项目管理", ename: 'project', url: 'project'},
                    {modulename: "用户管理", ename: 'user', url: 'user'},
                    {modulename: "操作日志", ename: 'log', url: 'log'},
                ],
                localNavs: [
                    {modulename: "角色管理", ename: 'role', url: 'role', modulecode: 'PROPERTYJSGL'},
                    {modulename: "项目管理", ename: 'project', url: 'project', modulecode: 'PROPERTYXMGL'},
                    {modulename: "用户管理", ename: 'user', url: 'user', modulecode: 'PROPERTYYHGL'},
                    {modulename: "操作日志", ename: 'log', url: 'log', modulecode: 'PROPERTYCZRZ'},
                ],
            }
        },
        methods: {

        }
    }
</script>
<style lang="less" scoped>

</style>