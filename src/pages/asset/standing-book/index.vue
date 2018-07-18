<template>
  <list-content-component :title="title" :service="service">
    <template slot="table" slot-scope="{isSelectable}">
      <el-table-column type="selection" width="55" :selectable="isSelectable"></el-table-column>
      <el-table-column prop="deviceName" label="设备名称"></el-table-column>
      <el-table-column prop="sn" label="设备ID"></el-table-column>
      <el-table-column prop="deviceModel" label="设备型号"></el-table-column>
      <el-table-column prop="compName" label="归属项目"></el-table-column>
      <el-table-column label="运行状态">
        <template slot-scope="scope">
          <span
              :class="{'running-success': scope.row.status == 0, 'running-fail': scope.row.status != 0}">
            <span class="running-icon"></span>{{scope.row.statusName}}
          </span>
        </template>
      </el-table-column>
      <el-table-column min-width="105" prop="currentLevel" label="当前水位/cm"></el-table-column>
      <el-table-column prop="alarmThreshold" label="告警阈值"></el-table-column>
      <el-table-column prop="voltage" label="电压V"></el-table-column>
      <el-table-column prop="belongLightId" label="归属灯ID"></el-table-column>
      <el-table-column min-width="90" prop="belongApId" label="归属基站ID"></el-table-column>
      <el-table-column label="地理位置">
        <template slot-scope="scope">
          <show-position :device='scope.row'></show-position>
        </template>
      </el-table-column>
      <el-table-column label="上报时间">
        <template slot-scope="scope">
          <template>{{scope.row.uploadTime | formDate}}</template>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
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
        name: 'standingBook',
        data() {
            return {
                service: {},
                title: this.$t("asset.standingBook.title")
            }
        },
        methods: {

        }
    }
</script>