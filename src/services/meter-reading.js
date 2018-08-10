/**
 * Created by spring on 2018/6/5.
 */
import HttpClient from 'axios'
import {Message} from 'element-ui'
import Config from "../config";
const option = {baseURL: Config.WELL_URL_API};
export default {
    findList(params) {
        return HttpClient.get('meterRead/findPage', Object.assign({params: params},option)).then(res => {
            if (res.data && res.data.data) {
                return res.data.data;
            } else {
                return {};
            }
        })
    },
    getList(params) {
        return HttpClient.get('meterRead/findList', Object.assign({params: params},option)).then(res => {
            return res.data.data;
        })
    },
    getDetail(id) {
        return HttpClient.get('meterRead/findInfoByDeviceId/' + id, option).then(res => {
            return res.data.data;
        })
    },
    operate(body) {
        return HttpClient.post('meterRead/saveOrUpdate', body,option).then(res => {
            showSuccess(res);
            return res;
        })
    },
    deleteDevice(ids) {
        return HttpClient.post('meterRead/removeBatchByDeviceIds','', Object.assign({params: {deviceIds: ids}},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSearchStatus(body) {
        return HttpClient.post('meterRead/batchSearchStatusByDeviceIds', '', Object.assign({params: body},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSearchEnergyCycle(ids) {
        return HttpClient.post('meterRead/batchSearchElectricEnergyCycleByDeviceIds','', Object.assign({params: {deviceIds: ids}},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSearchCollectLoop(ids) {
        return HttpClient.post('meterRead/batchSearchCollectDirectionByDeviceIds','', Object.assign({params: {deviceIds: ids}},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSearchAddressCode(ids) {
        return HttpClient.post('meterRead/batchSearchAddressCodeByDeviceIds','', Object.assign({params: {deviceIds: ids}},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSetEnergyCycle(body) {
        return HttpClient.post('meterRead/batchSetElectricEnergyCycleByDeviceIds','', Object.assign({params: body},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSetCollectLoop(params) {
        return HttpClient.post('meterRead/batchSetCollectDirectionByDeviceIds','', Object.assign({params: params},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSetAddressCode(body) {
        return HttpClient.post('meterRead/batchSetAddressCodeByDeviceIds', '',Object.assign({params: body}, option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
}

function showSuccess(res, msg) {
    if (res && res.data && res.data.code == 0) {
        msg = msg? msg : '操作成功';
        Message({
            message: msg,
            type: 'success',
            duration: 1000
        })
    }
}
