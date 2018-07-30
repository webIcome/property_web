<template>
  <div class="detail">
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.basic")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.bodyProbe.device.sn")}}：</div>
          <div class="detail-content-value">{{device.sn}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.bodyProbe.device.deviceModel")}}：</div>
          <div class="detail-content-value">{{device.deviceModel}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.bodyProbe.device.statusName")}}：</div>
          <div class="detail-content-value">{{device.statusName}}</div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.status")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.bodyProbe.device.electricQuantity")}}：</div>
          <div class="detail-content-value">{{device.electricLevel}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.bodyProbe.device.signalQuality")}}：</div>
          <div class="detail-content-value">{{device.signalLevel}}</div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.belong")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.bodyProbe.device.compName")}}：</div>
          <div class="detail-content-value">{{device.projectName}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.bodyProbe.device.assetName")}}：</div>
          <div class="detail-content-value">{{device.assetManageName}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.bodyProbe.device.address")}}：</div>
          <div class="detail-content-value">{{device.address}}</div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.others")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.bodyProbe.device.peopleJudge")}}：</div>
          <div class="detail-content-value">{{device.judgeSomebody}}</div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.bodyProbe.device.noOneJudge")}}：</div>
          <div class="detail-content-value">{{device.judgeNobody}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Service from '../../../services/body-probe'
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
