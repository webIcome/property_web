<template>
  <div class="statistics-params">
    <form class="default-form">
      <div class="params-project">
        <div class="form-group">
          <label>{{$t("statistics.statisticalStatement.project")}}</label>
          <el-select v-model='params.projects' :placeholder='$t("common.select")' clearable>
            <el-option v-for="item in projects"
                       :label="item.text"
                       :value="item.value"
                       :key="item.value"></el-option>
          </el-select>
        </div>
      </div>
      <div class="params-others">
        <div class="form-group">
          <label>{{$t("statistics.statisticalStatement.data")}}</label>
          <el-radio-group v-model="params.data">
            <el-radio :label="1">{{$t("statistics.statisticalStatement.standingBook")}}</el-radio>
            <el-radio :label="2">{{$t("statistics.statisticalStatement.asset")}}</el-radio>
          </el-radio-group>
        </div>
        <div class="form-group">
          <label>{{$t("statistics.statisticalStatement.data")}}</label>
          <el-radio-group v-model="params.data">
            <el-radio :label="1">{{$t("statistics.statisticalStatement.standingBook")}}</el-radio>
            <el-radio :label="2">{{$t("statistics.statisticalStatement.asset")}}</el-radio>
          </el-radio-group>
        </div>
        <div class="form-group">
          <label>{{$t("statistics.statisticalStatement.method")}}</label>
          <el-radio-group v-model="params.method">
            <el-radio :label="1">{{$t("statistics.statisticalStatement.system")}}</el-radio>
            <el-radio :label="2">{{$t("statistics.statisticalStatement.alarm")}}</el-radio>
          </el-radio-group>
        </div>
        <div class="form-group">
          <label>{{$t("statistics.statisticalStatement.type")}}</label>
          <el-radio-group v-model="params.type">
            <el-radio :label="1">{{$t("statistics.statisticalStatement.current")}}</el-radio>
            <el-radio :label="2">{{$t("statistics.statisticalStatement.history")}}</el-radio>
          </el-radio-group>
        </div>
        <div class="form-group">
          <label>{{$t("statistics.statisticalStatement.dimensionality")}}</label>
          <el-radio-group :disabled="isDisabled" v-model="params.timetype" class="small">
            <el-radio :label="1">{{$t("statistics.statisticalStatement.day")}}</el-radio>
            <el-radio :label="2">{{$t("statistics.statisticalStatement.month")}}</el-radio>
            <el-radio :label="3">{{$t("statistics.statisticalStatement.year")}}</el-radio>
          </el-radio-group>
        </div>
        <div class="form-group">
          <label>{{$t("statistics.statisticalStatement.scope")}}</label>
          <span style="margin-right: 10px">{{$t("statistics.statisticalStatement.startTime")}}</span>
          <el-date-picker :disabled="isDisabled" v-model="params.starttime" :type="dateType" :value-format="dateFormat"
                          :placeholder='$t("common.select")' :picker-options="startTimeOptions"></el-date-picker>
          <span  style="margin-right: 10px; margin-left: 10px">{{$t("statistics.statisticalStatement.endTime")}}</span>
          <el-date-picker :disabled="isDisabled" v-model="params.endtime" :type="dateType" :value-format="dateFormat"
                          :placeholder='$t("common.select")'  :picker-options="endTimeOptions"></el-date-picker>
        </div>
      </div>
      <div @click="confirm" class="form-group default-btn" style="align-self: flex-end;margin-left: 40px">{{$t("dialog.confirm")}}</div>
    </form>
  </div>
</template>
<script>
  import moment from "moment"
    export default {
        name: 'paramsComponent',
        data() {
            return {
                params: {
                    timetype: '',
                    starttime: '',
                    endtime: ''
                },
                projects: []
            }
        },
        created(){
        },
        computed: {
            isDisabled: function () {
                return this.params.type == 2;
            },
            startTimeOptions: function () {
                let endTime = this.params.endtime;
                if (endTime) {
                    if (this.params.timetype == 1) {
                        return {
                            disabledDate(time) {
                                return time.getTime() > moment(endTime, "YYYYMMDD") || time.getTime() < moment(endTime, "YYYYMMDD").startOf('month');
                            }
                        }
                    } else if (this.params.timetype == 2) {
                        return {
                            disabledDate(time) {
                                return time.getTime() > moment(endTime, "YYYYMM").startOf('month') || time.getTime() < moment(endTime,"YYYYMM").startOf('year');
                            }
                        }
                    } else {
                        return {
                            disabledDate(time) {
                                return time.getTime() > moment(endTime, 'YYYY');
                            }
                        }
                    }
                }else {
                    return {
                        disabledDate(time) {
                            return false;
                        }
                    }
                }

            },
            endTimeOptions: function () {
                let startTime = this.params.starttime;
                if (startTime) {
                    if (this.params.timetype == 1) {
                        return {
                            disabledDate(time) {
                                return time.getTime() < moment(startTime, "YYYYMMDD") || time.getTime() > moment(startTime, "YYYYMMDD").endOf('month');
                            }
                        }
                    } else if (this.params.timetype == 2) {
                        return {
                            disabledDate(time) {
                                return time.getTime() < moment(startTime, "YYYYMM").startOf('month') || time.getTime() >= moment(startTime, "YYYYMM").endOf('year');
                            }
                        }
                    } else {
                        return {
                            disabledDate(time) {
                                return moment(time, 'YYYY') < moment(startTime, 'YYYY');
                            }
                        }
                    }
                }else {
                    return {
                        disabledDate(time) {
                            return false;
                        }
                    }
                }

            },
            dateFormat: function () {
                if (this.params.timetype == 1) {
                    return 'yyyyMMdd'
                } else if (this.params.timetype == 2) {
                    return 'yyyyMM'
                } else {
                    return 'yyyy'
                }
            },
            dateType: function () {
                let type;
                switch (this.params.timetype) {
                    case 1:
                        type = 'date';
                        break;
                    case 2:
                        type = 'month';
                        break;
                    case 3:
                        type = 'year';
                        break;
                    default:
                        type = 'date';
                        break;
                }
                return type;
            }
        },
        methods: {
            confirm() {
                this.$emit('input', this.params)
            }
        },
        watch: {
            ['params.timetype']: function () {
                this.params.starttime = '';
                this.params.endtime = '';
            }
        }
    }
</script>
<style lang="less" scoped>
  .statistics-params {
    .default-form {
      display: flex;
      .form-group {
        label {
          font-weight: bold;
          color: #323232;
          margin-right: 30px;
        }
        .el-radio-group {
          &.small {
            label {
              width: 30px;
            }
          }
          label {
            color: #787878;
            font-weight: normal;
            width: 80px;
            .el-radio__input {
              &.is-checked {
                .el-radio__inner {
                  border-color: #fff;
                  background: #fff;
                  &::after {
                    background-color: #409EFF;
                  }
                }
              }
            }
          }
        }
      }

    }
    .params-project {
      width: 30%;
    }
    .params-others {

    }
    .default-btn {
      background: #eef1fc;
      padding: 9px 14px;
      color: #5181ed;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      &:hover {
        transform: scale(1.05);
      }
    }
  }
</style>