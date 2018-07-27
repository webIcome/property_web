<template>
  <div class="detail">
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.basic")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.waterGage.device.sn")}}：</div>
          <div class="detail-content-value"></div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.waterGage.device.deviceModel")}}：</div>
          <div class="detail-content-value"></div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.waterGage.device.statusName")}}：</div>
          <div class="detail-content-value"></div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.status")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.waterGage.device.currentGage")}}：</div>
          <div class="detail-content-value"></div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.waterGage.device.electricQuantity")}}：</div>
          <div class="detail-content-value"></div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.waterGage.device.signalQuality")}}：</div>
          <div class="detail-content-value"></div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.belong")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.waterGage.device.compName")}}：</div>
          <div class="detail-content-value"></div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.waterGage.device.assetName")}}：</div>
          <div class="detail-content-value"></div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.waterGage.device.address")}}：</div>
          <div class="detail-content-value"></div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.alarm")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.waterGage.device.alarmThreshold")}}：</div>
          <div class="detail-content-value"></div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.waterGage.device.alarmDuty")}}：</div>
          <div class="detail-content-value"></div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.waterGage.device.alarmType")}}：</div>
          <div class="detail-content-value"></div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.waterGage.device.alarmCycle")}}：</div>
          <div class="detail-content-value"></div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.others")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.waterGage.device.heartbeatCycle")}}：</div>
          <div class="detail-content-value"></div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.waterGage.device.collectCycle")}}：</div>
          <div class="detail-content-value"></div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.waterGage.device.range")}}：</div>
          <div class="detail-content-value"></div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.waterGage.device.standardValue")}}：</div>
          <div class="detail-content-value"></div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.remark")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    import Service from '../../../services/water-gage'
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
