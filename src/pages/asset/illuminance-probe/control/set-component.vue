<template>
  <div>
    <div class="control control-set">
      <span class="control-text">{{$t("control.set")}}</span>
      <el-select :disabled="!deviceIds.length" v-model='operData.operateType' :placeholder='$t("common.select")' @visible-change="showModal" clearable>
        <el-option v-for="item in setItems"
                   :label="item.text"
                   :value="item.value"
                   :key="item.value"></el-option>
      </el-select>
    </div>
    <el-dialog :title='$t("dialog.title")' :visible.sync="visible" center width="500px">
      <el-form label-width="170px" :model="operData" :ref="ref" :rules="Rules" class="el-form-default" :validate-on-rule-change="false">
        <template v-if="operData.operateType == 1">
          <el-form-item :label='$t("control.setHeartbeatCycle")' prop="operateValue">
            <el-input type="text" v-model.trim.number="operData.operateValue" clearable></el-input>
          </el-form-item>
        </template>
        <template v-else-if="operData.operateType == 2">
          <el-form-item :label='$t("control.setAlarmCycle")' prop="operateValue">
            <el-input type="text" v-model.trim.number="operData.operateValue" clearable></el-input>
          </el-form-item>
        </template>
        <template v-else-if="operData.operateType ==3">
          <el-form-item :label='$t("control.setAlarmThresholdMin")' prop="operateValueMin">
            <el-radio v-model="operData.min" :label='1'>{{$t("control.setValue")}}</el-radio>
            <el-radio v-model="operData.min" :label='0'>{{$t("control.none")}}</el-radio>
            <el-input v-if="operData.min == 1" type="text" v-model.trim.number="operData.operateValueMin" clearable></el-input>
          </el-form-item>
          <el-form-item :label='$t("control.setAlarmThresholdMax")' prop="operateValueMax">
            <el-radio v-model="operData.max" :label='1'>{{$t("control.setValue")}}</el-radio>
            <el-radio v-model="operData.max" :label='0'>{{$t("control.none")}}</el-radio>
            <el-input v-if="operData.max == 1" type="text" v-model.trim.number="operData.operateValueMax" clearable></el-input>
          </el-form-item>
        </template>
        <template v-else-if="operData.operateType == 4">
          <el-form-item :label='$t("control.setRelieveAlarmThreshold")' prop="operateValue">
            <el-input type="text" v-model.trim.number="operData.operateValue" clearable></el-input>
          </el-form-item>
        </template>
        <template v-else-if="operData.operateType == 7">
          <el-form-item :label='$t("control.setAlarmDuty")' prop="operateValue">
            <el-radio v-model="operData.operateValue" :label='1'>{{$t("control.open")}}</el-radio>
            <el-radio v-model="operData.operateValue" :label='0'>{{$t("control.close")}}</el-radio>
          </el-form-item>
        </template>
        <template v-else-if="operData.operateType == 8">
          <el-form-item :label='$t("control.setCollectCycle")' prop="operateValue">
            <el-input type="text" v-model.trim.number="operData.operateValue" clearable></el-input>
          </el-form-item>
        </template>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="controlDevice">{{$t("dialog.confirm")}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    import Service from "../../../../services/illuminance-probe";
    import controlSetMixin from "../../../../mixins/control-set-mixin"
    export default {
        mixins: [controlSetMixin],
        data() {
            return {
                setItems: [
                    {value: 1, text: this.$t("control.heartbeatCycle")},
                    {value: 2, text: this.$t("control.alarmCycle")},
                    {value: 3, text: this.$t("control.alarmThreshold")},
                    {value: 4, text: this.$t("control.relieveAlarmThreshold")},
                    {value: 5, text: this.$t("control.alarmDuty")},
                    {value: 6, text: this.$t("control.collectCycle")},
                ],
                operData: {}
            }
        },
        computed: {
            Rules: function () {
                let rules = {};
                if (this.operData.operateType == 3) {
                    rules.operateValue = [
                        {required: true, message: '请输入心跳包周期'},
                        {type: 'number', message: '范围1~24', min: 1, max: 24},
                        {pattern: /^[0-9]+$/, message: '必须为正整数'}
                    ]
                } else if (this.operData.operateType == 4) {
                    rules.operateValue = [
                        {required: true, message: '请输入告警周期'},
                        {type: 'number', message: '范围0~255', min: 0, max: 255},
                        {pattern: /^[0-9]+$/, message: '必须为正整数'}
                    ]
                } else if (this.operData.operateType == 5) {
                    if (this.operData.min == 1) {
                        rules.operateValueMin = [
                            {required: true, message: '请输入告警阈值下限'},
                            {type: 'number', message: '范围0~告警阈值上限', min: 0, max: this.operData.operateValueMax},
                            {pattern: /^[0-9]+$/, message: '必须为正整数'}
                        ]
                    }
                    if (this.operData.max == 1) {
                        rules.operateValueMax = [
                            {required: true, message: '请输入告警阈值上限'},
                            {type: 'number', message: '范围 告警阈值下限~16777215', min: this.operData.operateValueMin, max: 16777215},
                            {pattern: /^[0-9]+$/, message: '必须为正整数'}
                        ]
                    }

                } else if (this.operData.operateType == 6) {
                    rules.operateValue = [
                        {required: true, message: '请输入解除告警阈值'},
                        {type: 'number', message: '范围0~255', min: 0, max: 255},
                        {pattern: /^[0-9]+$/, message: '必须为正整数'}
                    ]
                } else if (this.operData.operateType == 7) {
                    rules.operateValue = [
                        {required: true, message: '请选择告警使能'},
                    ]
                } else if (this.operData.operateType == 8) {
                    rules.operateValue = [
                        {required: true, message: '请输入采集周期'},
                        {type: 'number', message: '范围0~65535', min: 0, max: 65535},
                        {pattern: /^[0-9]+$/, message: '必须为正整数'}
                    ]
                }
                return rules
            }
        },
        methods: {
            getControlFn(operateType) {
                let fn = '';
                switch (operateType) {
                    case 1:
                        fn = Service.controlSetHeartPeriod;
                        break;
                    case 2:
                        fn = Service.controlSetAlarmPeriod;
                        break;
                    case 3:
                        fn = Service.controlSetAlarmValue;
                        break;
                    case 4:
                        fn = Service.controlSetRelieveAlarmValue;
                        break;
                    case 5:
                        fn = Service.controlSetAlarmEnabled;
                        break;
                    case 6:
                        fn = Service.controlSetGatherPeriod;
                        break;
                }
                return fn
            },
            validateField(prop) {
                this.$refs[this.ref].validateField(prop, (errorMessage) => {

                })
            }
        },
        watch: {
            ['operData.min'](newVal, oldVal) {
                if (newVal) {
                    this.operData.operateValueMin = ''
                } else {
                    this.operData.operateValueMin = 16777215;
                    this.validateField('operateValueMin')
                }
            },
            ['operData.max'](newVal, oldVal) {
                if (newVal) {
                    this.operData.operateValueMax = ''
                } else {
                    this.operData.operateValueMax = 16777215
                    this.validateField('operateValueMax')
                }
            },
            ['operData.operateType'](newVal) {
                if (newVal == 5){
                    this.$set(this.operData, 'min', 1)
                    this.$set(this.operData, 'max', 1)
                }
            }
        }
    }
</script>
