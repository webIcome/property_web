/**
 * Created by spring on 2018/6/5.
 */
import HttpClient from 'axios'
import {Message} from 'element-ui'
import Config from "../config";
const option = {baseURL: Config.WELL_URL_API};
export default {
    findList(params) {
        return HttpClient.get('doortrip/findPage', Object.assign({params: params},option)).then(res => {
            if (res.data && res.data.data) {
                return res.data.data;
            } else {
                return {};
            }
        })
    },
    getList(params) {
        return HttpClient.get('doortrip/findList', Object.assign({params: params},option)).then(res => {
            return res.data.data;
        })
    },
    getDetail(id) {
        return HttpClient.get('doortrip/findInfoByDeviceId/' + id, option).then(res => {
            return res.data.data;
        })
    },
    operate(body) {
        return HttpClient.post('doortrip/saveOrUpdate', body,option).then(res => {
            showSuccess(res);
            return res;
        })
    },
    deleteDevice(ids) {
        return HttpClient.post('doortrip/removeBatchByDeviceIds','', Object.assign({params: {deviceIds: ids}},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSearchStatus(ids) {
        return HttpClient.post('doortrip/batchSearchStatusByDeviceIds', '', Object.assign({params: {deviceIds: ids}},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSearchHeartPeriod(ids) {
        return HttpClient.post('doortrip/batchSearchHeartBeatCycleByDeviceIds','', Object.assign({params: {deviceIds: ids}},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSearchAlarmEnabled(ids) {
        return HttpClient.post('doortrip/batchSearchAlarmDutyByDeviceIds','', Object.assign({params: {deviceIds: ids}},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSearchAlarmValue(ids) {
        return HttpClient.post('doortrip/batchSearchThresholdByDeviceIds','', Object.assign({params: {deviceIds: ids}},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSetHeartPeriod(body) {
        return HttpClient.post('doortrip/batchSetHeartBeatCycleByDeviceIds','', Object.assign({params: body},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSetAlarmValue(params) {
        return HttpClient.post('doortrip/batchSetThresholdByDeviceIds','', Object.assign({params: params},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSetAlarmEnabled(body) {
        return HttpClient.post('doortrip/batchSetAlarmDutyByDeviceIds', '',Object.assign({params: body}, option)).then(res => {
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
