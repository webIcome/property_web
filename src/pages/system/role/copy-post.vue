<template>
  <div style="margin-right: 25px;">
    <el-button :disabled="!post.objectid"  @click="showModal" class="edit-btn">{{$t("system.role.copyEdit")}}</el-button>
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
         <el-button type="primary" @click="add">{{$t("dialog.confirm")}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
    import Service from '../../../services/system'
    import CommonConstant from "../../../constants/common";
    export default {
        name: 'copyPostComponent',
        data() {
            return {
                visible: false,
                data: {},
                ref: 'edit',
                flag: CommonConstant.flag,
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
            }
        },
        created() {
            this.initData();
        },
        computed: {
            title: function () {
                return this.$t("system.role.copyEdit")
            },
        },
        methods: {
            initData() {
            },
            add() {
                this.$refs[this.ref].validate(valid => {
                    if (valid) {
                        Service.copyPost(this.data).then(res => {
                            this.emitAddEvent();
                            this.hideModal();
                        });
                    }
                })
            },
            getDetail() {
                this.data.copyid = this.post.objectid;
                this.data.companyid = this.post.companyid;
                this.data.postname = this.post.postname;
                this.data.flag = this.post.flag;
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
                    this.getDetail();
                } else {
                    this.data = {}
                }
            }
        }
    }
</script>