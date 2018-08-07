/**
 * Created by spring on 2018/8/6.
 */
import HttpClient from 'axios'
import Config from "../config";
const option = {baseURL: Config.WELL_URL_API};
export default {
    findList(params) {
        return HttpClient.get('monitoring/findMonitoringData', Object.assign({params: params}, option)).then(res => {
            return res.data.data;
        })
    },
}