<template>
  <div class="oper-component">
    <div v-if="edit" class="icon-item"><span class="edit-icon" @click="showModal"></span></div>
    <div v-else class="icon-item" @click="showModal"><i class="el-icon-plus"></i>{{$t("common.add")}}</div>
    <el-dialog :title="title" :visible.sync="visible" center :width="'500px'">
      <el-form label-width="170px" :model="data" :rules="Rules" :ref="ref" class="el-form-default" :validate-on-rule-change="false">
        <el-form-item :label='$t("asset.door.device.sn")' prop="sn">
          <el-input v-model.trim="data.sn" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("asset.door.device.compName")' prop="deviceName">
          <el-input v-model.trim="data.deviceName" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("asset.door.device.assetName")' prop="assetManageName">
          <el-input v-model.trim="data.assetManageName" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("asset.door.device.address")' prop="address">
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
    import Service from '../../../services/sound-probe'
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