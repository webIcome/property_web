<template>
  <div style="margin-right: 25px;">
    <el-button :disabled="!post.objectid" v-if="edit" @click="showModal" class="edit-btn">{{$t("system.role.edit")}}</el-button>
    <el-button v-else @click="showModal" class="add-btn">{{$t("system.role.add")}}</el-button>
    <el-dialog :title="title" :visible.sync="visible" center :width="'450px'">
      <el-form label-width="120px" :model="data" :rules="Rules" :ref="ref" class="el-form-default"
               :validate-on-rule-change="false">
        <el-form-item :label='$t("system.role.roleName")' prop="postname">
          <el-input v-model.trim="data.postname" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("system.role.status")' prop="flag">
          <el-select v-model="data.flag" :placeholder='$t("common.select")' clearable style="width: 100%;">
            <el-option v-for="type in flag" :value="type.value" :key="type.value" :label="type.text"></el-option>
          </el-select>
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
        name: 'operPostComponent',
        data() {
            return {
                visible: false,
                data: {
                    flag: 0
                },
                ref: 'edit',
                flag: CommonConstant.flag,
                companies: [],
                Rules: {
                    postname: [
                        {required: true, message: '请输入岗位名称'}
                    ],
                    flag: [
                        {required: true, message: '请输入岗位描述'}
                    ],
                }
            }
        },
        props: {
            post: {
                default: function () {
                    return {}
                }
            },
            edit: {
                default: false
            },
            company: {
                default: function () {
                    return {}
                }
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
                this.$globalCache.companies.then(data => {
                    this.companies = data;
                })
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
                        if (this.company.objectid) this.data.companyid = this.company.objectid;
                        Service.addPost(this.data).then(res => {
                            this.emitEvent();
                            this.hideModal();
                        });
                    }
                })
            },
            editDevice() {
                this.$refs[this.ref].validate(valid => {
                    if (valid) {
                        Service.editPost(this.data).then(res => {
                            this.emitEvent();
                            this.hideModal();
                        });
                    }
                })
            },
            getDetail() {
                this.data = this.post;
            },
            clearValidate() {
                if (this.$refs[this.ref]) this.$refs[this.ref].clearValidate();
            },
            emitEvent() {
                this.$emit('initPaging')
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