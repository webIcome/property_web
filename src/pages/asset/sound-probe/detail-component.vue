<template>
  <div class="detail">
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.basic")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.soundProbe.device.sn")}}：</div>
          <div class="detail-content-value">{{device.sn}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.soundProbe.device.deviceModel")}}：</div>
          <div class="detail-content-value">{{device.deviceModel}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.soundProbe.device.statusName")}}：</div>
          <div class="detail-content-value">{{device.statusName}}</div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.status")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.soundProbe.device.currentDb")}}：</div>
          <div class="detail-content-value">{{device.currentValue}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.soundProbe.device.electricQuantity")}}：</div>
          <div class="detail-content-value">{{device.electricLevel}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.soundProbe.device.signalQuality")}}：</div>
          <div class="detail-content-value">{{device.signalLevel}}</div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.belong")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.soundProbe.device.compName")}}：</div>
          <div class="detail-content-value">{{device.projectName}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.soundProbe.device.assetName")}}：</div>
          <div class="detail-content-value">{{device.assetManageName}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.soundProbe.device.address")}}：</div>
          <div class="detail-content-value">{{device.address}}</div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.alarm")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.soundProbe.device.alarmThreshold")}}：</div>
          <div class="detail-content-value">{{device.alarmThreshold}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.soundProbe.device.alarmDuty")}}：</div>
          <div class="detail-content-value">{{device.alarmDuty}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.soundProbe.device.alarmType")}}：</div>
          <div class="detail-content-value">{{device.alarmType}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.soundProbe.device.alarmCycle")}}：</div>
          <div class="detail-content-value">{{device.alarmCycle}}</div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.others")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.soundProbe.device.heartbeatCycle")}}：</div>
          <div class="detail-content-value">{{device.heartbeatCycle}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Service from '../../../services/sound-probe'
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
