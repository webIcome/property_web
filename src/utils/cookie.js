/**
 * Created by spring on 2018/7/19.
 */
export default {
    getCookie(name) {
        let reg = RegExp(name + '=([^;]+)');
        let arr = document.cookie.match(reg);
        if (arr) {
            return arr[1];
        } else {
            return '';
        }
    },
    setCookie(name, value, day) {
        let date = new Date();
        date.setDate(date.getDate() + day);
        document.cookie = name + '=' + value + ';expires=' + date;
    },
    delCookie(name) {
        this.setCookie(name, null,-1);
    }
}