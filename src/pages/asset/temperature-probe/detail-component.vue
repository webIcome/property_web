<template>
  <div class="detail">
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.basic")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.inundateProbe.device.sn")}}：</div>
          <div class="detail-content-value"></div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.inundateProbe.device.deviceModel")}}：</div>
          <div class="detail-content-value"></div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.inundateProbe.device.statusName")}}：</div>
          <div class="detail-content-value"></div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.status")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.inundateProbe.device.currentTemperature")}}：</div>
          <div class="detail-content-value"></div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.inundateProbe.device.electricQuantity")}}：</div>
          <div class="detail-content-value"></div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.inundateProbe.device.signalQuality")}}：</div>
          <div class="detail-content-value"></div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.belong")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.inundateProbe.device.compName")}}：</div>
          <div class="detail-content-value"></div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.inundateProbe.device.assetName")}}：</div>
          <div class="detail-content-value"></div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.inundateProbe.device.address")}}：</div>
          <div class="detail-content-value"></div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.alarm")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.inundateProbe.device.alarmThreshold")}}：</div>
          <div class="detail-content-value"></div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.inundateProbe.device.alarmDuty")}}：</div>
          <div class="detail-content-value"></div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.inundateProbe.device.alarmType")}}：</div>
          <div class="detail-content-value"></div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.inundateProbe.device.alarmCycle")}}：</div>
          <div class="detail-content-value"></div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.inundateProbe.device.relieveAlarmThreshold")}}：</div>
          <div class="detail-content-value"></div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.others")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.inundateProbe.device.heartbeatCycle")}}：</div>
          <div class="detail-content-value"></div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.inundateProbe.device.collectCycle")}}：</div>
          <div class="detail-content-value"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Service from '../../../services/temperature-probe'
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
