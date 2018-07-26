import Vue from 'vue'
import Router from 'vue-router'
import Login from "../pages/login.vue"
import PageFrame from '../pages/page-frame/index.vue';
import AsideNavAnalyze from "../pages/page-frame/aside-nav-analyze.vue"
import AsideNavAsset from "../pages/page-frame/aside-nav-asset.vue"
import AsideNavSystem from "../pages/page-frame/aside-nav-system.vue"
import AsideNavJustTime from "../pages/page-frame/aside-nav-just-time.vue"

const WaterLevel = () => import(/* webpackChunkName: "asset" */'../pages/asset/water-level/index.vue');
const StandingBook = () => import(/* webpackChunkName: "asset" */'../pages/asset/standing-book/index.vue');
const FlowProbe = () => import(/* webpackChunkName: "asset" */'../pages/asset/flow-probe/index.vue');
const InundateProbe = () => import(/* webpackChunkName: "asset" */'../pages/asset/inundate-probe/index.vue');
const IlluminanceProbe = () => import(/* webpackChunkName: "asset" */'../pages/asset/illuminance-probe/index.vue');
const TemperatureHumidityProbe = () => import(/* webpackChunkName: "asset" */'../pages/asset/temperature-humidity-probe/index.vue');
const TemperatureProbe = () => import(/* webpackChunkName: "asset" */'../pages/asset/temperature-probe/index.vue');
//system
const Log = () => import(/* webpackChunkName: "sys" */'../pages/system/log/index.vue');
const Role = () => import(/* webpackChunkName: "sys" */'../pages/system/role/index.vue');
const Project = () => import(/* webpackChunkName: "sys" */'../pages/system/project/index.vue');
const User = () => import(/* webpackChunkName: "sys" */'../pages/system/user/index.vue');
//statistics
const StatisticalStatement = () => import(/* webpackChunkName: "statistics" */'../pages/statistics/statistical-statement/index.vue');
const DataAnalyse = () => import(/* webpackChunkName: "statistics" */'../pages/statistics/data-analyse/index.vue');
//justTime
const JustTime = () => import(/* webpackChunkName: "justTime" */'../pages/just-time/index.vue');


Vue.use(Router);
import StoreUser from "../store/user"

let router = new Router({
    routes: [
        {path: '/login', name: 'login', component: Login},
        {path: '/', name: 'home', component: PageFrame, children: [
            {path: 'analyze', name: 'analyze', component: AsideNavAnalyze, children: [
                {path: 'statistical-statement', name: 'statisticalStatement', component: StatisticalStatement},
                {path: 'data-analysis', name: 'dataAnalyse', component: DataAnalyse},
            ]},
            {path: 'asset', name: 'asset', component: AsideNavAsset, children: [
                {path: 'water-level', name: 'waterLevel', component: WaterLevel},
                {path: 'flow-probe', name: 'flowProbe', component: FlowProbe},
                {path: 'inundate-probe', name: 'inundateProbe', component: InundateProbe},
                {path: 'illuminance-probe', name: 'illuminanceProbe', component: IlluminanceProbe},
                {path: 'temperature-humidity-probe', name: 'temperatureHumidityProbe', component: TemperatureHumidityProbe},
                {path: 'temperature-probe', name: 'temperatureProbe', component: TemperatureProbe},
                {path: 'standing-book', name: 'standingBook', component: StandingBook},
            ]},
            {path: 'just-time', name: 'justTime', component: JustTime},
            {path: 'system', name: 'system', component: AsideNavSystem, children: [
                {path: 'log', name: 'log', component: Log},
                {path: 'role', name: 'role', component: Role},
                {path: 'project', name: 'project', component: Project},
                {path: 'user', name: 'user', component: User},
            ]},
        ]},
    ]
})

router.beforeEach((to, from, next) => {
    if (to.query.loginname && to.query.password) {
        StoreUser.login(to.query).then(res => {
            next(to.path)
        }).catch(err => {
            next('login')
        })
    } else {
        next()
    }
})
export default router
