/**
 * Created by spring on 2018/7/26.
 */
import HttpClient from 'axios'
import {Message} from 'element-ui'
import Config from "../config";
const option = {baseURL: Config.WELL_URL_API};
export default {
    findList(params) {
        return HttpClient.get('humitureCheck/findPage', Object.assign({params: params},option)).then(res => {
            if (res.data && res.data.data) {
                return res.data.data;
            } else {
                return {};
            }
        })
    },
    getList(params) {
        return HttpClient.get('humitureCheck/findList', Object.assign({params: params},option)).then(res => {
            return res.data.data;
        })
    },
    getDetail(id) {
        return HttpClient.get('humitureCheck/findInfoByDeviceId/' + id, option).then(res => {
            return res.data.data;
        })
    },
    operate(body) {
        return HttpClient.post('humitureCheck/saveOrUpdate', body,option).then(res => {
            showSuccess(res);
            return res;
        })
    },
    deleteDevice(ids) {
        return HttpClient.post('humitureCheck/removeBatchByDeviceIds','', Object.assign({params: {deviceIds: ids}},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSearchStatus(ids) {
        return HttpClient.post('humitureCheck/batchSearchStatusByDeviceIds', '', Object.assign({params: {deviceIds: ids}},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSearchHeartPeriod(ids) {
        return HttpClient.post('humitureCheck/batchSearchHeartBeatCycleByDeviceIds', '', Object.assign({params: {deviceIds: ids}},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSearchAlarmPeriod(ids) {
        return HttpClient.post('humitureCheck/batchSearchAlarmCycleByDeviceIds', '', Object.assign({params: {deviceIds: ids}},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSearchAlarmValue(ids) {
        return HttpClient.post('humitureCheck/batchSearchThresholdByDeviceIds', '', Object.assign({params: {deviceIds: ids}},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSearchRelieveAlarmValue(ids) {
        return HttpClient.post('humitureCheck/batchSearchRelieveThresholdByDeviceIds', '', Object.assign({params: {deviceIds: ids}},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSearchAlarmEnabled(ids) {
        return HttpClient.post('humitureCheck/batchSearchAlarmDutyByDeviceIds', '', Object.assign({params: {deviceIds: ids}},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSearchGatherPeriod(ids) {
        return HttpClient.post('humitureCheck/batchSearchCollectCycleByDeviceIds', '', Object.assign({params: {deviceIds: ids}},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },

    controlSetHeartPeriod(body) {
        return HttpClient.post('humitureCheck/batchSetHeartBeatCycleByDeviceIds', '', Object.assign({params: body},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSetAlarmPeriod(body) {
        return HttpClient.post('humitureCheck/batchSetAlarmCycleByDeviceIds', '', Object.assign({params: body},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSetAlarmValue(body) {
        return HttpClient.post('humitureCheck/batchSetThresholdByDeviceIds', '', Object.assign({params: body},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSetRelieveAlarmValue(body) {
        return HttpClient.post('humitureCheck/batchSetRelieveThresholdByDeviceIds', '', Object.assign({params: body},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSetAlarmEnabled(body) {
        return HttpClient.post('humitureCheck/batchSetAlarmDutyByDeviceIds', '', Object.assign({params: body},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    controlSetGatherPeriod(params) {
        return HttpClient.post('humitureCheck/batchSetCollectCycleByDeviceIds', '', Object.assign({params: params},option)).then(res => {
            showSuccess(res);
            return res;
        })
    },
    pigeonhole(ids) {
        return HttpClient.post('humitureCheck/batchToNormalByDeviceIds', '', Object.assign({params: {deviceIds: ids}},option)).then(res => {
            showSuccess(res);
            return res;
        })
    }
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
