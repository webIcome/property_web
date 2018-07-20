<template>
  <div class="detail">
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.basic")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.standingBook.device.assetCode")}}：</div>
          <div class="detail-content-value"></div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.standingBook.device.assetName")}}：</div>
          <div class="detail-content-value"></div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.standingBook.device.assetType")}}：</div>
          <div class="detail-content-value"></div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.standingBook.device.address")}}：</div>
          <div class="detail-content-value"></div>
        </div>

      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.manufacturers")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.standingBook.device.manufacturer")}}：</div>
          <div class="detail-content-value"></div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.standingBook.device.model")}}：</div>
          <div class="detail-content-value"></div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.standingBook.device.trademark")}}：</div>
          <div class="detail-content-value"></div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.standingBook.device.productionTime")}}：</div>
          <div class="detail-content-value"></div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.standingBook.device.productionCode")}}：</div>
          <div class="detail-content-value"></div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.serviceCondition")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.standingBook.device.status")}}：</div>
          <div class="detail-content-value"></div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.standingBook.device.useTime")}}：</div>
          <div class="detail-content-value"></div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.standingBook.device.durableYears")}}：</div>
          <div class="detail-content-value"></div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.maintenance")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.standingBook.device.quantity")}}：</div>
          <div class="detail-content-value"></div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.standingBook.device.maintenanceUnit")}}：</div>
          <div class="detail-content-value"></div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.standingBook.device.chargePerson")}}：</div>
          <div class="detail-content-value"></div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.standingBook.device.price")}}：</div>
          <div class="detail-content-value"></div>
        </div>
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.standingBook.device.sum")}}：</div>
          <div class="detail-content-value"></div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-title">{{$t("detail.equipment")}}</div>
      <div class="detail-content">
        <div class="detail-content-item">
          <div class="detail-content-label">{{$t("asset.standingBook.device.equipment")}}：</div>
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
    import Service from '../../../services/standing-book'
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
