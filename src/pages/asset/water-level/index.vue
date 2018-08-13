<template>
  <list-content-component :title="title" :service="service">
    <template slot="add" slot-scope="{initList}">
      <oper-component @initPaging="initList"></oper-component>
    </template>
    <template slot="search" slot-scope="{searchParams}">
      <div class="form-group">
        <label>{{$t("asset.waterLevel.device.compName")}}</label>
        <select-projects-component v-model="searchParams.projectIds"></select-projects-component>
      </div>
      <div class="form-group">
        <label>{{$t("asset.waterLevel.device.sn")}}</label>
        <el-input type="text" v-model="searchParams.assetName" :placeholder='$t("common.input")' clearable/>
      </div>
      <div class="form-group">
        <label>{{$t("asset.waterLevel.device.assetName")}}</label>
        <select-asset-component v-model="searchParams.assetManageIds"></select-asset-component>
      </div>
      <div class="form-group">
        <label>{{$t("asset.waterLevel.device.address")}}</label>
        <el-input type="text" v-model="searchParams.address" :placeholder='$t("common.input")' clearable/>
      </div>
    </template>
    <template slot="control" slot-scope="{ids, refreshPage}">
      <control-component :deviceIds="ids" @refreshPage="refreshPage"></control-component>
    </template>
    <template slot="table" slot-scope="{isSelectable,pagingEvent,getSignalClass,getPowerClass}">
      <el-table-column type="selection" width="55" :selectable="isSelectable"></el-table-column>
      <el-table-column prop="sn" :label='$t("asset.waterLevel.device.sn")'></el-table-column>
      <el-table-column prop="deviceModel" :label='$t("asset.waterLevel.device.deviceModel")'></el-table-column>
      <el-table-column prop="statusName" :label='$t("asset.waterLevel.device.statusName")'></el-table-column>
      <el-table-column prop="currentLevel" :label='$t("asset.waterLevel.device.currentLevel")'></el-table-column>
      <el-table-column prop="projectName" :label='$t("asset.waterLevel.device.compName")'></el-table-column>
      <el-table-column prop="assetManageName" :label='$t("asset.waterLevel.device.assetName")'></el-table-column>
      <el-table-column prop="address" :label='$t("asset.waterLevel.device.address")'></el-table-column>
      <el-table-column prop="alarmThreshold" :label='$t("asset.waterLevel.device.alarmThreshold")'></el-table-column>
      <el-table-column :label='$t("asset.waterLevel.device.alarmDuty")'>
        <template slot-scope="scope">
          {{scope.row.alarmDuty | alarmDutyNameConverter}}
        </template>
      </el-table-column>
      <el-table-column :label='$t("asset.waterLevel.device.electricQuantity")'>
        <template slot-scope="scope">
          <span :class="getPowerClass(scope.row.electricLevel)">
            <span class="icon"></span>
          </span>
        </template>
      </el-table-column>
      <el-table-column min-width="120" :label='$t("asset.waterLevel.device.signalQuality")'>
        <template slot-scope="scope">
          <span :class="getSignalClass(scope.row.signalLevel)">
            <span class="icon"></span>
          </span>
        </template>
      </el-table-column>

      <el-table-column :label='$t("common.operation")' width="87">
        <template slot-scope="scope">
          <el-row type="flex" justify="space-between">
            <oper-component :id="scope.row.deviceId" :edit="true" @initCurrentPaging="pagingEvent"></oper-component>
            <delete-component :id="scope.row.deviceId" @initCurrentPaging="pagingEvent"></delete-component>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <detail-component :id="scope.row.deviceId"></detail-component>
        </template>
      </el-table-column>
    </template>
  </list-content-component>
</template>
<script>
    import DetailComponent from "./detail-component";
    import Service from "../../../services/water-level"
    import OperComponent from "./oper-component";
    import DeleteComponent from "./delete-component";
    import ControlComponent from "./control/index.vue"
    export default {
        components: {DeleteComponent, DetailComponent, OperComponent, ControlComponent},
        name: 'waterLevel',
        data() {
            return {
                service: Service,
                title: this.$t("asset.waterLevel.title")
            }
        },
        methods: {

        }
    }
</script>