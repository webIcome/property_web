/**
 * Created by spring on 2018/4/8.
 */
import Language from '../utils/language'
const zhCn = require("../language/zh-cn.json").constants
const enUs = require("../language/en-us.json").constants
let language = zhCn;
if (Language.isEn()) {
    language = enUs;
}
export default language