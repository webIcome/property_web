<template>
  <div class="personal">
    <el-dropdown trigger="click" @command="handelPersonal">
      <span class="el-dropdown-link"><i class="personal-center-human"></i>{{$t("header.personal")}}<i class="personal-center-select"></i></span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="cp">{{$t("header.changePassword")}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog :title='$t("header.changePassword")' :visible.sync="visible" center :width="'500px'"
               @close="clearValidate('controlDevice')">
      <el-form label-width="120px" :model="password" ref="controlDevice" :rules="Rules" class="el-form-default">
        <el-form-item :label='$t("header.currentPassword")' prop="oldpwd">
          <el-input type="password" v-model.trim="password.oldpwd" :placeholder='$t("header.currentPasswordPlaceholder")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("header.newPassword")' prop="newpwd">
          <el-input type="password" v-model.trim="password.newpwd" :placeholder='$t("header.newPasswordPlaceholder")'></el-input>
        </el-form-item>
        <el-form-item :label='$t("header.confirmPassword")' prop="secondNew">
          <el-input type="password" v-model.trim="password.secondNew" :placeholder='$t("header.confirmPasswordPlaceholder")'></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changePassword('controlDevice')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
    import Service from "../../services/login";
    export default {
        name: 'headerPersonal',
        data() {
            return {
                visible: false,
                password: {
                    oldpwd: '',
                    newpwd: '',
                    secondNew: ''
                },
                Rules: {
                    oldpwd: [
                        {required: true, message: this.$t("rules.require")},
                    ],
                    newpwd: [
                        {required: true, message: this.$t("rules.require")},
                    ],
                    secondNew: [
                        {required: true, message: this.$t("rules.require")},
                    ],
                }
            }
        },
        methods: {
            handelPersonal(command) {
                if (command == 'cp') {
                    this.dialogChangePassword();
                } else if (command == 'logout') {
                    this.logout();
                }
            },
            changePassword: function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        if (this.password.newpwd != this.password.secondNew) {
                            return;
                        }
                        Service.changePassword(this.password).then(res => {
                            if (res.data.code != 0) {

                            } else {
                                this.$message({
                                    message: '修改成功',
                                    type: 'success',
                                    duration: 1000
                                });
                                this.visible = false;
                                this.goToLogin()
                            }
                        })
                    }
                })
            },
            goToLogin: function () {
                this.$router.push({path: '/login'})
            },
            dialogChangePassword: function () {
                this.password = {
                    oldpwd: '',
                    newpwd: '',
                    secondNew: ''
                };
                this.visible = true
            },
            clearValidate: function (formName) {
                this.$refs[formName].clearValidate();
            }
        }
    }
</script>
<style lang="less" scoped>
  .personal {
    .personal-center-human {
      display: inline-block;
      background: url("../../assets/header/personal.png");
      width: 18px;
      height: 19px;
      vertical-align: middle;
      margin-right: 8px;
    }
    .personal-center-select {
      display: inline-block;
      background: url("../../assets/header/select.png");
      width: 10px;
      height: 6px;
      vertical-align: middle;
      margin-left: 8px;
    }
    .el-dropdown {
      color: #787878;
    }
  }

</style>