<template>
  <list-content-component :title="title" :service="service">
    <template slot="add" slot-scope="{initList}">
      <oper-component @initPaging="initList"></oper-component>
    </template>
    <template slot="search" slot-scope="{searchParams}">
      <div class="form-group">
        <label>{{$t("asset.bodyProbe.device.compName")}}</label>
        <el-input type="text" v-model="searchParams.projectName" :placeholder='$t("common.input")' clearable/>
      </div>
      <div class="form-group">
        <label>{{$t("asset.bodyProbe.device.sn")}}</label>
        <el-input type="text" v-model="searchParams.sn" :placeholder='$t("common.input")' clearable/>
      </div>
      <div class="form-group">
        <label>{{$t("asset.bodyProbe.device.assetName")}}</label>
        <el-input type="text" v-model="searchParams.assetManageName" :placeholder='$t("common.input")' clearable/>
      </div>
      <div class="form-group">
        <label>{{$t("asset.bodyProbe.device.address")}}</label>
        <el-input type="text" v-model="searchParams.address" :placeholder='$t("common.input")' clearable/>
      </div>
    </template>
    <template slot="control" slot-scope="{ids, refreshPage}">
      <control-component :deviceIds="ids" @refreshPage="refreshPage"></control-component>
    </template>
    <template slot="table" slot-scope="{isSelectable,pagingEvent}">
      <el-table-column type="selection" width="55" :selectable="isSelectable"></el-table-column>
      <el-table-column prop="sn" :label='$t("asset.bodyProbe.device.sn")'></el-table-column>
      <el-table-column prop="deviceModel" :label='$t("asset.bodyProbe.device.deviceModel")'></el-table-column>
      <el-table-column prop="statusName" :label='$t("asset.bodyProbe.device.statusName")'></el-table-column>
      <el-table-column prop="projectName" :label='$t("asset.bodyProbe.device.compName")'></el-table-column>
      <el-table-column prop="assetManageName" :label='$t("asset.bodyProbe.device.assetName")'></el-table-column>
      <el-table-column prop="address" :label='$t("asset.bodyProbe.device.address")'></el-table-column>
      <el-table-column prop="judgeSomebody" :label='$t("asset.bodyProbe.device.peopleJudge")'></el-table-column>
      <el-table-column prop="judgeNobody" :label='$t("asset.bodyProbe.device.noOneJudge")'></el-table-column>
      <el-table-column :label='$t("asset.bodyProbe.device.electricQuantity")'>
        <template slot-scope="scope">
          <span :class="getPowerClass(scope.row.electricLevel)">
            <span class="icon"></span>
          </span>
        </template>
      </el-table-column>
      <el-table-column min-width="120" :label='$t("asset.bodyProbe.device.signalQuality")'>
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
    import Service from "../../../services/body-probe"
    import OperComponent from "./oper-component";
    import DeleteComponent from "./delete-component";
    import ControlComponent from "./control/index.vue"
    export default {
        components: {DeleteComponent, DetailComponent, OperComponent, ControlComponent},
        name: 'bodyProbe',
        data() {
            return {
                service: Service,
                title: this.$t("asset.bodyProbe.title")
            }
        },
        methods: {
            getPowerClass(value) {
                if (!value) return;
                if (value > 3.1) {
                    return 'full-power'
                } else if (value > 2.9) {
                    return 'two-power'
                } else if (value > 2.7) {
                    return 'one-power'
                } else {
                    return 'no-power'
                }
            },
            getSignalClass(value) {
                if (!value) return 'no-signal';
                if (value > 115) {
                    return 'one-signal'
                } else if (value > 105) {
                    return 'two-signal'
                } else {
                    return 'full-signal'
                }
            },
        }
    }
</script>