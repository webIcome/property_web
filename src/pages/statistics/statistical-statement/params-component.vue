<template>
  <div class="statistics-params">
    <el-form class="default-form" label-width="100px" :model="params" :rules="Rules" ref="search"  :validate-on-rule-change="false">
      <div class="params-project">
        <div class="form-group">
          <label>{{$t("statistics.statisticalStatement.project")}}</label>
          <select-projects-component v-model="params.projectIds"></select-projects-component>
        </div>
      </div>
      <div class="params-others">
        <el-form-item :label='$t("statistics.statisticalStatement.data")' prop="data">
          <el-radio-group v-model="params.data">
            <el-radio :label="1">{{$t("statistics.statisticalStatement.standingBook")}}</el-radio>
            <el-radio :label="2">{{$t("statistics.statisticalStatement.asset")}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label='$t("statistics.statisticalStatement.method")' prop="mode">
          <el-radio-group v-model="params.mode">
            <el-radio :label="1">{{$t("statistics.statisticalStatement.system")}}</el-radio>
            <el-radio :label="2">{{$t("statistics.statisticalStatement.alarm")}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label='$t("statistics.statisticalStatement.type")' prop="type">
          <el-radio-group v-model="params.type">
            <el-radio :label="1">{{$t("statistics.statisticalStatement.current")}}</el-radio>
            <el-radio :label="2">{{$t("statistics.statisticalStatement.history")}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label='$t("statistics.statisticalStatement.dimensionality")' prop="dimension">
          <el-radio-group :disabled="isDisabled" v-model="params.dimension" class="small">
            <el-radio :label="3">{{$t("statistics.statisticalStatement.day")}}</el-radio>
            <el-radio :label="2">{{$t("statistics.statisticalStatement.month")}}</el-radio>
            <el-radio :label="1">{{$t("statistics.statisticalStatement.year")}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label='$t("statistics.statisticalStatement.scope")'>
          <el-row type="flex" justify="start" class="child">
            <el-col>
              <el-form-item :label='$t("statistics.statisticalStatement.startTime")' prop="startTime">
                <el-date-picker :disabled="isDisabled" v-model="params.startTime" :type="dateType" :value-format="dateFormat"
                                :placeholder='$t("common.select")' :picker-options="startTimeOptions"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item :label='$t("statistics.statisticalStatement.endTime")' prop="endTime">
                <el-date-picker :disabled="isDisabled" v-model="params.endTime" :type="dateType" :value-format="dateFormat"
                                :placeholder='$t("common.select")'  :picker-options="endTimeOptions"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>

      </div>
      <div @click="confirm" class="default-btn" style="align-self: flex-end;margin-left: 40px">{{$t("dialog.confirm")}}</div>
    </el-form>
  </div>
</template>
<script>
  import moment from "moment"
    export default {
        name: 'paramsComponent',
        data() {
            return {
                params: {
                    data: 1,
                    type: 1,
                    mode: 1,
                    dimension: 3,
                    startTime: '',
                    endTime: ''
                },
            }
        },
        created(){
        },
        computed: {
            isDisabled: function () {
                return this.params.type != 2;
            },
            startTimeOptions: function () {
                let endTime = this.params.endTime;
                if (endTime) {
                    if (this.params.dimension == 3) {
                        return {
                            disabledDate(time) {
                                return moment(time, "YYYYMMDD") >= moment(endTime, "YYYYMMDD")
                            }
                        }
                    } else if (this.params.dimension == 2) {
                        return {
                            disabledDate(time) {
                                return moment(time, 'YYYYMM').startOf('month') >= moment(endTime, "YYYYMM").startOf('month')
                            }
                        }
                    } else {
                        return {
                            disabledDate(time) {
                                return moment(time, 'YYYY').startOf('year') >= moment(endTime, 'YYYY').startOf('year');
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
                let startTime = this.params.startTime;
                if (startTime) {
                    if (this.params.dimension == 3) {
                        return {
                            disabledDate(time) {
                                return time.getTime() <= moment(startTime, "YYYYMMDD")
                            }
                        }
                    } else if (this.params.dimension == 2) {
                        return {
                            disabledDate(time) {
                                return moment(time, 'YYYYMM').startOf('month') <= moment(startTime, "YYYYMM").startOf('month')
                            }
                        }
                    } else {
                        return {
                            disabledDate(time) {
                                return moment(time, 'YYYY').startOf('year') <= moment(startTime, 'YYYY').startOf('year');
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
                if (this.params.dimension == 3) {
                    return 'yyyyMMdd'
                } else if (this.params.dimension == 2) {
                    return 'yyyyMM'
                } else {
                    return 'yyyy'
                }
            },
            dateType: function () {
                let type;
                switch (this.params.dimension) {
                    case 1:
                        type = 'year';
                        break;
                    case 2:
                        type = 'month';
                        break;
                    case 3:
                        type = 'date';
                        break;
                    default:
                        type = 'date';
                        break;
                }
                return type;
            },
            Rules: function () {
                let rules = {

                };
                if (this.params.type == 2) {
                    rules.startTime = [
                        {required: true, message: this.$t("rules.require"), trigger: ['change', 'blur']}
                    ];
                    rules.endTime = [
                        {required: true, message: this.$t("rules.require"), trigger: ['change', 'blur']}
                    ];
                }
                return rules;
            }
        },
        mounted() {
            this.confirm()
        },
        methods: {
            confirm() {
                this.$refs.search.validate(valid => {
                    if (valid) {
                        this.$emit('input', JSON.parse(JSON.stringify(this.params)))
                    }
                })
            },
            clearValidate() {
                if (this.$refs.search) this.$refs.search.clearValidate();
            },
        },
        watch: {
            ['params.dimension']: function () {
                this.params.startTime = '';
                this.params.endTime = '';
            },
            ['params.type']: function () {
                this.clearValidate()
            }
        }
    }
</script>
<style lang="less" scoped>
  .statistics-params {
    .default-form {
      display: flex;
      .el-form-item {
        .el-form-item__label {
          font-weight: bold;
          color: #323232;
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
<style lang="less">
  .statistics-params {
    label{
      margin-bottom: 0;
    }
    .default-form {
      .el-form-item {
        margin-bottom: 0px;
        .el-form-item__label {
          font-weight: bold;
          color: #323232;
          padding-right: 30px;
        }
        .child {
          margin-left: -20px;
          .el-form-item__label {
            font-weight: normal;
            color: #787878;
            text-align: center;
            padding-right: 0;
          }
        }
      }
    }
  }
</style>