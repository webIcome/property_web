<template>
  <div>
    <div class="control control-search">
      <span class="control-text">{{$t("control.search")}}</span>
      <el-select :disabled="!deviceIds.length" v-model='operateType' :placeholder='$t("common.select")' @visible-change="showModal" clearable>
        <el-option v-for="item in searchItems"
                   :label="item.text"
                   :value="item.value"
                   :key="item.value"></el-option>
      </el-select>
    </div>
    <el-dialog :title='$t("dialog.title")' :visible.sync="visible" center width="400px">
      <div class="text-center">
        <div class="dialog-warning"></div>
      </div>
      <p v-if="operateType == 1" class="title">{{$t("control.heartbeatCycleTip")}}</p>
      <p v-else-if="operateType == 2" class="title">{{$t("control.alarmCycleTip")}}</p>
      <p v-else-if="operateType == 3" class="title">{{$t("control.alarmThresholdTip")}}</p>
      <p v-else-if="operateType == 4" class="title">{{$t("control.relieveAlarmThresholdTip")}}</p>
      <p v-else-if="operateType == 5" class="title">{{$t("control.collectCycleTip")}}</p>
      <p v-else-if="operateType == 6" class="title">{{$t("control.rangeTip")}}</p>
      <p v-else-if="operateType == 7" class="title">{{$t("control.standValueTip")}}</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="controlDevice">{{$t("dialog.confirm")}}</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
    import Service from "../../../../services/flow-probe";
    import ControlSearchMixin from "../../../../mixins/control-search-mixin"
    export default {
        mixins: [ControlSearchMixin],
        data() {
            return {
                searchItems: [
                    {value: 1, text: this.$t("control.heartbeatCycle")},
                    {value: 2, text: this.$t("control.alarmCycle")},
                    {value: 3, text: this.$t("control.alarmThreshold")},
                    {value: 4, text: this.$t("control.relieveAlarmThreshold")},
                    {value: 5, text: this.$t("control.collectCycle")},
                    {value: 6, text: this.$t("control.range")},
                    {value: 7, text: this.$t("control.standValue")},
                ],
            }
        },
        methods: {
            getControlFn(operateType) {
                let fn = '';
                switch (operateType) {
                    case 1:
                        fn = Service.controlSearchHeartPeriod;
                        break;
                    case 2:
                        fn = Service.controlSearchAlarmPeriod;
                        break;
                    case 3:
                        fn = Service.controlSearchAlarmValue;
                        break;
                    case 4:
                        fn = Service.controlSearchRelieveAlarmValue;
                        break;
                    case 5:
                        fn = Service.controlSearchGatherPeriod;
                        break;
                    case 6:
                        fn = Service.controlSearchRange;
                        break;
                    case 7:
                        fn = Service.controlSearchResetData;
                        break;
                }
                return fn
            }
        },
    }
</script>
