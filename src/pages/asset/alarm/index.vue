<template>
  <list-content-component :title="title" :service="service" :isSearch=false>

    <template slot="table" slot-scope="{isSelectable, pagingEvent}">
      <el-table-column prop="assetManageName" :label='$t("asset.alarm.device.assetName")'></el-table-column>
      <el-table-column prop="address" :label='$t("asset.alarm.device.address")'></el-table-column>
      <el-table-column prop="deviceTypeName" :label='$t("asset.alarm.device.equipment")'></el-table-column>
      <el-table-column prop="content" :label='$t("asset.alarm.device.alarmContent")'></el-table-column>
      <el-table-column prop="assetManageName" :label='$t("asset.alarm.device.alarmType")'></el-table-column>
      <el-table-column prop="address" :label='$t("asset.alarm.device.alarmTime")'></el-table-column>
      <el-table-column prop="statusName" :label='$t("asset.alarm.device.dealStatus")'></el-table-column>
      <el-table-column prop="opTime" :label='$t("asset.alarm.device.dealTime")'></el-table-column>
      <el-table-column prop="opUser" :label='$t("asset.alarm.device.dealPeople")'></el-table-column>
      <el-table-column :label='$t("common.operation")' width="87">
        <template slot-scope="scope">
          
        </template>
      </el-table-column>
      
    </template>
  </list-content-component>
</template>
<script>

    import Service from "../../../services/alarm"

    export default {
        name: 'alarm',
        data() {
            return {
                service: Service,
                title: this.$t("asset.alarm.title")
            }
        },
        methods: {

        }
    }
</script>