<template>
  <list-content-component :title="title" :service="service">
    <template slot="add" slot-scope="{initList}">
      <oper-component @initPaging="initList"></oper-component>
    </template>
    <template slot="search" slot-scope="{searchParams}">
      <div class="form-group">
        <label>{{$t("asset.soundProbe.device.compName")}}</label>
        <select-projects-component v-model="searchParams.projectIds"></select-projects-component>
      </div>
      <div class="form-group">
        <label>{{$t("asset.soundProbe.device.sn")}}</label>
        <el-input type="text" v-model="searchParams.assetName" :placeholder='$t("common.input")' clearable/>
      </div>
      <div class="form-group">
        <label>{{$t("asset.soundProbe.device.assetName")}}</label>
        <select-asset-component v-model="searchParams.assetManageIds"></select-asset-component>
      </div>
      <div class="form-group">
        <label>{{$t("asset.soundProbe.device.address")}}</label>
        <el-input type="text" v-model="searchParams.address" :placeholder='$t("common.input")' clearable/>
      </div>
    </template>
    <template slot="control" slot-scope="{ids, refreshPage}">
      <control-component :deviceIds="ids" @refreshPage="refreshPage"></control-component>
    </template>
    <template slot="table" slot-scope="{isSelectable,pagingEvent,getSignalClass,getPowerClass}">
      <el-table-column type="selection" width="55" :selectable="isSelectable"></el-table-column>
      <el-table-column prop="sn" :label='$t("asset.soundProbe.device.sn")'></el-table-column>
      <el-table-column prop="deviceModel" :label='$t("asset.soundProbe.device.deviceModel")'></el-table-column>
      <el-table-column prop="statusName" :label='$t("asset.soundProbe.device.statusName")'></el-table-column>
      <el-table-column prop="currentValue" :label='$t("asset.soundProbe.device.currentDb")'></el-table-column>
      <el-table-column prop="projectName" :label='$t("asset.soundProbe.device.compName")'></el-table-column>
      <el-table-column prop="assetManageName" :label='$t("asset.soundProbe.device.assetName")'></el-table-column>
      <el-table-column prop="address" :label='$t("asset.soundProbe.device.address")'></el-table-column>
      <el-table-column prop="alarmThreshold" :label='$t("asset.soundProbe.device.alarmThreshold")'></el-table-column>
      <el-table-column prop="alarmType" :label='$t("asset.soundProbe.device.alarmType")'></el-table-column>
      <el-table-column :label='$t("asset.soundProbe.device.electricQuantity")'>
        <template slot-scope="scope">
          <span :class="getPowerClass(scope.row.electricLevel)">
            <span class="icon"></span>
          </span>
        </template>
      </el-table-column>
      <el-table-column min-width="120" :label='$t("asset.soundProbe.device.signalQuality")'>
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
    import Service from "../../../services/sound-probe"
    import OperComponent from "./oper-component";
    import DeleteComponent from "./delete-component";
    import ControlComponent from "./control/index.vue"
    export default {
        components: {DeleteComponent, DetailComponent, OperComponent, ControlComponent},
        name: 'soundProbe',
        data() {
            return {
                service: Service,
                title: this.$t("asset.soundProbe.title")
            }
        },
        methods: {
        }
    }
</script>