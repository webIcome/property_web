/**
 * Created by spring on 2018/7/18.
 */
import HttpClient from 'axios'
import Config from "../config";
import {Message} from 'element-ui'
const option = {baseURL: Config.URL_API};
const wellOption = {baseURL: Config.WELL_URL_API}
export default {
    findList(params) {
        return HttpClient.get('account/findPage', Object.assign({params: params}, wellOption)).then(res => {
            if (res.data && res.data.data) {
                return res.data.data;
            } else {
                return {};
            }
        })
    },
    resetPassword(body) {
        return HttpClient.post('user/resetPassword', body, option).then(res => {
            showSuccess(res)
            return res;
        })
    },
    operate(body) {
        return HttpClient.post('account/saveOrUpdate', body, wellOption).then(res => {
            showSuccess(res)
            return res;
        })
    },
    deleteUser(body) {
        return HttpClient.post('user/delete', body, option).then(res => {
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
