<template>
  <div class="section">
    <div class="aside">
      <div class="project">
        <el-select v-model="project" :placeholder='$t("common.select")' clearable>
          <el-option v-for="type in projects" :value="type.value" :key="type.value" :label="type.text"></el-option>
        </el-select>
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
        <div class="title-header">
          <div class="title-header-content">
            <span>{{title}}</span>
          </div>
          <div class="title-header-en">
            <span></span>
          </div>
        </div>
        <div class="just-time-content">
          <div class="content-item">
            <div class="content-item-title">你好</div>
            <div class="content-item-body">
              <div class="content-item-img"></div>
              <div class="content-item-text"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
      name: 'justTimePage',
      data() {
          return {
              project: '',
              projects: [],
              navs: [
                  {name: this.$t("justTime.drainage"), ename: 'drainage', isActive: true},
                  {name: this.$t("justTime.powerDistribution"), ename: 'power-distribution', isActive: false},
                  {name: this.$t("justTime.elevator"), ename: 'elevator', isActive: false},
                  {name: this.$t("justTime.airConditioner"), ename: 'air-conditioner', isActive: false},
                  {name: this.$t("justTime.others"), ename: 'others', isActive: false},
              ],
          }
      },
      created(){},
      methods: {
          select(nav) {
              this.navs.forEach(item => {
                  item.isActive = false;
              });
              nav.isActive = true;
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
              display: inline-block;
              height: 30px;
              line-height: 30px;
            }
          }
        }
        .just-time-content{
          background: #fff;
          padding: 20px 45px;
          margin-bottom: 22px;
          box-shadow: 0 0 5px #ccc;
          .content-item {
            .content-item-title {
              font-weight: bold;
              color: #323232;
            }
            .content-item-body {
              .content-item-img {}
              .content-item-text{}
            }
          }
        }
      }
    }
  }


</style>