<template>
  <div style="margin-right: 25px;">
    <el-button :disabled="!company.objectid" v-if="edit" @click="showModal" class="edit-btn">{{$t("system.role.edit")}}</el-button>
    <el-button v-else @click="showModal" class="add-btn">{{$t("system.role.add")}}</el-button>
    <el-dialog :title="title" :visible.sync="visible" center :width="'500px'">
      <el-form label-width="120px" :model="data" :rules="Rules" :ref="ref" class="el-form-default" :validate-on-rule-change="false">
        <el-form-item :label='$t("system.company.zhName")' prop="companyname">
          <el-input v-model.trim="data.companyname" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("system.company.enName")' prop="companynameEn">
          <el-input v-model.trim="data.companynameEn" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("system.company.managerEnName")' prop="adminnameEn">
          <el-input v-model.trim="data.adminnameEn" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("system.company.managerZhName")' prop="adminname">
          <el-input v-model.trim="data.adminname" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("system.company.post")' prop="job">
          <el-input v-model.trim="data.job" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("system.company.phone")' prop="telphone">
          <el-input v-model.trim="data.telphone" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("system.company.email")' prop="email">
          <el-input v-model.trim="data.email" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="operate">{{$t("dialog.confirm")}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
    import Service from '../../../services/system'
    import CommonConstant from "../../../constants/common";
    export default {
        name: 'operCompanyComponent',
        data() {
            return {
                visible: false,
                data: {
                    flag: 0
                },
                ref: 'edit',
                flag: CommonConstant.flag,
                Rules: {
                    companyname: [
                        {required: true, message: '项目名称'}
                    ],
                    parentid: [
                        {required: true, message: '归属项目'}
                    ],
                }
            }
        },
        props: {
            company: {
                default: function () {
                    return {}
                }
            },
            edit: {
                default: false
            }
        },
        created() {
            this.initData();
        },
        computed: {
            title: function () {
                if (this.edit) {
                    return this.$t("common.edit");
                } else {
                    return this.$t("common.add");
                }
            },
        },
        methods: {
            initData() {
            },
            operate() {
                if (this.edit) {
                    this.editDevice()
                } else {
                    this.add()
                }
            },
            add() {
                this.$refs[this.ref].validate(valid => {
                    if (valid) {
                        Service.addCompany(this.getTransformDataToSend(this.data)).then(res => {
                            this.hideModal();
                        });
                    }
                })
            },
            editDevice() {
                this.$refs[this.ref].validate(valid => {
                    if (valid) {
                        Service.editCompany(this.getTransformDataToSend(this.data)).then(res => {
                            this.hideModal();
                        });
                    }
                })
            },
            getTransformDataToSend(data) {
                return data;
            },
            getTransformDataToUse(data) {
                return data;
            },
            getDetail() {
                Service.getCompanyDetail(this.company.objectid).then(data => {
                    this.data = this.getTransformDataToUse(data);
                })
            },
            clearValidate() {
                if (this.$refs[this.ref]) this.$refs[this.ref].clearValidate();
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
                    if (this.edit) this.getDetail();
                    this.clearValidate();
                } else {
                    this.data = {
                        flag: 0
                    }
                }
            }
        }
    }
</script>