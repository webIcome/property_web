<template>
  <div class="login-container">
    <div class="login-logo"></div>
    <div class="login-description">
      <span class="login-description-first">{{$t("login.description.first")}}</span>
      <span class="login-description-end">{{$t("login.description.end")}}</span>
    </div>
    <select-language-component></select-language-component>
    <div class="body">
      <form class="form-horizontal" @submit.prevent="login">
        <div class="login-tile">{{$t("login.title")}}<span>-------------------------</span></div>
        <div class="login-user">
          <input type="text" class="login-input" id="username" name="username" v-model="loginname" :placeholder='$t("login.user")'/>
          <span class="user-img"></span>
        </div>
        <div class="login-password">
          <input :type="showPassword? 'text': 'password'" class="login-input" id="password" name="password" v-model="password" :placeholder='$t("login.password")'>
          <span @click="toggleDelPassword(false)" v-if="savePassword" class="password-img" :title='$t("login.savePassword")'></span>
          <span @click="toggleDelPassword(true)" v-else class="del-password-img" :title='$t("login.notSavePassword")'></span>
          <span @click="toggleShowPassword(false)" v-if="showPassword"  class="show-password-img"></span>
          <span  @click="toggleShowPassword(true)"v-else  class="hide-password-img"></span>
        </div>
        <div class="login-verify">
          <input type="text" class="login-input" id="verifyCode" name="verifyCode" v-model="verifyCode" :placeholder='$t("login.code")'>
          <div class="verify-code">
            <div @click="getVerifyCode" class="verify-code-img" id="code"></div>
          </div>
        </div>
        <div class="login-btn">
          <button :disabled="disabled" class="btn" type="submit">{{$t("login.confirm")}}</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
    import User from '../store/user';
    import GVerify from '../utils/g-verify';
    import Cookie from "../utils/cookie"
    import SelectLanguageComponent from "../components/select-language";
    export default {
        components: {SelectLanguageComponent}, name: 'loginPage',
        data(){
            return {
                loginname: '',
                password: '',
                verifyCode: '',
                code: '',
                showPassword: false,
                gVerifyCode: null,
                savePassword: false,
            }
        },
        created(){
            this.initData();
        },
        computed: {
            disabled: function () {
                return !(this.loginname && this.password && this.verifyCode)
            }
        },
        mounted: function () {
            this.gVerifyCode = new GVerify({id: 'code', line: 0});
            this.getVerifyCode();
        },
        methods: {
            initData() {
                this.loginname = Cookie.getCookie('loginname');
                this.password = Cookie.getCookie('password');
                if (this.loginname) {
                    this.savePassword = true;
                }
                this.$globalCache.clearCache();
            },
            login: function () {
                let access = {loginname: this.loginname, password: this.password};
                if (this.verifyCode) access.code = this.verifyCode;
                if (this.code != this.verifyCode) {
                    return this.$message({
                        message: '验证码错误',
                        type: 'warning'
                    });
                }
                User.login(access).then((user) => {
                    if (this.savePassword) {
                        Cookie.setCookie('loginname', this.loginname, 365);
                        Cookie.setCookie('password', this.password, 365);
                    } else {
                        Cookie.delCookie('loginname');
                        Cookie.delCookie('password');
                    }
                    this.$router.push('/')
                }).catch(err => { console.log(err)})
            },
            toggleShowPassword(val) {
                this.showPassword = val;
            },
            toggleDelPassword(val) {
                this.savePassword = val
            },
            generateCode: function () {
                this.code = '';
                for (let i = 0; i < 4; i++) {
                    this.code += this.random();
                }
            },
            random: function () {
                return Math.floor(Math.random() * 9);
            },
            getVerifyCode: function () {
                this.generateCode();
                this.gVerifyCode.refresh(this.code)
            },
        }

    }
