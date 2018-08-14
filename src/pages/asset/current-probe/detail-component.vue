<template>
  <div class="detail">
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.basic")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.currentProbe.device.sn")}}：</div>
          <div class="detail-content-value">{{device.sn}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.currentProbe.device.deviceModel")}}：</div>
          <div class="detail-content-value">{{device.deviceModel}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.currentProbe.device.statusName")}}：</div>
          <div class="detail-content-value">{{device.statusName}}</div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.status")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.currentProbe.device.currents")}}：</div>
          <div class="detail-content-value">{{device.currentValue}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.currentProbe.device.electricQuantity")}}：</div>
          <div class="detail-content-value">{{device.electricQuantity}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.currentProbe.device.signalQuality")}}：</div>
          <div class="detail-content-value">{{device.signalQuantity}}</div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.belong")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.currentProbe.device.compName")}}：</div>
          <div class="detail-content-value">{{device.projectName}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.currentProbe.device.assetName")}}：</div>
          <div class="detail-content-value">{{device.assetManageName}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.currentProbe.device.address")}}：</div>
          <div class="detail-content-value">{{device.address}}</div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.alarm")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.currentProbe.device.alarmThreshold")}}：</div>
          <div class="detail-content-value">{{device.alarmThreshold}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.currentProbe.device.alarmDuty")}}：</div>
          <div class="detail-content-value">{{device.alarmDuty}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.currentProbe.device.alarmType")}}：</div>
          <div class="detail-content-value">{{device.alarmType | alarmTypeNameConverter}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.currentProbe.device.alarmCycle")}}：</div>
          <div class="detail-content-value">{{device.alarmCycle}}</div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.others")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.currentProbe.device.heartbeatCycle")}}：</div>
          <div class="detail-content-value">{{device.heartbeatCycle}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.currentProbe.device.collectCycle")}}：</div>
          <div class="detail-content-value">{{device.collectCycle}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.currentProbe.device.range")}}：</div>
          <div class="detail-content-value">{{device.range}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.currentProbe.device.standardValue")}}：</div>
          <div class="detail-content-value">{{device.standardValue}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.currentProbe.device.startThreshold")}}：</div>
          <div class="detail-content-value">{{device.startStopValue}}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    import Service from '../../../services/current-probe'
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
