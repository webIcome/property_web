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
          <el-radio-group v-model="params.data">
            <el-radio :label="1">{{$t("statistics.statisticalStatement.system")}}</el-radio>
            <el-radio :label="2">{{$t("statistics.statisticalStatement.alarm")}}</el-radio>
          </el-radio-group>
        </div>
        <div class="form-group">
          <label>{{$t("statistics.statisticalStatement.type")}}</label>
          <el-radio-group v-model="params.data">
            <el-radio :label="1">{{$t("statistics.statisticalStatement.current")}}</el-radio>
            <el-radio :label="2">{{$t("statistics.statisticalStatement.history")}}</el-radio>
          </el-radio-group>
        </div>
        <div class="form-group">
          <label>{{$t("statistics.statisticalStatement.dimensionality")}}</label>
          <el-radio-group v-model="params.data" class="small">
            <el-radio :label="1">{{$t("statistics.statisticalStatement.day")}}</el-radio>
            <el-radio :label="2">{{$t("statistics.statisticalStatement.month")}}</el-radio>
            <el-radio :label="2">{{$t("statistics.statisticalStatement.year")}}</el-radio>
          </el-radio-group>
        </div>
        <div class="form-group">
          <label>{{$t("statistics.statisticalStatement.scope")}}</label>
          <span style="margin-right: 10px">{{$t("statistics.statisticalStatement.startTime")}}</span>
          <el-date-picker id="date-start" v-model="params.operationtimelow" type="date" :value-format="'yyyy-MM-dd'"
                          :placeholder='$t("common.select")'></el-date-picker>
          <span  style="margin-right: 10px; margin-left: 10px">{{$t("statistics.statisticalStatement.endTime")}}</span>
          <el-date-picker id="date-start" v-model="params.operationtimelow" type="date" :value-format="'yyyy-MM-dd'"
                          :placeholder='$t("common.select")'></el-date-picker>
        </div>
      </div>
      <div @click="confirm" class="form-group default-btn" style="align-self: flex-end;margin-left: 40px">{{$t("dialog.confirm")}}</div>
    </form>
  </div>
</template>
<script>
    export default {
        name: 'paramsComponent',
        data() {
            return {
                params: {},
                projects: []
            }
        },
        created(){
        },
        methods: {
            confirm() {
                this.$emit('input', this.params)
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