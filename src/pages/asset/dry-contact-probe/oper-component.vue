<template>
  <div class="oper-component">
    <div v-if="edit" class="icon-item"><span class="edit-icon" @click="showModal"></span></div>
    <div v-else class="icon-item" @click="showModal"><i class="el-icon-plus"></i>{{$t("common.add")}}</div>
    <el-dialog :title="title" :visible.sync="visible" center :width="'500px'">
      <el-form label-width="120px" :model="data" :rules="Rules" :ref="ref" class="el-form-default" :validate-on-rule-change="false">
        <el-form-item :label='$t("asset.dryContactProbe.device.sn")' prop="sn">
          <el-input v-model.trim="data.sn" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("asset.dryContactProbe.device.deviceModel")' prop="deviceModel">
          <el-select v-model="data.deviceModel" :placeholder='$t("common.select")' clearable style="width: 100%;">
            <el-option v-for="type in deviceModel" :value="type.value" :key="type.value" :label="type.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label='$t("asset.dryContactProbe.device.alarmType")' prop="alarmType">
          <el-select v-model="data.alarmType" :placeholder='$t("common.select")' clearable style="width: 100%;">
            <el-option v-for="type in alarmType" :value="type.value" :key="type.value" :label="type.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label='$t("asset.dryContactProbe.device.compName")' prop="projectIds">
          <select-projects-component v-model="data.projectIds" style="width: 100%"></select-projects-component>
        </el-form-item>
        <el-form-item :label='$t("asset.dryContactProbe.device.assetName")' prop="assetManageId">
          <select-asset-dialog-component v-model="data.assetManageId" style="width: 100%" :reset=visible :assetManageName=data.assetManageName></select-asset-dialog-component>
        </el-form-item>
        <el-form-item :label='$t("asset.dryContactProbe.device.address")' prop="address">
          <el-input v-model.trim="data.address" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
       <el-button type="primary" @click="operate">{{$t("dialog.confirm")}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
    import Service from '../../../services/dry-contact-probe'
    import CommonConstant from "../../../constants/common";
    import operMixin from "../oper-mixin"
    export default {
        name: 'operComponent',
        mixins: [operMixin],
        data() {
            return {
                data: {
                    deviceModel: 'WFZ1ZT',
                    alarmType: 0
                },
                service: Service,
                deviceModel: CommonConstant.dryContactProbe,
            }
        },
        methods: {
            resetData() {
                this.data = {
                    deviceModel: 'WFZ1ZT',
                    alarmType: 0
                }
            }
        }
    }
</script>