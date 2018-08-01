<template>
  <list-content-component :title="title" :service="service">
    <template slot="add" slot-scope="{initList}">
      <oper-component @initPaging="initList"></oper-component>
    </template>
    <template slot="search" slot-scope="{searchParams}">
      <div class="form-group">
        <label>{{$t("asset.door.device.compName")}}</label>
        <select-projects-component v-model="searchParams.projectIds"></select-projects-component>
      </div>
      <div class="form-group">
        <label>{{$t("asset.door.device.sn")}}</label>
        <el-input type="text" v-model="searchParams.assetName" :placeholder='$t("common.input")' clearable/>
      </div>
      <div class="form-group">
        <label>{{$t("asset.door.device.assetName")}}</label>
        <select-asset-component v-model="searchParams.assetManageIds"></select-asset-component>
      </div>
      <div class="form-group">
        <label>{{$t("asset.door.device.address")}}</label>
        <el-input type="text" v-model="searchParams.address" :placeholder='$t("common.input")' clearable/>
      </div>
    </template>
    <template slot="control" slot-scope="{ids, refreshPage}">
      <control-component :deviceIds="ids" @refreshPage="refreshPage"></control-component>
    </template>
    <template slot="table" slot-scope="{isSelectable,pagingEvent,getSignalClass,getPowerClass}">
      <el-table-column type="selection" width="55" :selectable="isSelectable"></el-table-column>
      <el-table-column prop="sn" :label='$t("asset.door.device.sn")'></el-table-column>
      <el-table-column prop="deviceModel" :label='$t("asset.door.device.deviceModel")'></el-table-column>
      <el-table-column :label='$t("asset.door.device.statusName")'>
        <template slot-scope="scope">
          <span
              :class="{'running-success': scope.row.status == 0, 'running-fail': scope.row.status != 0}">
            <span class="running-icon"></span>{{scope.row.statusName}}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="currentDoorStateName" :label='$t("asset.door.device.doorStatusName")'></el-table-column>
      <el-table-column prop="projectName" :label='$t("asset.door.device.compName")'></el-table-column>
      <el-table-column prop="assetManageName" :label='$t("asset.door.device.assetName")'></el-table-column>
      <el-table-column prop="address" :label='$t("asset.door.device.address")'></el-table-column>
      <el-table-column prop="alarmThreshold" :label='$t("asset.door.device.alarmThreshold")'></el-table-column>
      <el-table-column prop="alarmType" :label='$t("asset.door.device.alarmType")'></el-table-column>
      <el-table-column :label='$t("asset.door.device.electricQuantity")'>
        <template slot-scope="scope">
          <span :class="getPowerClass(scope.row.electricLevel)">
            <span class="icon"></span>
          </span>
        </template>
      </el-table-column>
      <el-table-column min-width="120" :label='$t("asset.door.device.signalQuality")'>
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
    import Service from "../../../services/door"
    import OperComponent from "./oper-component";
    import DeleteComponent from "./delete-component";
    import ControlComponent from "./control/index.vue"
    export default {
        components: {DeleteComponent, DetailComponent, OperComponent, ControlComponent},
        name: 'door',
        data() {
            return {
                service: Service,
                title: this.$t("asset.door.title")
            }
        },
        methods: {
           /* getPowerClass(value) {
                let className = '';
                switch (value) {
                    case 1:
                        className = 'full-power';
                        break;
                    case 2:
                        className = 'two-power';
                        break;
                    case 3:
                        className = 'one-power';
                        break;
                    case 4:
                        className = 'no-power';
                        break;
                    default:
                        break;
                }
                return className;
            },
            getSignalClass(value) {
                let className = '';
                switch (value) {
                    case 1:
                        className = 'full-signal';
                        break;
                    case 2:
                        className = 'two-signal';
                        break;
                    case 3:
                        className = 'one-signal';
                        break;
                    case 4:
                        className = 'no-signal';
                        break;
                    default:
                        break;
                }
                return className;
            },*/
        }
    }
</script>