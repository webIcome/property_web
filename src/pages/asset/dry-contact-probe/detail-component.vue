<template>
  <div class="detail">
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.basic")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.dryContactProbe.device.sn")}}：</div>
          <div class="detail-content-value">{{device.sn}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.dryContactProbe.device.deviceModel")}}：</div>
          <div class="detail-content-value">{{device.deviceModel}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.dryContactProbe.device.statusName")}}：</div>
          <div class="detail-content-value">{{device.statusName}}</div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.status")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.dryContactProbe.device.electricQuantity")}}：</div>
          <div class="detail-content-value">{{device.electricQuantity}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.dryContactProbe.device.signalQuality")}}：</div>
          <div class="detail-content-value">{{device.signalQuantity}}</div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.belong")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.dryContactProbe.device.compName")}}：</div>
          <div class="detail-content-value">{{device.projectName}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.dryContactProbe.device.assetName")}}：</div>
          <div class="detail-content-value">{{device.assetManageName}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.dryContactProbe.device.address")}}：</div>
          <div class="detail-content-value">{{device.address}}</div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.alarm")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.dryContactProbe.device.alarmDuty")}}：</div>
          <div class="detail-content-value">{{device.alarmDuty}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.dryContactProbe.device.alarmType")}}：</div>
          <div class="detail-content-value">{{device.alarmType}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.dryContactProbe.device.alarmCycle")}}：</div>
          <div class="detail-content-value">{{device.alarmCycle}}</div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.others")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.dryContactProbe.device.collectCycle")}}：</div>
          <div class="detail-content-value">{{device.collectCycle}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.dryContactProbe.device.electricalLevel")}}：</div>
          <div class="detail-content-value">{{device.turnOffLevel}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Service from '../../../services/dry-contact-probe'
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
