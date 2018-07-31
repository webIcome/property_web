<template>
  <div class="oper-component">
    <div v-if="edit" class="icon-item"><span class="edit-icon" @click="showModal"></span></div>
    <div v-else class="icon-item" @click="showModal"><i class="el-icon-plus"></i>{{$t("common.add")}}</div>
    <el-dialog :title="title" :visible.sync="visible" center :width="'1000px'">
      <el-form label-width="110px" :model="data" :rules="Rules" :ref="ref" class="el-form-default"
               :validate-on-rule-change="false">
        <el-row>
          <el-col :span="8">
            <el-form-item :label='$t("asset.standingBook.device.assetCode")' prop="assetManageSn">
              <el-input v-model.trim="data.assetManageSn" :placeholder='$t("common.input")'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label='$t("asset.standingBook.device.assetName")' prop="assetManageName">
              <el-input v-model.trim="data.assetManageName" :placeholder='$t("common.input")'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label='$t("asset.standingBook.device.assetType")' prop="deviceType">
              <select-asset-type-component v-model="data.deviceType"></select-asset-type-component>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label='$t("asset.standingBook.device.address")' prop="address">
              <el-input v-model.trim="data.address" :placeholder='$t("common.input")'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label='$t("asset.standingBook.device.project")' prop="projectId">
              <select-project-component v-model="data.projectId"></select-project-component>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label='$t("asset.standingBook.device.addressType")' prop="addressType">
              <select-address-type-component v-model="data.addressType"></select-address-type-component>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label='$t("asset.standingBook.device.belongSystem")' prop="sysCode">
              <select-system-component v-model="data.sysCode"></select-system-component>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label='$t("asset.standingBook.device.manufacturer")' prop="vendor">
              <el-input v-model.trim="data.vendor" :placeholder='$t("common.input")'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label='$t("asset.standingBook.device.model")' prop="deviceModel">
              <el-input v-model.trim="data.deviceModel" :placeholder='$t("common.input")'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label='$t("asset.standingBook.device.status")' prop="status">
              <el-select v-model="data.status" :placeholder='$t("common.select")' clearable style="width: 100%;">
                <el-option v-for="type in status" :value="type.value" :key="type.value" :label="type.text"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label='$t("asset.standingBook.device.trademark")' prop="brand">
              <el-input v-model.trim="data.brand" :placeholder='$t("common.input")'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label='$t("asset.standingBook.device.productionTime")' prop="productTime">
              <el-date-picker id="date-start" v-model="data.productTime" type="month" :value-format="'yyyy.MM'"
                              :placeholder='$t("common.select")'></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label='$t("asset.standingBook.device.useTime")' prop="useTime">
              <el-date-picker id="date-start" v-model="data.useTime" type="month" :value-format="'yyyy.MM'"
                              :placeholder='$t("common.select")'></el-date-picker>

            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label='$t("asset.standingBook.device.durableYears")' prop="useYear">
              <el-input v-model.trim="data.useYear" :placeholder='$t("common.input")'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label='$t("asset.standingBook.device.productionCode")' prop="productSn">
              <el-input v-model.trim="data.productSn" :placeholder='$t("common.input")'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label='$t("asset.standingBook.device.deviceCode")' prop="deviceSn">
              <el-input v-model.trim="data.deviceSn" :placeholder='$t("common.input")'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label='$t("asset.standingBook.device.quantity")' prop="quantity">
              <el-input v-model.trim="data.quantity" :placeholder='$t("common.input")'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label='$t("asset.standingBook.device.price")' prop="price">
              <el-input v-model.trim="data.price" :placeholder='$t("common.input")'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label='$t("asset.standingBook.device.sum")' prop="amount">
              <el-input v-model.trim="data.amount" :placeholder='$t("common.input")'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label='$t("asset.standingBook.device.maintenanceUnit")' prop="maintainComp">
              <el-input v-model.trim="data.maintainComp" :placeholder='$t("common.input")'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label='$t("asset.standingBook.device.chargePerson")' prop="dutyUser">
              <el-input v-model.trim="data.dutyUser" :placeholder='$t("common.input")'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label='$t("asset.standingBook.device.remark")' prop="remark">
              <el-input v-model.trim="data.remark" :placeholder='$t("common.input")'></el-input>
            </el-form-item>
          </el-col>
        </el-row>
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
    export default {
        name: 'operComponent',
        data() {
            return {
                ref: 'edit',
                visible: false,
                data: {},
                service: Service,
                status: CommonConstant.assetStatus,
                Rules: {
                    assetManageSn: [
                        {required: true, message: this.$t("rules.require")},
                    ],
                    assetManageName: [
                        {required: true, message: this.$t("rules.require")},
                    ],
                    address: [
                        {required: true, message: this.$t("rules.require")},
                    ],
                    projectId: [
                        {required: true, message: this.$t("rules.require")},
                    ],
                }
            }
        },
        props: {
            id: {
                default: ''
            },
            edit: {
                default: false
            }
        },
        computed: {
            title: function () {
                if (this.edit) {
                    return this.$t("common.edit");
                } else {
                    return this.$t("common.add")
                }
            },
        },
        methods: {
            operate() {
                this.$refs[this.ref].validate(valid => {
                    if (valid) {
                        this.service.operate(this.getTransformDataToSend(this.data)).then(res => {
                            this.emitEvent();
                            this.hideModal();
                        });
                    }
                })
            },
            getDetail() {
                this.service.getDetail(this.id).then(data => {
                    this.data = this.getTransformDataToUse(data);
                })
            },
            getTransformDataToSend(data) {
                return data;
            },
            getTransformDataToUse(data) {
                return data;
            },
            clearValidate() {
                if (this.$refs[this.ref]) this.$refs[this.ref].clearValidate();
            },
            emitEvent() {
                if (this.edit) {
                    this.emitEditEvent()
                } else {
                    this.emitAddEvent();
                }
            },
            emitAddEvent() {
                this.$emit('initPaging')
            },
            emitEditEvent() {
                this.$emit('initCurrentPaging')
            },
            showModal() {
                this.visible = true;
            },
            hideModal() {
                this.visible = false;
            },
            resetData() {
                this.data = {}
            }
        },
        watch: {
            visible: function (newValue, oldValue) {
                if (newValue) {
                    if (this.edit) this.getDetail();
                    this.clearValidate();
                } else {
                    this.resetData()
                }
            }
        }
    }
</script>