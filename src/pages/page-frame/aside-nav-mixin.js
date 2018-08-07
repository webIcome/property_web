/**
 * Created by spring on 2018/7/17.
 */
import UserStorage from "../../store/user"
export default {
    data() {
        return {
            navs: [],
            code: '',
            localNavs: []
        }
    },
    created() {
        this.navs = this.dealNavs(this.getNavs(this.code))
    },
    methods: {
        getNavs(code) {
            return UserStorage.state.navs[code];
        },
        dealNavs(navs) {
            return navs.map(item => {
                this.localNavs.forEach(nav => {
                    if (item.modulecode == nav.modulecode) {
                        item.url = nav.url;
                        item.ename = nav.ename;
                    }
                })
                return item;

            }).filter(item => {
                let filter = false;
                this.localNavs.forEach(nav => {
                    if (nav.modulecode == item.modulecode) {
                        filter = true;
                    }
                });
                return filter;
            })
        },
        collapse(nav, two) {
            let isActive = nav.isActive;
            this.isActiveHide(two);
            nav.isActive = !isActive;
            this.navs = Array.concat(this.navs)
        },
        initCollapse(nav) {
            nav.isActive = true;
            this.navs = Array.concat(this.navs)
        },
        isActiveHide(two) {
            if (two) {
                return;
            }
            this.navs.forEach(nav => {
                add(nav);
            });
            function add(nav) {
                if (nav && !nav.url) {
                    nav.isActive = false;
                }
                if (nav.children && nav.children.length) {
                    nav.children.forEach(child => {
                        add(child);
                    })
                }
            }
        },
    }
}