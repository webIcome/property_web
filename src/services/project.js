/**
 * Created by spring on 2018/7/18.
 */
/**
 * Created by spring on 2018/7/17.
 */
/**
 * Created by spring on 2018/5/7.
 */
import HttpClient from 'axios'
import Config from "../config";
import {Message} from 'element-ui'
const option = {baseURL: Config.WELL_URL_API};
export default {
    findList(params) {
        return HttpClient.get('project/findPage', Object.assign({params: params}, option)).then(res => {
            if (res.data && res.data.data) {
                return res.data.data;
            } else {
                return {};
            }
        })
    },
    operate(body) {
        return HttpClient.post('project/saveOrUpdate', body, option).then(res => {
            showSuccess(res);
            return res;
        })
    },
    deleteProject(ids) {
        return HttpClient.post('project/removeBatchByIds','', Object.assign({params: {ids: ids}},option)).then(res => {
            showSuccess(res);
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
