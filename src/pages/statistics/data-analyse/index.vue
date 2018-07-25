<template>
  <list-content-component :title="title" :service="service">
    <template slot="add" slot-scope="{initList, list, selectionList}">
      <export-data :fileName="fileName" :list="list" :selectionList="selectionList" :title="tableTitle"></export-data>
    </template>
    <template slot="search" slot-scope="{searchParams}">
      <div class="form-group">
        <label>{{$t("statistics.dataAnalyse.type")}}</label>
        <el-input type="text" v-model="searchParams.assetName" :placeholder='$t("common.input")' clearable/>
      </div>
      <div class="form-group">
        <label>{{$t("statistics.dataAnalyse.belongAsset")}}</label>
        <el-input type="text" v-model="searchParams.address" :placeholder='$t("common.input")' clearable/>
      </div>
      <div class="form-group">
        <label>{{$t("statistics.dataAnalyse.address")}}</label>
        <el-input type="text" v-model="searchParams.manufacturer" :placeholder='$t("common.input")' clearable/>
      </div>
      <div class="form-group">
        <label>{{$t("statistics.dataAnalyse.deviceType")}}</label>
        <el-input type="text" v-model="searchParams.manufacturer" :placeholder='$t("common.input")' clearable/>
      </div>
      <div class="form-group">
        <label>{{$t("statistics.dataAnalyse.sn")}}</label>
        <el-input type="text" v-model="searchParams.manufacturer" :placeholder='$t("common.input")' clearable/>
      </div>
      <div class="form-group">
        <label>{{$t("statistics.dataAnalyse.belongProject")}}</label>
        <el-input type="text" v-model="searchParams.manufacturer" :placeholder='$t("common.input")' clearable/>
      </div>
    </template>
    <template slot="table" slot-scope="{isSelectable, pagingEvent}">
      <el-table-column type="selection" width="55" :selectable="isSelectable"></el-table-column>
      <el-table-column prop="sn" :label='$t("statistics.dataAnalyse.type")'></el-table-column>
      <el-table-column prop="deviceModel" :label='$t("statistics.dataAnalyse.belongAsset")'></el-table-column>
      <el-table-column min-width="105" prop="currentLevel" :label='$t("statistics.dataAnalyse.assetName")'></el-table-column>
      <el-table-column prop="compName" :label='$t("statistics.dataAnalyse.belongSys")'></el-table-column>
      <el-table-column prop="asset" :label='$t("statistics.dataAnalyse.address")'></el-table-column>
      <el-table-column prop="address" :label='$t("statistics.dataAnalyse.dataContent")'></el-table-column>
      <el-table-column prop="alarmThreshold" :label='$t("statistics.dataAnalyse.deviceType")'></el-table-column>
      <el-table-column prop="alarmDuty" :label='$t("statistics.dataAnalyse.sn")'></el-table-column>
      <el-table-column prop="alarmType" :label='$t("statistics.dataAnalyse.belongProject")'></el-table-column>
      <el-table-column :label='$t("statistics.dataAnalyse.uploadTime")'>
        <template slot-scope="scope">
          <template>{{scope.row.uptime | formDate}}</template>
        </template>
      </el-table-column>
     
    </template>
  </list-content-component>
</template>
<script>
    import Service from "../../../services/data-analyse"
    import ExportData from "./export-data";
    export default {
        components: {ExportData},
        name: 'dataAnalyse',
        data() {
            return {
                service: Service,
                title: this.$t("statistics.dataAnalyse.title"),
                fileName: Date.parse(new Date()),
                tableTitle: [
                    {type: this.$t("statistics.dataAnalyse.type")},
                    {belongAsset: this.$t("statistics.dataAnalyse.belongAsset")},
                    {assetName: this.$t("statistics.dataAnalyse.assetName")},
                    {belongSys: this.$t("statistics.dataAnalyse.belongSys")},
                    {address: this.$t("statistics.dataAnalyse.address")},
                    {dataContent: this.$t("statistics.dataAnalyse.dataContent")},
                    {deviceType: this.$t("statistics.dataAnalyse.deviceType")},
                    {sn: this.$t("statistics.dataAnalyse.sn")},
                    {belongProject: this.$t("statistics.dataAnalyse.belongProject")},
                    {uploadTime: this.$t("statistics.dataAnalyse.uploadTime")},
                ]
            }
        },
        methods: {
            
        }
    }
</script>