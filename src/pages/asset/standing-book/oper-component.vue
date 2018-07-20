<template>
  <div class="oper-component">
    <div v-if="edit" class="icon-item"><span class="edit-icon" @click="showModal"></span></div>
    <div v-else class="icon-item" @click="showModal"><i class="el-icon-plus"></i>{{$t("common.add")}}</div>
    <el-dialog :title="title" :visible.sync="visible" center :width="'600px'">
      <el-form label-width="170px" :model="data" :rules="Rules" :ref="ref" class="el-form-default" :validate-on-rule-change="false">
        <el-form-item :label='$t("asset.standingBook.device.assetCode")' prop="deviceName">
          <el-input v-model.trim="data.deviceName" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("asset.standingBook.device.assetName")' prop="deviceName">
          <el-input v-model.trim="data.deviceName" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("asset.standingBook.device.address")' prop="deviceName">
          <el-input v-model.trim="data.deviceName" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("asset.standingBook.device.manufacturer")' prop="deviceName">
          <el-input v-model.trim="data.deviceName" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("asset.standingBook.device.model")' prop="deviceName">
          <el-input v-model.trim="data.deviceName" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("asset.standingBook.device.equipment")' prop="deviceName">
          <el-input v-model.trim="data.deviceName" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("asset.standingBook.device.status")' prop="deviceName">
          <el-input v-model.trim="data.deviceName" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("asset.standingBook.device.trademark")' prop="deviceName">
          <el-input v-model.trim="data.deviceName" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("asset.standingBook.device.productionTime")' prop="deviceName">
          <el-input v-model.trim="data.deviceName" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("asset.standingBook.device.useTime")' prop="deviceName">
          <el-input v-model.trim="data.deviceName" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("asset.standingBook.device.durableYears")' prop="deviceName">
          <el-input v-model.trim="data.deviceName" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("asset.standingBook.device.productionCode")' prop="deviceName">
          <el-input v-model.trim="data.deviceName" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("asset.standingBook.device.deviceCode")' prop="deviceName">
          <el-input v-model.trim="data.deviceName" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("asset.standingBook.device.quantity")' prop="deviceName">
          <el-input v-model.trim="data.deviceName" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("asset.standingBook.device.price")' prop="deviceName">
          <el-input v-model.trim="data.deviceName" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("asset.standingBook.device.sum")' prop="deviceName">
          <el-input v-model.trim="data.deviceName" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("asset.standingBook.device.maintenanceUnit")' prop="deviceName">
          <el-input v-model.trim="data.deviceName" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("asset.standingBook.device.chargePerson")' prop="deviceName">
          <el-input v-model.trim="data.deviceName" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("asset.standingBook.device.remark")' prop="deviceName">
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
    import Service from '../../../services/standing-book'
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