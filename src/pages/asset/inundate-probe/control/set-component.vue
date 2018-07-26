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
          <el-form-item :label='$t("control.setAlarmCycle")' prop="operateValue">
            <el-input type="text" v-model.trim.number="operData.operateValue" clearable></el-input>
          </el-form-item>
        </template>
        <template v-else-if="operData.operateType == 2">
          <el-form-item :label='$t("control.setAlarmDuty")' prop="operateValue">
            <el-radio v-model="operData.operateValue" :label='1'>{{$t("control.open")}}</el-radio>
            <el-radio v-model="operData.operateValue" :label='0'>{{$t("control.close")}}</el-radio>
          </el-form-item>
        </template>
        <template v-else-if="operData.operateType == 3">
          <el-form-item :label='$t("control.setCollectCycle")' prop="operateValue">
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
    import Service from "../../../../services/inundate-probe";
    import controlSetMixin from "../../../../mixins/control-set-mixin"
    export default {
        mixins: [controlSetMixin],
        data() {
            return {
                setItems: [
                    {value: 1, text: this.$t("control.alarmCycle")},
                    {value: 2, text: this.$t("control.alarmDuty")},
                    {value: 3, text: this.$t("control.collectCycle")},
                ],
                operData: {}
            }
        },
        computed: {
            Rules: function () {
                let rules = {};
                if (this.operData.operateType == 1) {
                    rules.operateValue = [
                        {required: true, message: this.$t("rules.require")},
                        {type: 'number', message: this.$t("rules.range") + '0~255', min: 1, max: 255},
                        {pattern: /^[0-9]+$/, message: this.$t("rules.positiveInteger")}
                    ]
                } else if (this.operData.operateType == 2) {
                    rules.operateValue = [
                        {required: true, message: this.$t("rules.require")},
                    ]
                } else if (this.operData.operateType == 3) {

                    rules.operateValue = [
                        {required: true, message: this.$t("rules.require")},
                        {type: 'number', message: this.$t("rules.range") + '0~65535', min: 0, max: 65535},
                        {pattern: /^[0-9]+$/, message: this.$t("rules.positiveInteger")}
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
                        fn = Service.controlSetAlarmPeriod;
                        break;
                    case 2:
                        fn = Service.controlSetAlarmEnabled;
                        break;
                    case 3:
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
    }
</script>
