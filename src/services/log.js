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
const option = {baseURL: Config.URL_API};
export default {
    findList(params) {
        return HttpClient.get('operationLogs/getList', Object.assign({params: params}, option)).then(res => {
            if (res.data && res.data.data) {
                return res.data.data;
            } else {
                return {};
            }
        })
    },
}

