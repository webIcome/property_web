/**
 * Created by spring on 2018/7/17.
 */
import HttpClient from 'axios'
import Config from "../config";
import {Message} from 'element-ui'
const option = {baseURL: Config.URL_API};
export default {
    getMenus(appid) {
        return HttpClient.get('permission/getNewModuleListByUserid', Object.assign({params: {appid: appid}}, option)).then(res => {
            if (!res.data.data) {
                return [];
            } else {
                return res.data.data.result;
            }
        })
    },
    getCompanyList(params) {
        return HttpClient.get('company/getCompanyList',  Object.assign({params: params}, option)).then(res => {
            if (!res.data.data) {
                return [];
            } else {
                return res.data.data.list;
            }
        })
    },
    getPosts: function (id) {
        return HttpClient.get('post/getListByCompanyid', Object.assign({params: {companyid: id}}, option)).then(res => {
            if (!res.data.data) {
                return [];
            } else {
                return res.data.data.list;
            }
        });
    },
    getLimits(id) {
        return HttpClient.post('permission/getModuleListByPostid', {postid: id, appid: 3}, option).then(res => {
            if (!res.data.data) {
                return [];
            } else {
                return res.data.data.result;
            }
        });
    },
    addCompany(body) {
        return HttpClient.post('company/add', body, option).then(res => {
            showSuccess(res)
            return res;
        })
    },
    editCompany(body) {
        return HttpClient.post('company/edit', body, option).then(res => {
            showSuccess(res)
            return res;
        })
    },
    getCompanyDetail(id) {
        return HttpClient.post('company/getDetailsBySn', {objectid: id}, option).then(res => {
            return res.data.data;
        })
    },
    frozenCompany(body) {
        return HttpClient.post('company/frozenOrActivate', body, option).then(res => {
            showSuccess(res)
            return res;
        })
    },
    deleteCompany(body) {
        return HttpClient.post('company/delete', body, option).then(res => {
            showSuccess(res)
            return res;
        })
    },
    addPost(body) {
        return HttpClient.post('post/add', body, option).then(res => {
            showSuccess(res)
            return res;
        })
    },
    copyPost(body){
        return HttpClient.post('post/copyAdd', body, option).then(res => {
            showSuccess(res)
            return res;
        })
    },
    editPost(body) {
        return HttpClient.post('post/edit', body, option).then(res => {
            showSuccess(res)
            return res;
        })
    },
    deletePost(body) {
        return HttpClient.post('post/delete', body, option).then(res => {
            showSuccess(res)
            return res;
        })
    },
    frozenPost(body) {
        return HttpClient.post('post/frozenOrActivate', body, option).then(res => {
            showSuccess(res)
            return res;
        })
    },
    updateLimit(body) {
        return HttpClient.post('permission/changeForPost', body, option).then(res => {
            showSuccess(res)
            return res;
        })
    },
}

function showSuccess(res, msg) {
    if (res && res.data && (res.data.code == 0 || res.data.code == 200)) {
        msg = msg? msg : '操作成功';
        Message({
            message: msg,
            type: 'success',
            duration: 1000
        })
    }
}
