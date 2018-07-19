/**
 * Created by spring on 2018/4/8.
 */
import Cookie from '../utils/cookie'
import Type from "../store/types"
const zhCn = require("../language/zh-cn.json").constants
const enUs = require("../language/en-us.json").constants
let language = zhCn;
if (Cookie.getCookie(Type.LANGUAGE) == 'en') {
    language = enUs;
}
export default language