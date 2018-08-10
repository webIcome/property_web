<template>
  <div>
    <div class="control control-on">
      <el-button :disabled="!deviceIds.length" @click="showModal" class="control-btn">{{$t("control.searchStatus")}}</el-button>
    </div>
    <el-dialog :title='$t("dialog.title")' :visible.sync="visible" center width="600px">
      <el-form label-width="170px" :model="operData" :ref="ref" class="el-form-default" :validate-on-rule-change="false">
        <el-form-item :label='$t("control.collectLoopTime")' prop="searchValue">
          <el-radio v-model="operData.searchValue" :label='1'>{{$t("control.oneTime")}}</el-radio>
          <el-radio v-model="operData.searchValue" :label='2'>{{$t("control.twoTime")}}</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="controlDevice">{{$t("dialog.confirm")}}</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
    import Service from "../../../../services/meter-reading";
    export default {
        name: 'searchStatusComponent',
        components: {},
        data() {
            return {
                visible: false,
                operData: {searchValue: 1}
            }
        },
        props: {
            deviceIds: {
                default: function () {
                    return []
                }
            }
        },
        methods: {
            controlDevice: function () {
                this.operData.deviceIds = this.deviceIds.join(',');
                Service.controlSearchStatus(this.operData).then(res => {
                    this.hideModal();
                    this.initPaging();
                });
            },
            showModal() {
                this.visible = true;
            },
            hideModal: function () {
                this.visible = false;
            },
            initPaging() {
                this.$emit('initPaging')
            }
        }
    }
</script>