</script>
<style scoped lang="less">
  .login-container {
    background: url("../assets/login/bg.png") no-repeat center;
    background-size: cover;
    height: 100%;
    position: relative;
    .login-logo {
      position: absolute;
      background: url("../assets/login/logo.png");
      width: 240px;
      height: 68px;
      top: 95px;
      left: 120px;
    }
    .login-description {
      position: absolute;
      left: 90px;
      bottom: 85px;
      font-size: 30px;
      /*font-weight: bold;*/
      letter-spacing: 8px;
      color: #fff;
      .login-description-first {
        margin-right: 30px;
      }
    }
    .form-horizontal {
      position: absolute;
      display: inline-block;
      top: 50%;
      margin-top: -223px;
      right: 100px;
      height: 446px;
      width: 20%;
      min-width: 250px;
      font-size: 16px;
      .login-tile {
        font-size: 50px;
        color: #fff;
        letter-spacing: 5px;
        margin-bottom: 40px;
        white-space: nowrap;
        overflow: hidden;
        span {
          display: inline-block;
          font-size: 20px;
          margin-left: 20px;
          vertical-align: middle;
        }
      }
      .login-input {
        border: none;
        border-bottom: 1px solid #fff;
        width: 100%;
        background: transparent;
        height: 54px;
        line-height: 54px;
        color: #b5ccff;
        font-size: 20px;
        &:focus {
          outline: none;
        }
        &::placeholder {
          /*font-size: 20px;*/
          font-weight: normal;
          letter-spacing: 2px;
          color: #b5ccff;
        }
      }
      .login-user,
      .login-password,
      .login-verify {
        position: relative;
        margin-bottom: 25px;
      }
      .login-user {
        .login-input {
          padding-left: 60px;
          padding-right: 16px;
        }
        .user-img{
          position: absolute;
          top: 50%;
          margin-top: -15px;
          left: 10px;
          display: inline-block;
          background: url("../assets/login/user.png");
          width: 25px;
          height: 29px;
        }
      }
      .login-password {
        .login-input {
          padding-left: 60px;
          padding-right: 16px;
        }
        .password-img{
          position: absolute;
          top: 50%;
          margin-top: -15px;
          left: 10px;
          display: inline-block;
          background: url("../assets/login/password.png");
          width: 25px;
          height: 29px;
          cursor: pointer;
        }
        .del-password-img {
          position: absolute;
          top: 50%;
          margin-top: -15px;
          left: 10px;
          display: inline-block;
          background: url("../assets/login/password.png");
          width: 25px;
          height: 29px;
          cursor: pointer;
        }
        .show-password-img {
          position: absolute;
          top: 50%;
          margin-top: -9px;
          right: 30px;
          display: inline-block;
          background: url("../assets/login/show-password.png") no-repeat center;
          width: 29px;
          height: 18px;
          cursor: pointer;
        }
        .hide-password-img {
          position: absolute;
          top: 50%;
          margin-top: -9px;
          right: 30px;
          display: inline-block;
          background: url("../assets/login/hide-password.png") no-repeat center;
          background-size: contain;
          width: 29px;
          height: 18px;
          cursor: pointer;
        }
      }
      .login-verify {
        display: flex;
        align-items: center;
        .login-input {
          padding: 0 16px;
          margin-right: 16px;
          flex: 2;
        }
        .verify-code {
          flex: 1.5;
          padding: 0 10px;
          background: #fff;
          .verify-code-img {
            width: 100%;
            height: 54px;
            background-color: #fff;
          }
        }
      }
      .login-btn {
        margin-top: 60px;
        width: 100%;
        .btn {
          width: 100%;
          height: 60px;
          font-size: 20px;
          font-weight: bold;
          letter-spacing: 5px;
          color: #5181ed;
          background: #fff;
          border-radius: 0;
          &:hover {
            outline: 0;
          }
          &[disabled] {
            &:hover {
              box-shadow: none;
            }
            opacity: 1;
          }
        }
      }
    }
  }
</style>
