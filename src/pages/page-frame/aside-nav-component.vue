<template>
  <div class="section">
    <div class="aside">
      <div class="aside-nav">
        <div class="panel-group" id="nav" aria-multiselectable="true">
          <template v-for="(nav,index) in navs">
            <div class="panel panel-default" v-if="!nav.url">
              <div class="panel-heading">
                <h4 class="panel-title" :class="{active: index==currNavIndex}">
                  <a :class="nav.ename" @click="collapse(nav)">
                    <div class="nav-icon"></div>
                    {{nav.modulename}}
                        <span class="nav-selected" v-show="nav.isActive"></span>
                    <span class="nav-selected-hide" v-show="!nav.isActive"></span>
                  </a>
                </h4>
              </div>
              <el-collapse-transition>
                <div class="panel-collapse" role="tabpanel" :class="{collapse:!nav.isActive}">
                  <template v-for="child in nav.children">
                    <div class="panel-body" @click="clickNav(index)">
                      <router-link v-if="child.url" :to="child.url" class="panel-body" :class="child.ename" >
                        <div class="nav-icon"></div>
                        {{child.modulename}}
                        </router-link>
                    </div>
                  </template>
                </div>
              </el-collapse-transition>
            </div>
            <div class="panel panel-default" v-else>
              <div class="panel-heading">
                <h4 class="panel-title" @click="clickNav(index)">
                  <router-link :class="nav.ename" :to="nav.url" >
                    <div class="nav-icon"></div>
                    {{nav.modulename}}

                      </router-link>
                </h4>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>

</template>
<script>

    export default {
        name: 'asideNavComponent',
        data() {
            return {
                isRouting: false,
                currentIndex: 0,
                currNavIndex: 0,
                currNavUrl: ''
            }
        },
        props: {
            navs: {
                default: function () {
                    return []
                }
            },
        },
        created() {
            this.initMenus()
        },
        methods: {
            initMenus() {
                let currentHash = window.location.hash.substring(window.location.hash.indexOf('/'));
                if (this.isRoot(currentHash)) {
                    let url = this.navs[0].url || this.navs[0].children[0].url || this.navs[0].children[0].children[0].url;
                    this.go(this.getHash(currentHash) + url)
                    this.initCollapse(this.navs[0]);
                    this.clickNav(0)
                } else {
                    this.go(currentHash);
                    let that = this;
                    this.navs.forEach((item,index) => {
                        if (exec(item) && item.children && item.children.length) {
                            this.initCollapse(item);
                            this.clickNav(index)
                        }
                        function exec(nav) {
                            if (nav && ('/asset/'+ nav.url == currentHash || '/analyze/'+ nav.url == currentHash || '/just-time/'+ nav.url == currentHash || '/system/'+ nav.url == currentHash)) {
                                return true;
                            } else if (nav.children && nav.children.length) {
                                return nav.children.some((child, index) => {
                                    if (exec(child)) {
                                        if (nav && !nav.url) {
                                            that.initCollapse(child);
                                            that.clickNav(index)
                                        }
                                        return true;
                                    } else {
                                        return false;
                                    }
                                })
                            }
                        }
                    })
                }
            },
            go(url) {
                this.$router.push({path: url});
            },
            isRoot(currentHash) {
                return /^\/asset\/?$/.test(currentHash) || /^\/analyze\/?$/.test(currentHash) || /^\/just-time\/?$/.test(currentHash) || /^\/system\/?$/.test(currentHash)
            },
            getHash(currentHash) {
                if (currentHash.charAt(currentHash.length - 1) == "/") {
                    return currentHash
                } else {
                    return currentHash + '/'
                }
            },
            collapse(nav, two) {
                this.$emit('collapse', nav, two)
            },
            initCollapse(nav) {
                this.$emit('initCollapse', nav)
            },
            clickNav(index) {
                this.currNavIndex = index;
            },
            clickNavChild(url) {
                this.currNavUrl = url;
            }
        },
        watch: {
            '$route'(to,from) {
                if (this.isRoot(to.path)) {
                    if (to.matched[1] == from.matched[1]) {
                        this.go(from.path)
                    } else {
                        this.initMenus()
                    }
                }
            }
        }
    }
