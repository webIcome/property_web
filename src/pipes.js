/**
 * Created by spring on 2018/1/19.
 */
import moment from "moment";
import Common from './constants/common';
export default {
    formDate,
    formTime

}
function formDate(date, pattern) {
    if (!date) return;
    if (!pattern) pattern = 'YYYY-MM-DD HH:mm:ss';
    return moment(date).format(pattern);
}
function formTime(date, pattern) {
    if (!date) return;
    if (!pattern) pattern = 'HH:mm:ss';
    return moment(Number(date)).format(pattern);
}
