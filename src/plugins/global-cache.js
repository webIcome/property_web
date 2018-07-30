/**
 * Created by spring on 2018/2/2.
 */
import HttpClient from 'axios';
import Config from "../config";
class GlobalCache {
    constructor() {
        this._companies;
        this._projects;
        this._system;
        this._assetType;
    }
    refleshCompanies() {
        this._companies = null;
        return this.companies;
    }
    clearCache() {
        Object.keys(this).forEach(key => {
            this[key] = null;
        });
    }
    get companies() {
        if (!this._companies) {
            this._companies = HttpClient.get('company/getTreeInfo', {baseURL: Config.URL_API}).then(res => {
                if (!res.data.data) {
                    this._companies = null;
                } else {
                    return res.data.data.companies;
                }
            }).catch(err => {
                this._companies = null;
            })
        }
        return this._companies;
    }
    get projects() {
        if (!this._projects) {
            this._projects = HttpClient.get('project/findList', {baseURL: Config.WELL_URL_API}).then(res => {
                if (!res.data.data) {
                    this._projects = null;
                } else {
                    return res.data.data.companies;
                }
            }).catch(err => {
                this._projects = null;
            })
        }
        return this._projects;
    }
    get system() {
        if (!this._system) {
            this._system = HttpClient.get('assetManage/findSystemList', {baseURL: Config.WELL_URL_API}).then(res => {
                if (!res.data.data) {
                    this._system = null;
                } else {
                    return res.data.data;
                }
            }).catch(err => {
                this._system = null;
            })
        }
        return this._system;
    }
    get assetType() {
        if (!this._assetType) {
            this._assetType = HttpClient.get('assetManage/findAssetTypeList', {baseURL: Config.WELL_URL_API}).then(res => {
                if (!res.data.data) {
                    this._assetType = null;
                } else {
                    return res.data.data;
                }
            }).catch(err => {
                this._assetType = null;
            })
        }
        return this._assetType;
    }
}

export default {
    install(Vue, pluginOptions = {}) {
        let $globalCache = new GlobalCache();
        Vue.GlobalCache = Vue.prototype.$globalCache = $globalCache
    }
}