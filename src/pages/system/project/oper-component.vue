<template>
  <div class="oper-component">
    <div v-if="edit" class="icon-item"><span class="edit-icon" @click="showModal"></span></div>
    <div v-else class="icon-item" @click="showModal"><i class="el-icon-plus"></i>{{$t("common.add")}}</div>
    <el-dialog :title="title" :visible.sync="visible" center :width="'500px'">
      <el-form label-width="140px" :model="data" :rules="Rules" :ref="ref" class="el-form-default">
        <el-form-item :label='$t("system.project.zhName")' prop="loginname">
          <el-input v-model.trim="data.deviceName" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("system.project.enName")' prop="loginname">
          <el-input v-model.trim="data.deviceName" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("system.project.area")' prop="loginname">
          <el-input v-model.trim="data.deviceName" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("system.project.height")' prop="loginname">
          <el-input v-model.trim="data.deviceName" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("system.project.completionTime")' prop="completionTime">
          <el-date-picker v-model="data.completionTime"  type="date" :value-format="'yyyy-MM-dd'" :placeholder='$t("common.select")'></el-date-picker>
        </el-form-item>
        <el-form-item :label='$t("system.project.handover")' prop="handover">
          <el-date-picker v-model="data.handover"  type="date" :value-format="'yyyy-MM-dd'" :placeholder='$t("common.select")'></el-date-picker>
        </el-form-item>
        <el-form-item :label='$t("system.project.projectLeader")' prop="phonev">
          <el-input v-model.trim="data.deviceName" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("system.project.email")' prop="email">
          <el-input v-model.trim="data.deviceName" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("system.project.type")' prop="postid">
          <el-select v-model="data.postid" :placeholder='$t("common.select")' clearable style="width: 100%;">
            <el-option v-for="type in commercialType"
                       :value="type.value" :key="type.value" :label="type.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label='$t("system.project.address")' prop="address">
          <select-position v-model="data.position"></select-position>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="operate">{{$t("dialog.confirm")}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
    import Service from '../../../services/project'
    import Constants from "../../../constants/common";
    import moment from 'moment'
    export default {
        name: 'operComponent',
        data() {
            return {
                visible: false,
                data: {},
                ref: 'edit',
                commercialType: Constants.commercialType,
                Rules: {
                    companyid: [
                        {required: true, message: '请选择企业'}
                    ],
                    postid: [
                        {required: true, message: '请选择岗位'}
                    ],
                    loginname: [
                        {required: true, message: '请填写登入名'}
                    ],
                    projectname: [
                        {required: true, message: '请填写姓名'}
                    ],
                    email: [
                        {required: true, message: '请填写邮箱'},
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}
                    ],
                }
            }
        },
        props: {
            edit: {
                default: false
            },
           id: ''
        },
        created() {
            this.initData();
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
            initData() {
            },
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
                Service.getDetail(this.id).then(data => {
                    this.data = this.getTransformDataToUse(data);
                })
            },
            getTransformDataToSend(data) {
                data = this.$common.copyObj(data);
                let position = data.position;
                delete data.position;
                data = Object.assign(data, position)
                data.longitude = data.lng;
                data.latitude = data.lat;
                data.address = data.position;
                delete data.position;
                delete data.lng;
                delete data.lat;
                return data;
            },
            getTransformDataToUse(data) {
                data.position = this.getPosition(data);
                return data;
            },
            getPosition(position){
                return {
                    position: position.address,
                    lng: position.longitude,
                    lat: position.latitude,
                    province: position.province,
                    city: position.city,
                    district: position.district
                };
            },
            clearValidate() {
                if (this.$refs[this.ref]) this.$refs[this.ref].clearValidate();
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
            }
        },
        watch: {
            visible: function (newValue, oldValue) {
                if (newValue) {
//                    if (this.edit) this.getDetail();
                    this.clearValidate();
                } else {
                    this.data = {}
                }
            },
        }
    }
</script>