<template>
  <list-content-component :title="title" :service="service">
    <template slot="table" slot-scope="{isSelectable}">
      <el-table-column type="selection" width="55" :selectable="isSelectable"></el-table-column>
      <el-table-column prop="sn" :label='$t("asset.waterLevel.device.sn")'></el-table-column>
      <el-table-column prop="deviceModel" :label='$t("asset.waterLevel.device.deviceModel")'></el-table-column>
      <el-table-column :label='$t("asset.waterLevel.device.statusName")'>
        <template slot-scope="scope">
          <span
              :class="{'running-success': scope.row.status == 0, 'running-fail': scope.row.status != 0}">
            <span class="running-icon"></span>{{scope.row.statusName}}
          </span>
        </template>
      </el-table-column>
      <el-table-column min-width="105" prop="currentLevel" :label='$t("asset.waterLevel.device.currentLevel")'></el-table-column>
      <el-table-column prop="compName" :label='$t("asset.waterLevel.device.compName")'></el-table-column>
      <el-table-column prop="asset" :label='$t("asset.waterLevel.device.assetName")'></el-table-column>
      <el-table-column prop="address" :label='$t("asset.waterLevel.device.address")'></el-table-column>
      <el-table-column prop="alarmThreshold" :label='$t("asset.waterLevel.device.alarmThreshold")'></el-table-column>
      <el-table-column prop="alarmDuty" :label='$t("asset.waterLevel.device.alarmDuty")'></el-table-column>
      <el-table-column prop="alarmType" :label='$t("asset.waterLevel.device.alarmType")'></el-table-column>
      <el-table-column prop="electricQuantity" :label='$t("asset.waterLevel.device.electricQuantity")'></el-table-column>
      <el-table-column prop="signalQuality" :label='$t("asset.waterLevel.device.signalQuality")'></el-table-column>

      <el-table-column :label='$t("common.operation")' width="100">
        <template slot-scope="scope">
          <el-row type="flex">

          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="scope">
        </template>
      </el-table-column>
    </template>
  </list-content-component>
</template>
<script>
    export default {
        name: 'waterLevel',
        data() {
            return {
                service: {},
                title: this.$t("asset.waterLevel.title")
            }
        },
        methods: {

        }
    }
</script>