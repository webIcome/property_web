/**
 * Created by spring on 2018/6/5.
 */
import HttpClient from 'axios'
import {Message} from 'element-ui'
import Config from "../config";
const option = {baseURL: Config.WELL_URL_API};
export default {
    findList(params) {
        return HttpClient.get('dryContact/findPage', Object.assign({params: params},option)).then(res => {
            if (res.data && res.data.data) {
                return res.data.data;
            } else {
                return {};
            }
        })
    },
    getList(params) {
        return HttpClient.get('dryContact/findList', Object.assign({params: params},option)).then(res => {
            return res.data.data;
        })
    },
    getDetail(id) {
        return HttpClient.get('dryContact/findInfoByDeviceId/' + id, option).then(res => {
            return res.data.data;
        })
    },
    operate(body) {
        return HttpClient.post('dryContact/saveOrUpdate', body,option).then(res => {
            showSuccess(res);
            return res;
        })
    },
    deleteDevice(ids) {
        return HttpClient.post('dryContact/removeBatchByDeviceIds','', Object.assign({params: {deviceIds: ids}},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSearchStatus(ids) {
        return HttpClient.post('dryContact/batchSearchStatusByDeviceIds', '', Object.assign({params: {deviceIds: ids}},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSearchAlarmPeriod(ids) {
        return HttpClient.post('dryContact/batchSearchCollectCycleByDeviceIds','', Object.assign({params: {deviceIds: ids}},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSearchGatherPeriod(ids) {
        return HttpClient.post('dryContact/batchSearchCollectCycleByDeviceIds','', Object.assign({params: {deviceIds: ids}},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSearchAlarmEnabled(ids) {
        return HttpClient.post('dryContact/batchSearchAlarmDutyByDeviceIds','', Object.assign({params: {deviceIds: ids}},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSearchTurnOffLevel(ids) {
        return HttpClient.post('dryContact/batchSearchTurnOffLevelByDeviceIds','', Object.assign({params: {deviceIds: ids}},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSetAlarmPeriod(body) {
        return HttpClient.post('dryContact/batchSetHeartBeatCycleByDeviceIds','', Object.assign({params: body},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSetGatherPeriod(body) {
        return HttpClient.post('dryContact/batchSetCollectCycleByDeviceIds','', Object.assign({params: body},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSetAlarmEnabled(body) {
        return HttpClient.post('dryContact/batchSetAlarmDutyByDeviceIds', '',Object.assign({params: body}, option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSetTurnOffLevel(body) {
        return HttpClient.post('dryContact/batchSetTurnOffLevelByDeviceIds','', Object.assign({params: body},option)).then(res => {
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
