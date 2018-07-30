/**
 * Created by spring on 2018/7/20.
 */
import HttpClient from 'axios'
import {Message} from 'element-ui'
import Config from "../config";
const option = {baseURL: Config.WELL_URL_API};
export default {
    findList(params) {
        return HttpClient.get('assetManage/findPage', Object.assign({params: params}, option)).then(res => {
            if (res.data && res.data.data) {
                return res.data.data;
            } else {
                return {};
            }
        })
    },
    getList(params) {
        return HttpClient.get('assetManage/findList', Object.assign({params: params}, option)).then(res => {
            return res.data.data;
        })
    },
    getDetail(id) {
        return HttpClient.get('assetManage/findInfoById/' + id, option).then(res => {
            return res.data.data;
        })
    },
    operate(body) {
        return HttpClient.post('assetManage/saveOrUpdate', body, option).then(res => {
            showSuccess(res);
            return res;
        })
    },
    deleteDevice(ids) {
        return HttpClient.post('assetManage/removeBatchByIds', '', Object.assign({params: {ids: ids}}, option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
}

function showSuccess(res, msg) {
    if (res && res.data && res.data.code == 0) {
        msg = msg ? msg : '操作成功';
        Message({
            message: msg,
            type: 'success',
            duration: 1000
        })
    }
}
