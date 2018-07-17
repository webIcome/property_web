/**
 * Created by spring on 2018/7/17.
 */
export default {
    methods: {
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