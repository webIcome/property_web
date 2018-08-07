/**
 * Created by spring on 2018/4/8.
 */

import LocalStorage from "./local-storage";
import Types from "./types";
import Services from '../services/system';
import LoginService from '../services/login'
export default {
    state: {
        get user() {
            let user = LocalStorage.getItem(Types.GET_USER);
            if (!user) user = {};
            return user;
        },
        set user(value) {
            LocalStorage.setItem(Types.GET_USER, value);
        },
        get token() {
            if (this.user) {
                return this.user[Types.TOKEN];
            } else {
                return null;
            }
        },
        get expiretime() {
            if (this.user) {
                return this.user[Types.EXPIRE_TIME];
            } else {
                return null;
            }
        },
        get navs() {
            let router = LocalStorage.getItem(Types.ROUTER);
            if (!router) router = [];
            return router;
        },
        set navs(value) {
            LocalStorage.setItem(Types.ROUTER, value);
        }
    },
    login(access) {
        return LoginService.login(access).then(res => {
            if (res.data.data) {
                this.state.user = res.data.data;
                return res.data.data
            } else {
                throw new Error(res.data.msg)
            }
        }).catch(err => Promise.reject(err))
    },
    getMenus() {
        return Services.getMenus(3).then(list => {
            this.state.navs = dealNav(list);
            return this.state.navs;
        }).catch(err => Promise.reject(err))
    }
}

function dealNav(list) {
    let navs = {};
    navs.parents = list.map(item => {
        if (item.children.length) {
            navs[item.modulecode] = getChildren(item.children)
        }
        return {modulename: item.modulename, modulecode: item.modulecode};
    });
    return navs;
}

function getChildren(list) {
    return list.map(item => {
        return {modulename: item.modulename, modulecode: item.modulecode};
    })
}
