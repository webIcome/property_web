<template>
  <list-content-component :title="title" :service="service">
    <template slot="search" slot-scope="{searchParams}">
      <div class="form-group">
        <label>{{$t("system.log.operationTime")}}</label>
        <el-date-picker id="date-start" v-model="searchParams.operationtimelow"  type="datetime" :value-format="'yyyy-MM-dd HH:mm:ss'" :placeholder='$t("common.select")'></el-date-picker>
      </div>
      <div class="form-group">
        <label>{{$t("system.log.to")}}</label>
        <el-date-picker id="date-end" v-model="searchParams.operationtimehigh" type="datetime" :value-format="'yyyy-MM-dd HH:mm:ss'" :placeholder='$t("common.select")'></el-date-picker>
      </div>
      <div class="form-group">
        <label>{{$t("system.log.username")}}</label>
        <el-input type="text" v-model="searchParams.loginname" :placeholder='$t("common.input")' clearable/>
      </div>
    </template>
    <template slot="table">
      <el-table-column prop="operationtime" :label='$t("system.log.operationTime")'></el-table-column>
      <el-table-column prop="operation" :label='$t("system.log.operation")'></el-table-column>
      <el-table-column prop="companyname" :label='$t("system.log.compName")'></el-table-column>
      <el-table-column prop="username" :label='$t("system.log.username")'></el-table-column>
    </template>
  </list-content-component>

</template>
<script>
    import Service from "../../../services/log";
    export default {
        name: 'logPage',
        data() {
            return {
                service: Service,
                title: this.$t("system.log.title")
            }
        },
    }
</script>