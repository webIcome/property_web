<template>
  <div class="detail">
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.basic")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.shake.device.sn")}}：</div>
          <div class="detail-content-value">{{device.sn}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.shake.device.statusName")}}：</div>
          <div class="detail-content-value">{{device.statusName}}</div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.status")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.shake.device.acceleratedSpeed")}}：</div>
          <div class="detail-content-value">{{device.currentSpeed}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.shake.device.electricQuantity")}}：</div>
          <div class="detail-content-value">{{device.electricLevel}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.shake.device.signalQuality")}}：</div>
          <div class="detail-content-value">{{device.signalLevel}}</div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.belong")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.shake.device.compName")}}：</div>
          <div class="detail-content-value">{{device.projectName}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.shake.device.assetName")}}：</div>
          <div class="detail-content-value">{{device.assetManageName}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.shake.device.address")}}：</div>
          <div class="detail-content-value">{{device.address}}</div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.alarm")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.shake.device.alarmThreshold")}}：</div>
          <div class="detail-content-value">{{device.alarmThreshold}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.shake.device.alarmDuty")}}：</div>
          <div class="detail-content-value">{{device.alarmDuty | alarmDutyNameConverter}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.shake.device.alarmType")}}：</div>
          <div class="detail-content-value">{{device.alarmType | alarmTypeNameConverter}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.shake.device.alarmCycle")}}：</div>
          <div class="detail-content-value">{{device.alarmCycle}}</div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.others")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.shake.device.heartbeatCycle")}}：</div>
          <div class="detail-content-value">{{device.heartbeatCycle}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.shake.device.collectCycle")}}：</div>
          <div class="detail-content-value">{{device.collectCycleCount}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.shake.device.standardValue")}}：</div>
          <div class="detail-content-value">{{device.initValue}}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    import Service from '../../../services/shake'
    export default {
        name: 'detailComponent',
        data() {
            return {
                device: {}
            }
        },
        props: {
            id: ''
        },
        methods: {
            initData() {
//                this.getDetail()
            },
            getDetail() {
                Service.getDetail(this.id).then(data => {
                    this.device = data;
                })
            }
        },
        mounted(){
            this.initData();
        }
    }
</script>

<style scoped lang="less">

</style>
