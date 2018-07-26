<template>
  <div class="oper-component">
    <div v-if="edit" class="icon-item"><span class="edit-icon" @click="showModal"></span></div>
    <div v-else class="icon-item" @click="showModal"><i class="el-icon-plus"></i>{{$t("common.add")}}</div>
    <el-dialog :title="title" :visible.sync="visible" center :width="'500px'">
      <el-form label-width="140px" :model="data" :rules="Rules" :ref="ref" class="el-form-default">
        <el-form-item :label='$t("system.user.zhName")' prop="username">
          <el-input v-model.trim="data.username" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("system.user.enName")' prop="usernameEn">
          <el-input v-model.trim="data.usernameEn" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("system.user.role")' prop="postid">
          <el-select v-model="data.postid" :placeholder='$t("common.select")' clearable style="width: 100%;">
            <el-option v-for="post in posts"
                       :value="post.objectid" :key="post.objectid" :label="post.postname"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label='$t("system.user.job")' prop="job">
          <el-input v-model.trim="data.job" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("system.user.phone")' prop="linkphone">
          <el-input v-model.trim="data.linkphone" :placeholder='$t("common.input")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("system.user.email")' prop="email">
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
    import Service from '../../../services/user'
    import SystemService from "../../../services/system"
    import CommonConstant from "../../../constants/common";
    import Storage from '../../../store/user';
    import moment from 'moment'
    export default {
        name: 'operComponent',
        data() {
            return {
                visible: false,
                data: {},
                ref: 'edit',
                posts: [],
                Rules: {
                    username: [
                        {required: true, message: this.$t("rules.require")}
                    ],
                    usernameEn: [
                        {required: true, message: this.$t("rules.require")}
                    ],
                    postid: [
                        {required: true, message: this.$t("rules.require")}
                    ],
                    job: [
                        {required: true, message: this.$t("rules.require")}
                    ],
                    linkphone: [
                        {required: true, message: this.$t("rules.require")}
                    ],
                    email: [
                        {required: true, message: this.$t("rules.require")},
                        { type: 'email', message: this.$t("rules.error"), trigger: ["blur","change"]}
                    ],
                }
            }
        },
        props: {
            user: {
                default: function () {
                    return {}
                }
            },
            edit: {
                default: false
            },
            companies: {
                default: function () {
                    return []
                }
            }
        },
        created() {
            this.initData();
        },
        computed: {
            title: function () {
                if (this.edit) {
                    return this.$t("system.user.edit");
                } else {
                    return this.$t("system.user.add")
                }
            },
            endTimeOptions() {
                let date = new Date();
                return {
                    disabledDate(time) {
                        return time <= date || time > moment(Storage.state.expiretime, 'YYYY-MM-DD HH:mm:ss');
                    }
                }
            }
        },
        methods: {
            initData() {
            },
            operate() {
                this.data.companyid = Storage.state.user.companyid;
                this.data.loginname = this.data.linkphone;
                if (this.edit) {
                    this.editDevice()
                } else {
                    this.add()
                }
            },
            add() {
                this.$refs[this.ref].validate(valid => {
                    if (valid) {
                        Service.addUser(this.data).then(res => {
                            this.emitAddEvent();
                            this.hideModal();
                        });
                    }
                })
            },
            editDevice() {
                this.$refs[this.ref].validate(valid => {
                    if (valid) {
                        Service.editUser(this.data).then(res => {
                            this.emitEditEvent();
                            this.hideModal();
                        });
                    }
                })
            },
            getPosts() {
                SystemService.getPosts(Storage.state.user.companyid).then(list => {
                    this.posts = list;
                })
            },
            getDetail() {
                this.data = this.user;
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
                    this.getPosts();
                    if (this.edit) this.getDetail();
                    this.clearValidate();
                } else {
                    this.data = {}
                }
            },
        }
    }
</script>