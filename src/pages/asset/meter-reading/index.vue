<template>
  <list-content-component :title="title" :service="service">
    <template slot="add" slot-scope="{initList}">
      <oper-component @initPaging="initList"></oper-component>
    </template>
    <template slot="search" slot-scope="{searchParams}">
      <div class="form-group">
        <label>{{$t("asset.meterReading.device.compName")}}</label>
        <el-input type="text" v-model="searchParams.address" :placeholder='$t("common.input")' clearable/>
      </div>
      <div class="form-group">
        <label>{{$t("asset.meterReading.device.sn")}}</label>
        <el-input type="text" v-model="searchParams.assetName" :placeholder='$t("common.input")' clearable/>
      </div>
      <div class="form-group">
        <label>{{$t("asset.meterReading.device.assetName")}}</label>
        <el-input type="text" v-model="searchParams.manufacturer" :placeholder='$t("common.input")' clearable/>
      </div>
      <div class="form-group">
        <label>{{$t("asset.meterReading.device.address")}}</label>
        <el-input type="text" v-model="searchParams.manufacturer" :placeholder='$t("common.input")' clearable/>
      </div>
    </template>
    <template slot="control" slot-scope="{ids, refreshPage}">
      <control-component :deviceIds="ids" @refreshPage="refreshPage"></control-component>
    </template>
    <template slot="table" slot-scope="{isSelectable,pagingEvent}">
      <el-table-column type="selection" width="55" :selectable="isSelectable"></el-table-column>
      <el-table-column prop="sn" :label='$t("asset.meterReading.device.sn")'></el-table-column>
      <el-table-column prop="deviceModel" :label='$t("asset.meterReading.device.deviceModel")'></el-table-column>
      <el-table-column prop="compName" :label='$t("asset.meterReading.device.power")'></el-table-column>
      <el-table-column prop="compName" :label='$t("asset.meterReading.device.compName")'></el-table-column>
      <el-table-column prop="asset" :label='$t("asset.meterReading.device.assetName")'></el-table-column>
      <el-table-column prop="address" :label='$t("asset.meterReading.device.address")'></el-table-column>
      <el-table-column :label='$t("asset.meterReading.device.electricQuantity")'>
        <template slot-scope="scope">
          <span :class="getPowerClass(scope.row.electricQuantity)">
            <span class="icon"></span>
          </span>
        </template>
      </el-table-column>
      <el-table-column min-width="120" :label='$t("asset.meterReading.device.signalQuality")'>
        <template slot-scope="scope">
          <span :class="getSignalClass(scope.row.signalQuality)">
            <span class="icon"></span>
          </span>
        </template>
      </el-table-column>

      <el-table-column :label='$t("common.operation")' width="87">
        <template slot-scope="scope">
          <el-row type="flex" justify="space-between">
            <oper-component :id="scope.row.id" :edit="true" @initCurrentPaging="pagingEvent"></oper-component>
            <delete-component :id="scope.row.id" @initCurrentPaging="pagingEvent"></delete-component>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <detail-component :id="scope.row.id"></detail-component>
        </template>
      </el-table-column>
    </template>
  </list-content-component>
</template>
<script>
    import DetailComponent from "./detail-component";
    import Service from "../../../services/meter-reading"
    import OperComponent from "./oper-component";
    import DeleteComponent from "./delete-component";
    import ControlComponent from "./control/index.vue"
    export default {
        components: {DeleteComponent, DetailComponent, OperComponent, ControlComponent},
        name: 'meterReading',
        data() {
            return {
                service: Service,
                title: this.$t("asset.meterReading.title")
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