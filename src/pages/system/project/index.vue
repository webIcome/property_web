<template>
  <list-content-component :title="title" :service="service">
    <template slot="search" slot-scope="{searchParams}">
      <div class="form-group">
        <label>{{$t("system.project.zhName")}}</label>
        <el-input type="text" v-model="searchParams.zhName" :placeholder='$t("common.input")' clearable/>
      </div>
      <div class="form-group">
        <label>{{$t("system.project.city")}}</label>
        <el-input type="text" v-model="searchParams.city" :placeholder='$t("common.input")' clearable/>
      </div>
      <div class="form-group">
        <label>{{$t("system.project.projectLeader")}}</label>
        <el-input type="text" v-model="searchParams.projectLeader" :placeholder='$t("common.input")' clearable/>
      </div>
      <div class="form-group">
        <label>{{$t("system.project.type")}}</label>
        <el-select v-model="searchParams.type" :placeholder='$t("common.select")' clearable>
          <el-option v-for="type in commercialType" :value="type.value" :key="type.value" :label="type.text"></el-option>
        </el-select>
      </div>
    </template>
    <template slot="table">
      <el-table-column prop="operationtime" :label='$t("system.project.zhName")'></el-table-column>
      <el-table-column prop="operationtime" :label='$t("system.project.enName")'></el-table-column>
      <el-table-column prop="address" :label='$t("system.project.address")'>
        <template slot-scope="scope"><show-position :device='scope.row' :service="service"></show-position></template>
      </el-table-column>
      <el-table-column prop="city" :label='$t("system.project.city")'></el-table-column>
      <el-table-column prop="city" :label='$t("system.project.area")'></el-table-column>
      <el-table-column prop="city" :label='$t("system.project.height")'></el-table-column>
      <el-table-column prop="city" :label='$t("system.project.completionTime")'></el-table-column>
      <el-table-column prop="city" :label='$t("system.project.handover")'></el-table-column>
      <el-table-column prop="city" :label='$t("system.project.projectLeader")'></el-table-column>
      <el-table-column prop="city" :label='$t("system.project.email")'></el-table-column>
      <el-table-column prop="city" :label='$t("system.project.type")'></el-table-column>
    </template>
  </list-content-component>

</template>
<script>
    import Service from "../../../services/project";
    import Constants from "../../../constants/common"
    export default {
        name: 'projectPage',
        data() {
            return {
                service: Service,
                title: this.$t("system.project.title"),
                commercialType: Constants.commercialType
            }
        },
    }
</script>