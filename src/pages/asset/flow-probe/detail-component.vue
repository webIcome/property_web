<template>
  <div class="detail">
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.basic")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.flowProbe.device.sn")}}：</div>
          <div class="detail-content-value">{{device.sn}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.flowProbe.device.deviceModel")}}：</div>
          <div class="detail-content-value">{{devic.deviceModel}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.flowProbe.device.statusName")}}：</div>
          <div class="detail-content-value">{{devic.statusName}}</div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.status")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.flowProbe.device.currentSpeed")}}：</div>
          <div class="detail-content-value">{{devic.currentValue}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.flowProbe.device.electricQuantity")}}：</div>
          <div class="detail-content-value">{{device.electricQuantity}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.flowProbe.device.signalQuality")}}：</div>
          <div class="detail-content-value">{{device.signalQuantity}}</div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.belong")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.flowProbe.device.compName")}}：</div>
          <div class="detail-content-value">{{device.projectName}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.flowProbe.device.assetName")}}：</div>
          <div class="detail-content-value">{{device.assetManageName}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.flowProbe.device.address")}}：</div>
          <div class="detail-content-value">{{device.address}}</div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.alarm")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.flowProbe.device.alarmThreshold")}}：</div>
          <div class="detail-content-value">{{device.alarmThreshold}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.flowProbe.device.alarmDuty")}}：</div>
          <div class="detail-content-value">{{device.alarmDuty}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.flowProbe.device.alarmType")}}：</div>
          <div class="detail-content-value">{{device.alarmType}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.flowProbe.device.alarmCycle")}}：</div>
          <div class="detail-content-value">{{device.alarmCycle}}</div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.others")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.flowProbe.device.heartbeatCycle")}}：</div>
          <div class="detail-content-value">{{device.heartbeatCycle}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.flowProbe.device.collectCycle")}}：</div>
          <div class="detail-content-value">{{device.collectCycle}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.flowProbe.device.range")}}：</div>
          <div class="detail-content-value">{{device.range}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.flowProbe.device.standardValue")}}：</div>
          <div class="detail-content-value">{{device.standardValue}}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    import Service from '../../../services/flow-probe'
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
