/**
 *
 * Created by spring on 2018/7/24.
 */
import Cookie from "./cookie"
import Type from "../store/types"
export default {
    isEn() {
        return Cookie.getCookie(Type.LANGUAGE) == 'en'
    },
    getLanguage() {
        return Cookie.getCookie(Type.LANGUAGE)
    },
    getLanguageValue() {
        if (this.getLanguage() == 'en') {
            return 1
        } else {
            return 0
        }
    },
    setLanguage(value, time) {
        Cookie.setCookie(Type.LANGUAGE, value, time);
        location.reload()
    }
}