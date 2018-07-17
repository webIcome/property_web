import Vue from 'vue'
import Router from 'vue-router'
import PageFrame from '../pages/page-frame/index.vue';
import AsideNavAnalyze from "../pages/page-frame/aside-nav-analyze.vue"
import AsideNavAsset from "../pages/page-frame/aside-nav-asset.vue"
import AsideNavSystem from "../pages/page-frame/aside-nav-system.vue"
import AsideNavJustTime from "../pages/page-frame/aside-nav-just-time.vue"

const WaterLevel = () => import(/* webpackChunkName: "asset" */'../pages/asset/water-level/index.vue');
const StandingBook = () => import(/* webpackChunkName: "asset" */'../pages/asset/standing-book/index.vue');

Vue.use(Router);
import StoreUser from "../store/user"

let router = new Router({
    routes: [
        // {path: '/login', name: 'login', component: login},
        {path: '/', name: 'home', component: PageFrame, children: [
            {path: 'analyze', name: 'analyze', component: AsideNavAnalyze, children: [
                {path: 'water-level', name: 'waterLevel', component: WaterLevel},
            ]},
            {path: 'asset', name: 'asset', component: AsideNavAsset, children: [
                {path: 'water-level', name: 'waterLevel', component: WaterLevel},
                {path: 'standing-book', name: 'standingBook', component: StandingBook},
            ]},
            {path: 'just-time', name: 'justTime', component: AsideNavJustTime, children: [
                {path: 'water-level', name: 'waterLevel', component: WaterLevel},
            ]},
            {path: 'system', name: 'system', component: AsideNavSystem, children: [
                {path: 'water-level', name: 'waterLevel', component: WaterLevel},
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
