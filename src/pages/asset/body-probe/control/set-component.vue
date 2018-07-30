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
          <el-form-item :label='$t("control.setSecond")' prop="operateValue">
            <el-input type="text" v-model.trim.number="operData.operateValue" clearable></el-input>
          </el-form-item>
        </template>
        <template v-else-if="operData.operateType == 2">
          <el-form-item :label='$t("control.setSecond")' prop="value1">
            <el-input type="text" v-model.trim.number="operData.value1" clearable></el-input>
          </el-form-item>
          <el-form-item :label='$t("control.setTime")' prop="value2">
            <el-input type="text" v-model.trim.number="operData.value2" clearable></el-input>
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
    import Service from "../../../../services/body-probe";
    import controlSetMixin from "../../../../mixins/control-set-mixin"
    export default {
        mixins: [controlSetMixin],
        data() {
            return {
                setItems: [
                    {value: 1, text: this.$t("control.noOneJudge")},
                    {value: 2, text: this.$t("control.peopleJudge")},
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
                        {type: 'number', message: this.$t("rules.range") + '1~24', min: 1, max: 24},
                        {pattern: /^[0-9]+$/, message: this.$t("rules.positiveInteger")}
                    ]
                } else if (this.operData.operateType == 2) {
                    rules = {
                        value1: [
                            {required: true, message: this.$t("rules.require")},
                            {type: 'number', message: this.$t("rules.range") + '0~255', min:0, max: 255},
                            {pattern: /^[0-9]+$/, message: this.$t("rules.positiveInteger")}
                        ],
                        value2: [
                            {required: true, message: this.$t("rules.require")},
                            {type: 'number', message: this.$t("rules.range") + '0~255', min:0, max: 255},
                            {pattern: /^[0-9]+$/, message: this.$t("rules.positiveInteger")}
                        ]
                    }
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
                        fn = Service.controlSetAlarmValue;
                        break;
                    case 3:
                        fn = Service.controlSetAlarmEnabled;
                        break;
                }
                return fn
            },
        },
    }
</script>
