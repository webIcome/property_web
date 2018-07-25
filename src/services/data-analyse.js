/**
 * Created by spring on 2018/7/20.
 */

import HttpClient from 'axios'
import {Message} from 'element-ui'
import Config from "../config";
const option = {baseURL: Config.WELL_URL_API};
export default {
    findList(params) {
        /* return HttpClient.get('waterLevel/findPage', Object.assign({params: params},option)).then(res => {
         if (res.data && res.data.data) {
         return res.data.data;
         } else {
         return {};
         }
         })*/
        return new Promise(function (resolve) {
            resolve ({list: [{type: 2}]})
        })
    },
}
