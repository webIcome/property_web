<template>
  <list-content-component :title="title" :service="service">
    <template slot="add" slot-scope="{initList}">
      <oper-component @initPaging="initList"></oper-component>
    </template>
    <template slot="search" slot-scope="{searchParams}">
      <div class="form-group">
        <label>{{$t("asset.inundateProbe.device.compName")}}</label>
        <select-projects-component v-model="searchParams.projectIds"></select-projects-component>
      </div>
      <div class="form-group">
        <label>{{$t("asset.inundateProbe.device.sn")}}</label>
        <el-input type="text" v-model="searchParams.assetName" :placeholder='$t("common.input")' clearable/>
      </div>
      <div class="form-group">
        <label>{{$t("asset.inundateProbe.device.assetName")}}</label>
        <select-asset-component v-model="searchParams.assetManageIds"></select-asset-component>
      </div>
      <div class="form-group">
        <label>{{$t("asset.inundateProbe.device.address")}}</label>
        <el-input type="text" v-model="searchParams.address" :placeholder='$t("common.input")' clearable/>
      </div>
    </template>
    <template slot="control" slot-scope="{ids, refreshPage}">
      <control-component :deviceIds="ids" @refreshPage="refreshPage"></control-component>
    </template>
    <template slot="table" slot-scope="{isSelectable,pagingEvent,getSignalClass,getPowerClass}">
      <el-table-column type="selection" width="55" :selectable="isSelectable"></el-table-column>
      <el-table-column prop="sn" :label='$t("asset.inundateProbe.device.sn")'></el-table-column>
      <el-table-column prop="deviceModel" :label='$t("asset.inundateProbe.device.deviceModel")'></el-table-column>
      <el-table-column prop="stausName" :label='$t("asset.inundateProbe.device.statusName")'></el-table-column>
      <el-table-column prop="projectName" :label='$t("asset.inundateProbe.device.compName")'></el-table-column>
      <el-table-column prop="assetManageName" :label='$t("asset.inundateProbe.device.assetName")'></el-table-column>
      <el-table-column prop="address" :label='$t("asset.inundateProbe.device.address")'></el-table-column>
      <el-table-column prop="alarmThreshold" :label='$t("asset.inundateProbe.device.alarmThreshold")'></el-table-column>
      <el-table-column :label='$t("asset.inundateProbe.device.alarmDuty")'>
        <template slot-scope="scope">
          {{scope.row.alarmDuty | alarmDutyNameConverter}}
        </template>
      </el-table-column>
      <el-table-column :label='$t("asset.inundateProbe.device.electricQuantity")'>
        <template slot-scope="scope">
          <span :class="getPowerClass(scope.row.electricLevel)">
            <span class="icon"></span>
          </span>
        </template>
      </el-table-column>
      <el-table-column min-width="120" :label='$t("asset.inundateProbe.device.signalQuality")'>
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
    import Service from "../../../services/inundate-probe"
    import OperComponent from "./oper-component";
    import DeleteComponent from "./delete-component";
    import ControlComponent from "./control/index.vue"
    export default {
        components: {DeleteComponent, DetailComponent, OperComponent, ControlComponent},
        name: 'inundateProbe',
        data() {
            return {
                service: Service,
                title: this.$t("asset.inundateProbe.title")
            }
        },
        methods: {
        }
    }
</script>