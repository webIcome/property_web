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
          <el-form-item :label='$t("control.setAlarmThresholdMin") + "/m"' prop="operateValueMin">
            <el-radio v-model="operData.min" :label='1'>{{$t("control.setValue")}}</el-radio>
            <el-radio v-model="operData.min" :label='0'>{{$t("control.none")}}</el-radio>
            <el-input v-if="operData.min == 1" type="text" v-model.trim.number="operData.operateValueMin" clearable></el-input>
          </el-form-item>
          <el-form-item :label='$t("control.setAlarmThresholdMax") + "/m"' prop="operateValueMax">
            <el-radio v-model="operData.max" :label='1'>{{$t("control.setValue")}}</el-radio>
            <el-radio v-model="operData.max" :label='0'>{{$t("control.none")}}</el-radio>
            <el-input v-if="operData.max == 1" type="text" v-model.trim.number="operData.operateValueMax" clearable></el-input>
          </el-form-item>
        </template>
        <template v-else-if="operData.operateType == 4">
          <el-form-item :label='$t("control.setRelieveAlarmThreshold") + "/0.1lux"' prop="operateValue">
            <el-input type="text" v-model.trim.number="operData.operateValue" clearable></el-input>
          </el-form-item>
        </template>
        <template v-else-if="operData.operateType == 5">
          <el-form-item :label='$t("control.setAlarmDuty")' prop="operateValue">
            <el-radio v-model="operData.operateValue" :label='1'>{{$t("control.open")}}</el-radio>
            <el-radio v-model="operData.operateValue" :label='0'>{{$t("control.close")}}</el-radio>
          </el-form-item>
        </template>
        <template v-else-if="operData.operateType == 6">
          <el-form-item :label='$t("control.setCollectCycle")' prop="operateValue">
            <el-input type="text" v-model.trim.number="operData.operateValue" clearable></el-input>
          </el-form-item>
        </template>
        <template v-else-if="operData.operateType == 7">
          <el-form-item :label='$t("control.setRange")' prop="operateValue">
            <el-input type="text" v-model.trim.number="operData.operateValue" clearable></el-input>
          </el-form-item>
        </template>
        <template v-else-if="operData.operateType == 8">
          <el-form-item :label='$t("control.setStandValue")' prop="operateValue">
            <el-input type="text" v-model.trim.number="operData.operateValue" clearable></el-input>
          </el-form-item>
        </template>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="control">{{$t("dialog.confirm")}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    import Service from "../../../../services/water-level";
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
                    {value: 7, text: this.$t("control.range")},
                    {value: 8, text: this.$t("control.standValue")},
                ],
                operData: {operateType: '',operateValueMin: '',operateValueMax: ''}
            }
        },
        computed: {
            Rules: function () {
                let rules = {};
                if (this.operData.operateType == 1) {
                    rules.operateValue = [
                        {required: true, message: this.$t("rules.require")},
                        {type: 'number', message: this.$t("rules.range") + '1~24', min: 1, max: 24},
                        {pattern: /^[0-9]+$/, message: this.$t("rules.positiveInteger")}
                    ]
                } else if (this.operData.operateType == 2) {
                    rules.operateValue = [
                        {required: true, message: this.$t("rules.require")},
                        {type: 'number', message: this.$t("rules.range") + '0~255', min: 0, max: 255},
                        {pattern: /^[0-9]+$/, message: this.$t("rules.positiveInteger")}
                    ]
                } else if (this.operData.operateType == 3) {
                    if (this.operData.min == 1) {
                        rules.operateValueMin = [
                            {required: true, message: this.$t("rules.require")},
                            {type: 'number', message: this.$t("rules.range") + '0~' + this.$t("control.setAlarmThresholdMax"), min: 0, max: this.operData.operateValueMax},
                            {pattern: /^[0-9]+$/, message: this.$t("rules.positiveInteger")}
                        ]
                    }
                    if (this.operData.max == 1) {
                        rules.operateValueMax = [
                            {required: true, message: this.$t("rules.require")},
                            {type: 'number', message: this.$t("rules.range") + this.$t("control.setAlarmThresholdMin") + '~16777215', min: this.operData.operateValueMin, max: 65535},
                            {pattern: /^[0-9]+$/, message: this.$t("rules.positiveInteger")}
                        ]
                    }

                } else if (this.operData.operateType == 4) {
                    rules.operateValue = [
                        {required: true, message: this.$t("rules.require")},
                        {type: 'number', message: this.$t("rules.range") + '0~255', min: 0, max: 255},
                        {pattern: /^[0-9]+$/, message: this.$t("rules.positiveInteger")}
                    ]
                } else if (this.operData.operateType == 5) {
                    rules.operateValue = [
                        {required: true, message: this.$t("rules.require")},
                    ]
                } else if (this.operData.operateType == 6) {
                    rules.operateValue = [
                        {required: true, message: this.$t("rules.require")},
                        {type: 'number', message: this.$t("rules.range") + '0~65535', min: 0, max: 65535},
                        {pattern: /^[0-9]+$/, message: this.$t("rules.positiveInteger")}
                    ]
                } else if (this.operData.operateType == 7) {
                    rules.operateValue = [
                        {required: true, message: this.$t("rules.require")},
                        {type: 'number', message: this.$t("rules.range") + '0~255', min: 0, max: 255},
                        {pattern: /^[0-9]+$/, message: this.$t("rules.positiveInteger")}
                    ]
                } else if (this.operData.operateType == 8) {
                    rules.operateValue = [
                        {required: true, message: this.$t("rules.require")},
                        {type: 'number', message: this.$t("rules.range") + '-127~127', min: -127, max: 127},
                        {pattern: /^[-+]?[0-9]+$/, message: this.$t("rules.integer")}
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
                    case 7:
                        fn = Service.controlSetRange;
                        break;
                    case 8:
                        fn = Service.controlSetResetData;
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
                    this.operData.operateValueMin = 65535;
                    this.validateField('operateValueMin')
                }
            },
            ['operData.max'](newVal, oldVal) {
                if (newVal) {
                    this.operData.operateValueMax = ''
                } else {
                    this.operData.operateValueMax = 65535
                    this.validateField('operateValueMax')
                }
            },
            ['operData.operateType'](newVal) {
                if (newVal == 3){
                    this.$set(this.operData, 'min', 1)
                    this.$set(this.operData, 'max', 1)
                }
            }
        }
    }
</script>