</script>
<style lang="less" scoped>
  @navWidth: 240px;
  @navBackgroundColor: #fff;
  .section {
    position: relative;
    .aside {
      position: absolute;
      left: 0;
      z-index: 999;
      width: @navWidth;
      background-color: @navBackgroundColor;
      .isActive {
        display: block;
      }
      .aside-nav {
        font-size: 14px;
        .panel {
          border-radius: 0;
          margin: 0;
          border: none;
          background-color: transparent;
          .panel-heading {
            .panel-title {
              margin-top: 0;
              margin-bottom: 0;
              &.active,
              &:hover{
                a {
                  background-color: #5181ed;
                  color: #fff;
                  &.equipment {
                    .nav-icon {
                      background-image: url("../../assets/home/asset-active.png");
                    }
                  }
                }
              }
              a {
                font-size: 16px;
                height: 65px;
                &.standing-book,
                &.log,
                &.project,
                &.role,
                &.user,
                &.statistical-statement,
                &.data-analysis,
                &.alarm,
                &.equipment {
                  .nav-icon {
                    display: inline-block;
                    margin-right: 35px;
                    margin-left: 50px;
                    background-size: contain;
                  }
                  &:hover,
                  &.router-link-active {
                    background-color: #5181ed;
                    color: #fff;
                  }
                }
                &.alarm {
                  .nav-icon {
                    background-image: url("../../assets/home/alarm.png");
                    width: 22px;
                    height: 24px;
                  }
                  &:hover,
                  &.router-link-active {
                    .nav-icon {
                      background-image: url("../../assets/home/alarm-active.png");
                    }
                  }
                }
                &.data-analysis {
                  .nav-icon {
                    background-image: url("../../assets/home/data-analysis.png");
                    width: 22px;
                    height: 22px;
                  }
                  &:hover,
                  &.router-link-active {
                    .nav-icon {
                      background-image: url("../../assets/home/data-analysis-active.png");
                    }
                  }
                }
                &.statistical-statement {
                  .nav-icon {
                    background-image: url("../../assets/home/statistical-statement.png");
                    width: 22px;
                    height: 22px;
                  }
                  &:hover,
                  &.router-link-active {
                    .nav-icon {
                      background-image: url("../../assets/home/statistical-statement-active.png");
                    }
                  }
                }
                &.standing-book{
                  .nav-icon {
                    background-image: url("../../assets/home/machine-account.png");
                    width: 20px;
                    height: 25px;
                  }
                  &:hover,
                  &.router-link-active {
                    .nav-icon {
                      background-image: url("../../assets/home/machine-account-active.png");
                    }
                  }
                }
                &.equipment{
                  .nav-icon {
                    background-image: url("../../assets/home/asset.png");
                    width: 22px;
                    height: 24px;
                  }
                }
                &.log{
                  .nav-icon {
                    background-image: url("../../assets/home/log.png");
                    width: 22px;
                    height: 24px;
                  }
                  &:hover,
                  &.router-link-active {
                    .nav-icon {
                      background-image: url("../../assets/home/log-active.png");
                    }
                  }
                }
                &.project{
                  .nav-icon {
                    background-image: url("../../assets/home/project.png");
                    width: 23px;
                    height: 23px;
                  }
                  &:hover,
                  &.router-link-active {
                    .nav-icon {
                      background-image: url("../../assets/home/project-active.png");
                    }
                  }
                }
                &.role{
                  .nav-icon {
                    background-image: url("../../assets/home/role.png");
                    width: 23px;
                    height: 22px;
                  }
                  &:hover,
                  &.router-link-active {
                    .nav-icon {
                      background-image: url("../../assets/home/role-active.png");
                    }
                  }
                }
                &.user{
                  .nav-icon {
                    background-image: url("../../assets/home/user.png");
                    width: 23px;
                    height: 24px;
                  }
                  &:hover,
                  &.router-link-active {
                    .nav-icon {
                      background-image: url("../../assets/home/user-active.png");
                    }
                  }
                }
              }
            }
            padding: 0;
            background-color: transparent;
            a {
              cursor: pointer;
              position: relative;
              display: flex;
              align-items: center;
              width: 100%;
              color: #5181ed;
              font-size: 16px;
              &.router-link-active {
                color: #fff;
                background-color: #5181ed;
              }
              &:hover {
                color: #5181ed;
                background-color: #eef1fc;
              }

            }
          }
          .panel-collapse {
            .panel-body {
              padding: 0;
              border: none;
              a {
                position: relative;
                display: inline-block;
                width: 100%;
                height: 50px;
                line-height: 50px;
                padding: 0;
                padding-left: 135px;
                font-size: 14px;
                cursor: pointer;
                color: #5181ed;
                text-align: left;
                &.water-level,
                &.body-sensor,
                &.current-probe,
                &.door-probe,
                &.dry-contact-probe,
                &.flow-probe,
                &.illuminance-probe,
                &.inundate-probe,
                &.meter-reading,
                &.shake-probe,
                &.temperature-humidity-probe,
                &.temperature-probe,
                &.water-gage,
                &.sound-probe{
                  .nav-icon {
                    position: absolute;
                    left: 85px;
                    top: 50%;
                    margin-top: -11px;
                    display: inline-block;
                    background-size: contain;
                  }
                }
                &.water-level{
                  .nav-icon {
                    background-image: url("../../assets/home/equipment/water-level.png");
                    width: 17px;
                    height: 22px;
                  }
                }
                &.body-sensor{
                  .nav-icon {
                    background-image: url("../../assets/home/equipment/body-sensor.png");
                    width: 21px;
                    height: 19px;
                  }
                }
                &.current-probe{
                  .nav-icon {
                    background-image: url("../../assets/home/equipment/current-probe.png");
                    width: 19px;
                    height: 22px;
                  }
                }
                &.door-probe{
                  .nav-icon {
                    background-image: url("../../assets/home/equipment/door-probe.png");
                    width: 17px;
                    height: 22px;
                  }
                }
                &.dry-contact-probe{
                  .nav-icon {
                    background-image: url("../../assets/home/equipment/dry-contact-probe.png");
                    width: 21px;
                    height: 18px;
                  }
                }
                &.flow-probe{
                  .nav-icon {
                    background-image: url("../../assets/home/equipment/flow-probe.png");
                    width: 19px;
                    height: 17px;
                  }
                }
                &.illuminance-probe{
                  .nav-icon {
                    background-image: url("../../assets/home/equipment/illuminance-probe.png");
                    width: 22px;
                    height: 23px;
                  }
                }
                &.inundate-probe{
                  .nav-icon {
                    background-image: url("../../assets/home/equipment/inundate-probe.png");
                    width: 22px;
                    height: 21px;
                  }
                }
                &.meter-reading{
                  .nav-icon {
                    background-image: url("../../assets/home/equipment/meter-reading.png");
                    width: 22px;
                    height: 19px;
                  }
                }
                &.shake-probe{
                  .nav-icon {
                    background-image: url("../../assets/home/equipment/shake-probe.png");
                    width: 23px;
                    height: 20px;
                  }
                }
                &.temperature-humidity-probe{
                  .nav-icon {
                    background-image: url("../../assets/home/equipment/temperature-humidity-probe.png");
                    width: 19px;
                    height: 22px;
                  }
                }
                &.temperature-probe{
                  .nav-icon {
                    background-image: url("../../assets/home/equipment/temperature-probe.png");
                    width: 11px;
                    height: 22px;
                  }
                }
                &.water-gage{
                  .nav-icon {
                    background-image: url("../../assets/home/equipment/water-gage.png");
                    width: 21px;
                    height: 20px;
                  }
                }
                &.sound-probe {
                  .nav-icon {
                    background-image: url("../../assets/home/equipment/sound-probe.png");
                    width: 21px;
                    height: 20px;
                  }
                }
                &:hover,
                &.router-link-active {
                  color: #5181ed;
                  background-color: #eef1fc;
                }
              }
              }

          }
        }
        ul {
          padding: 0;
        }
      }

    }
    .content {
      margin-left: @navWidth;
      padding: 38px 40px;
    }
  }
</style>