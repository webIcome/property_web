/**
 * Created by spring on 2018/1/19.
 */
import moment from "moment";
import Common from './constants/common';
export default {
    formDate,
    formTime,
    alarmTypeNameConverter,
    alarmDutyNameConverter,
    temperatureHumidityAlarmDutyNameConverter,
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
function alarmTypeNameConverter(value) {
    let name = value;
    Common.alarmType.forEach(item => {
        if (value == item.value) {
            name = item.text;
        }
    });
    return name;
}
function alarmDutyNameConverter(value) {
    let name = value;
    Common.alarmDuty.forEach(item => {
        if (value == item.value) {
            name = item.text;
        }
    });
    return name;
}
function temperatureHumidityAlarmDutyNameConverter() {
    let name = value;
    Common.temperatureHumidityAlarmDuty.forEach(item => {
        if (value == item.value) {
            name = item.text;
        }
    });
    return name;
}
