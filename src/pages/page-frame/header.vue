<template>
  <div class="header">
    <div class="logo"></div>
    <div class="header-right">
      <header-nav :navs="useNavs"></header-nav>
      <div class="header-other">
        <div class="header-manager">{{$t("header.hello")}}， {{user.username}}</div>
        <header-personal></header-personal>
        <div class="header-help"><i class="header-help-icon"></i>{{$t("header.help")}}</div>
        <div @click="logout" :title="$t('header.logout')" class="header-logout"></div>
      </div>
    </div>
  </div>
</template>
<script>
    import HeaderNav from "./header-nav";
    import HeaderPersonal from "./header-personal";
    import Storage from '../../store/user';
    import Config from "../../config";
    export default {
        components: {HeaderPersonal, HeaderNav},
        name: 'headerComponent',
        data() {
            return {
                localNav: [
                    {modulename: "实时监控", url: '/just-time', modulecode: 'justTime'},
                    {modulename: "统计分析", url: '/analyze', modulecode: 'analyze'},
                    {modulename: "资产管理", url: '/asset', modulecode: 'asset'},
                    {modulename: "系统管理", url: '/system', modulecode: 'system'},
                ],
                user: Storage.state.user,
                useNavs: []
            }
        },
        created() {
            this.initNav()
        },
        methods: {
            initNav() {
                this.useNavs = [];
              /*  this.useNavs = Storage.state.navs.parents.map(item => {
                    this.localNav.forEach(nav => {
                        if (item.modulecode == nav.modulecode) {
                            item.url = nav.url;
                        }
                    })
                    return item;
                }).filter(item => {
                    let filter = false;
                    this.localNavs.forEach(nav => {
                        if (nav.modulecode == item.modulecode) {
                            filter = true;
                        }
                    });
                    return filter;
                });*/
                this.useNavs = this.localNav;
                let currentHash = window.location.hash.substring(window.location.hash.indexOf('/'));
                console.log(currentHash)
                if (currentHash == '/' || ! currentHash) {
                    let url = this.useNavs[0].url;
                    this.$router.push({path: url})
                } else {
                    this.$router.push({path: currentHash});
                }
            },
            logout: function () {
                this.$http.get('accounts/logout', {baseURL: Config.URL_API}).then(res => {
                    this.goToLogin();
                })
            },
            goToLogin: function () {
                this.$router.push({path: '/login'})
            },
        }
    }
</script>
<style lang="less" scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    background-color: #fff;
    font-size: 14px;
    font-weight: bold;
    .logo {
      width: 240px;
      height: 42px;
      background: url("../../assets/header/logo.png") no-repeat center;
      background-size: contain;
    }
    .header-right {
      display: flex;
      padding-right: 55px;
      .header-other {
        display: flex;
        align-items: center;
        .header-manager {
          margin-right: 60px;
        }
        .header-help {
          margin-left: 45px;
          cursor: pointer;
          .header-help-icon {
            display: inline-block;
            background: url("../../assets/header/help.png");
            width: 20px;
            height: 20px;
            margin-right: 8px;
            vertical-align: middle;
          }
        }
        .header-logout {
          background: url("../../assets/header/logout.png") no-repeat center;
          background-size: contain;
          width: 26px;
          height: 22px;
          margin-left: 60px;
          cursor: pointer;
        }
      }
    }
  }
</style>