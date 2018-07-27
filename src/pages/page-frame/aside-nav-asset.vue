<template>
  <aside-nav-component :navs="navs" @collapse="collapse" @initCollapse="initCollapse"></aside-nav-component>
</template>
<script>
    import AsideNavComponent from "./aside-nav-component";
    import asideNavMixin from "./aside-nav-mixin"
    export default {
        components: {AsideNavComponent},
        name: 'asideNavAsset',
        mixins: [asideNavMixin],
        data() {
            return {
                navs: [
                    {modulename: "台帐管理", ename: 'standing-book', url: 'standing-book'},
                    {
                    modulename: '物联设备',
                    ename: 'equipment',
                    modulecode: 'TERMINAL',
                    children: [
                        {modulename: '水位', modulecode: 'TERMINALWATERLEVEL', url: 'water-level', ename: 'water-level'},
                        {modulename: '水流', url: 'flow-probe',ename: 'flow-probe'},
                        {modulename: '电流', url: 'current-probe',ename: 'current-probe'},
                        {modulename: '浸水', url: 'inundate-probe',ename: 'inundate-probe'},
                        {modulename: '抄表', url: 'meter-reading',ename: 'meter-reading'},
                        {modulename: '门禁', url: 'door',ename: 'door-probe'},
                        {modulename: '人体', url: 'body-sensor',ename: 'body-sensor'},
                        {modulename: '水压', url: 'water-gage',ename: 'water-gage'},
                        {modulename: '振动', url: 'shake-probe',ename: 'shake-probe'},
                        {modulename: '温度', url: 'temperature-probe',ename: 'temperature-probe'},
                        {modulename: '温湿度', url: 'temperature-humidity-probe',ename: 'temperature-humidity-probe'},
                        {modulename: '光照度', url: 'illuminance-probe',ename: 'illuminance-probe'},
                        {modulename: '干接点', url: 'dry-contact-probe',ename: 'dry-contact-probe'},
                        {modulename: '声音', url: 'sound-probe',ename: 'sound-probe'},
                    ]
                },],
            }
        },
        created() {
        },

    }
</script>
<style lang="less" scoped>

</style>