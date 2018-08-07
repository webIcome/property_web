<template>
  <div class="section">
    <div class="aside">
      <div class="project">
        <select-project-component v-model="projectId" :defaultId="true"></select-project-component>
      </div>
      <div>
        <template v-for="nav in navs">
          <div class="aside-nav" :class="{active: nav.isActive}" @click="select(nav)">
            <div class="aside-nav-content" :class="nav.ename">
              <div class="icon"></div>
              <div class="text">{{nav.name}}</div>
            </div>
          </div>
        </template>
      </div>

    </div>
    <div class="content">
      <div class="content-right">
        <template v-for="item in list">
          <div class="title-header">
            <div class="title-header-content">
              <span>{{item.address}}</span>
            </div>
            <div class="title-header-en">
              <span v-for="status in item.addressStatus" :class="{red: status.status != 0}">{{status.value}}</span>
            </div>
          </div>
          <div class="just-time-content">
            <template v-for="info in item.assetInfo">
              <div class="content-item">
                <div class="content-item-content">
                  <div class="content-item-title">{{info.assetName}}</div>
                  <div class="content-item-body" :class="info.ename">
                    <div class="content-item-img"></div>
                    <div class="content-item-text">
                      <template v-for="text in info.addressStatus">
                        <div :class="{red: text.status != 0}">{{text.value}}</div>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
  import Service from "../../services/just-time"
  export default {
      name: 'justTimePage',
      data() {
          return {
              projectId: '',
              code: '',
              list: [{
                  "address": "A02区 13层1303A",
                  "addressStatus": [
                      {status: 0,value: '温度 30'},
                      {status: 1,value: '温度 30'},
                  ],
                  "assetInfo": [
                      {
                          "assetName": "水箱",
                          "addressStatus": [{status: 0,value: '温度 30'},
                              {status: 1,value: '温度 30'},],
                          code: 2
                      }
                  ]
              }],
              navs: [
                  {name: this.$t("justTime.drainage"), ename: 'drainage', isActive: true, code: 1},
                  {name: this.$t("justTime.powerDistribution"), ename: 'power-distribution', isActive: false, code: 2},
                  {name: this.$t("justTime.elevator"), ename: 'elevator', isActive: false, code: 3},
                  {name: this.$t("justTime.airConditioner"), ename: 'air-conditioner', isActive: false, code: 4},
                  {name: this.$t("justTime.others"), ename: 'others', isActive: false, code: 5},
              ],
              localList: [
                  {title: "泵", ename: 'water-pump', code: 1},
                  {title: "冰箱", ename: 'water-tank', code: 2},
                  {title: "锅炉", ename: 'boiler', code: 3},
                  {title: "配电柜", ename: 'switch-box', code: 4},
                  {title: "变压器", ename: 'transformer', code: 5},
                  {title: "曳引机", ename: 'tractor', code: 6},
                  {title: "轿厢", ename: 'car-platform', code: 7},
                  {title: "风机", ename: 'draught-fan', code: 8},
                  {title: "压缩机", ename: 'compressor', code: 9},
                  {title: "冷却塔", ename: 'cooling-tower', code: 10},
                  {title: "其他", ename: 'others', code: 11},
              ],
              timer: '',
              refreshInterval: 10000
          }
      },
      created(){
          this.initData()
      },
      methods: {
          initData() {
              this.transformData(this.list)
              this.findList()
              this.refreshPage();
          },
          refreshPage() {
              clearInterval(this.timer);
              this.timer = setInterval(() => {
                  this.findList()
              }, this.refreshInterval)
          },
          findList() {
              Service.findList({projectId: this.projectId, code: this.code}).then(data => {
                  this.list = this.transformData(data);
              })
          },
          transformData(list) {
              return list.map(item => {
                  item.assetInfo.forEach(i => {
                      this.localList.forEach(local => {
                          if (local.code == i.code) {
                              i.ename = local.ename;
                          }
                      });
                  });
                  return item
              });
          },
          select(nav) {
              this.navs.forEach(item => {
                  item.isActive = false;
              });
              nav.isActive = true;
              this.code = nav.code;
              this.findList();
          }
      },
      destroyed() {
          clearInterval(this.timer);
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
      .project {
        padding: 20px;
      }
      .aside-nav {
        text-align: center;
        padding: 0 10px;
        cursor: pointer;
        font-size: 14px;
        color: #5181ed;
        font-weight: bold;
        &:first-child {
          .aside-nav-content{
            border-top: 0.1px solid rgb(200,200,200, 0.1);
          }
        }
        .aside-nav-content {
          border-bottom: 0.1px solid rgb(200,200,200, 0.1);
          padding: 30px 0 20px 0;
          .icon {
            display: inline-block;
          }
        }
        .text {
          padding: 10px 0 0 0;
        }
        .aside-nav-content {
          &.drainage{
            .icon {
              background: url("../../assets/just-time/drainage.png");
              width: 68px;
              height: 71px;
            }
          }
          &.power-distribution {
            .icon {
              background: url("../../assets/just-time/power-distribution.png");
              width: 61px;
              height: 76px;
            }
          }
          &.elevator {
            .icon {
              background: url("../../assets/just-time/elevator.png");
              width: 61px;
              height: 65px;
            }
          }
          &.air-conditioner {
            .icon {
              background: url("../../assets/just-time/air-conditioner.png");
              width: 64px;
              height: 49px;
            }
          }
          &.others {
            .icon {
              background: url("../../assets/just-time/others.png");
              width: 70px;
              height: 69px;
            }
          }
        }
        &:hover,
        &.active {
          background: #5181ed;
          color: #fff;
          &:first-child {
            .aside-nav-content {
              border-top: 0.1px solid #5181ed ;
            }
          }
          .aside-nav-content {
            border-bottom: 0.1px solid #5181ed ;
            &.drainage{
              .icon {
                background: url("../../assets/just-time/drainage-active.png");
              }
            }
            &.power-distribution {
              .icon {
                background: url("../../assets/just-time/power-distribution-active.png");
              }
            }
            &.elevator {
              .icon {
                background: url("../../assets/just-time/elevator-active.png");
              }
            }
            &.air-conditioner {
              .icon {
                background: url("../../assets/just-time/air-conditioner-active.png");
              }
            }
            &.others {
              .icon {
                background: url("../../assets/just-time/others-active.png");
              }
            }
          }
        }
      }
    }
    .content {
      margin-left: @navWidth;
      padding: 38px 40px;
      .content-right {
        .title-header{
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          position: relative;
          .title-header-content {
            span {
              display: inline-block;
              height: 30px;
              line-height: 30px;
              padding: 0 20px;
              border-left: 5px solid #5181ed;
              font-size: 14px;
              font-weight: bolder;
              color: #323232;
              letter-spacing: 1px;
            }
          }
          .title-header-en {
            position: absolute;
            width: 100%;
            text-align: center;
            span {
              &.red {
                color: #ea6a76;
              }
              display: inline-block;
              margin-top: 10px;
              border-right: 1px solid #787878;
              padding: 0 10px;
              font-weight: bold;
              &:last-child {
                border: none;
              }
            }
          }
        }
        .just-time-content{
          background: #fff;
          padding: 20px 0px;
          margin-bottom: 22px;
          box-shadow: 0 0 5px #ccc;
          display: flex;
          flex-wrap: wrap;
          .content-item {
            padding: 30px 0;
            width: 320px;
            .content-item-content{
              border-right: 0.1px solid rgb(200,200,200, 0.1);
              height: 175px;
              display: flex;
              flex-direction: column;
            }
            .content-item-title {
              font-weight: bold;
              color: #323232;
              text-align: center;
              width: 180px;
            }
            .content-item-body {
              display: flex;
              flex: 1;
              justify-content: space-between;
              align-items: center;
              .content-item-img {
                flex: 9;
                display: inline-block;
                background-repeat: no-repeat;
                background-position:center;
              }
              .content-item-text{
                font-weight: bold;
                flex: 7;
                .red {
                  color: #ea6a76;
                }
              }
              &.boiler {
                .content-item-img {
                  background-image: url("../../assets/just-time/boiler.png");
                  width: 112px;
                  height: 66px;
                }
              }
              &.car-platform {
                .content-item-img {
                  background-image: url("../../assets/just-time/car-platform.png");
                  width: 73px;
                  height: 106px;
                }
              }
              &.compressor {
                .content-item-img {
                  background-image: url("../../assets/just-time/compressor.png");
                  width: 97px;
                  height: 70px;
                }
              }
              &.cooling-tower {
                .content-item-img {
                  background-image: url("../../assets/just-time/cooling-tower.png");
                  width: 81px;
                  height: 90px;
                }
              }
              &.draught-fan {
                .content-item-img {
                  background-image: url("../../assets/just-time/draught-fan.png");
                  width: 97px;
                  height: 79px;
                }
              }
              &.switch-box {
                .content-item-img {
                  background-image: url("../../assets/just-time/switch-box.png");
                  width: 88px;
                  height: 89px;
                }
              }
              &.tractor {
                .content-item-img {
                  background-image: url("../../assets/just-time/tractor.png");
                  width: 112px;
                  height: 70px;
                }
              }
              &.transformer {
                .content-item-img {
                  background-image: url("../../assets/just-time/transformer.png");
                  width: 77px;
                  height: 85px;
                }
              }
              &.water-pump {
                .content-item-img {
                  background-image: url("../../assets/just-time/water-pump.png");
                  width: 97px;
                  height: 76px;
                }
              }
              &.water-tank {
                .content-item-img {
                  background-image: url("../../assets/just-time/water-tank.png");
                  width: 94px;
                  height: 88px;
                }
              }
            }
          }
        }
      }
    }
  }


</style>