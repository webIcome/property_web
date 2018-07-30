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
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="control">{{$t("dialog.confirm")}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    import Service from "../../../../services/door";
    import controlSetMixin from "../../../../mixins/control-set-mixin"
    export default {
        mixins: [controlSetMixin],
        data() {
            return {
                setItems: [
                    {value: 1, text: this.$t("control.heartbeatCycle")},
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
                }
                return fn
            },
        },
    }
</script>
