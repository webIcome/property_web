<template>
  <list-content-component :title="title" :service="service">
    <template slot="add" slot-scope="{initList}">
      <oper-component @initPaging="initList"></oper-component>
    </template>
    <template slot="search" slot-scope="{searchParams}">
      <div class="form-group">
        <label>{{$t("asset.standingBook.device.project")}}</label>
        <select-projects-component v-model="searchParams.projectIds"></select-projects-component>
      </div>
      <div class="form-group">
        <label>{{$t("asset.standingBook.device.address")}}</label>
        <el-input type="text" v-model="searchParams.address" :placeholder='$t("common.input")' clearable/>
      </div>
      <div class="form-group">
        <label>{{$t("asset.standingBook.device.assetName")}}</label>
        <el-input type="text" v-model="searchParams.assetManageName" :placeholder='$t("common.input")' clearable/>
      </div>
      <div class="form-group">
        <label>{{$t("asset.standingBook.device.belongSystem")}}</label>
       <select-system-component v-model="searchParams.sysCodes"></select-system-component>
      </div>
    </template>
    <template slot="table" slot-scope="{isSelectable,pagingEvent}">
      <el-table-column type="selection" width="55" :selectable="isSelectable"></el-table-column>
      <el-table-column prop="assetManageSn" :label='$t("asset.standingBook.device.assetCode")'></el-table-column>
      <el-table-column prop="assetManageName" :label='$t("asset.standingBook.device.assetName")'></el-table-column>
      <el-table-column prop="deviceTypeName" :label='$t("asset.standingBook.device.assetType")'></el-table-column>
      <el-table-column prop="address" :label='$t("asset.standingBook.device.address")'></el-table-column>
      <el-table-column prop="addressType" :label='$t("asset.standingBook.device.addressType")'></el-table-column>
      <el-table-column prop="vendor" :label='$t("asset.standingBook.device.manufacturer")'></el-table-column>
      <el-table-column prop="deviceModel" :label='$t("asset.standingBook.device.model")'></el-table-column>
      <el-table-column :label='$t("asset.standingBook.device.equipment")'>
        <template slot-scope="scope">
          <show-equipment-component :id="scope.row.id"></show-equipment-component>
        </template>
      </el-table-column>
      <el-table-column prop="sysCodeName" :label='$t("asset.standingBook.device.belongSystem")'></el-table-column>
      <el-table-column prop="status" :label='$t("asset.standingBook.device.status")'></el-table-column>

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
    import OperComponent from "./oper-component";
    import Service from "../../../services/standing-book"
    import DetailComponent from "./detail-component";
    import DeleteComponent from "./delete-component";
    import ShowEquipmentComponent from "./show-equipment-component";
    export default {
        components: {ShowEquipmentComponent, DeleteComponent, DetailComponent, OperComponent},
        name: 'standingBookPage',
        data() {
            return {
                service: Service,
                title: this.$t("asset.standingBook.title")
            }
        },
        methods: {

        }
    }
</script>