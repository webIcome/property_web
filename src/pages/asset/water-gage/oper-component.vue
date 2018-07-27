<template>
  <div class="oper-component">
    <div v-if="edit" class="icon-item"><span class="edit-icon" @click="showModal"></span></div>
    <div v-else class="icon-item" @click="showModal"><i class="el-icon-plus"></i>{{$t("common.add")}}</div>
    <el-dialog :title="title" :visible.sync="visible" center :width="'500px'">
      <el-form label-width="170px" :model="data" :rules="Rules" :ref="ref" class="el-form-default" :validate-on-rule-change="false">
        <el-form-item :label='$t("asset.waterGage.device.sn")' prop="deviceName">
          <el-input v-model.trim="data.deviceName" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("asset.waterGage.device.deviceModel")' prop="deviceModel">
          <el-input v-model.trim="data.deviceName" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("asset.waterGage.device.compName")' prop="deviceName">
          <el-input v-model.trim="data.deviceName" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("asset.waterGage.device.assetName")' prop="deviceName">
          <el-input v-model.trim="data.deviceName" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("asset.waterGage.device.address")' prop="deviceName">
          <el-input v-model.trim="data.deviceName" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
       <el-button type="primary" @click="operate">{{$t("dialog.confirm")}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
    import Service from '../../../services/water-gage'
    import CommonConstant from "../../../constants/common";
    import operMixin from "../oper-mixin"
    export default {
        name: 'operComponent',
        mixins: [operMixin],
        data() {
            return {
                data: {},
                service: Service,
                Rules: [

                ]
            }
        },
        methods: {
        }
    }
</script>