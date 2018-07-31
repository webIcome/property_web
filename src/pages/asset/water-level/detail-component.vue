<template>
  <div class="detail">
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.basic")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.waterLevel.device.sn")}}：</div>
          <div class="detail-content-value">{{device.sn}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.waterLevel.device.deviceModel")}}：</div>
          <div class="detail-content-value">{{device.deviceModel}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.waterLevel.device.statusName")}}：</div>
          <div class="detail-content-value">{{device.statusName}}</div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.status")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.waterLevel.device.currentLevel")}}：</div>
          <div class="detail-content-value">{{device.currentLevel}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.waterLevel.device.electricQuantity")}}：</div>
          <div class="detail-content-value">{{device.electricQuantity}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.waterLevel.device.signalQuality")}}：</div>
          <div class="detail-content-value">{{device.signalQuantity}}</div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.belong")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.waterLevel.device.compName")}}：</div>
          <div class="detail-content-value">{{device.projectName}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.waterLevel.device.assetName")}}：</div>
          <div class="detail-content-value">{{device.assetManageName}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.waterLevel.device.address")}}：</div>
          <div class="detail-content-value">{{device.address}}</div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.alarm")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.waterLevel.device.alarmThreshold")}}：</div>
          <div class="detail-content-value">{{device.alarmThreshold}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.waterLevel.device.alarmDuty")}}：</div>
          <div class="detail-content-value">{{device.alarmDuty}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.waterLevel.device.alarmType")}}：</div>
          <div class="detail-content-value">{{device.alarmType}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.waterLevel.device.alarmCycle")}}：</div>
          <div class="detail-content-value">{{device.alarmCycle}}</div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.others")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.waterLevel.device.heartbeatCycle")}}：</div>
          <div class="detail-content-value">{{device.heartbeatCycle}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.waterLevel.device.collectCycle")}}：</div>
          <div class="detail-content-value">{{device.collectCycle}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.waterLevel.device.range")}}：</div>
          <div class="detail-content-value">{{device.range}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.waterLevel.device.standardValue")}}：</div>
          <div class="detail-content-value">{{device.standardValue}}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    import Service from '../../../services/water-level'
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
                this.getDetail()
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
