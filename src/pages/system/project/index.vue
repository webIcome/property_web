<template>
  <list-content-component :title="title" :service="service">
    <template slot="add" slot-scope="{initList}">
      <oper-component @initPaging="initList"></oper-component>
    </template>
    <template slot="search" slot-scope="{searchParams}">
      <div class="form-group">
        <label>{{$t("system.project.name")}}</label>
        <el-input type="text" v-model="searchParams.projectName" :placeholder='$t("common.input")' clearable/>
      </div>
    </template>
    <template slot="table" slot-scope="{pagingEvent}">
      <el-table-column prop="projectNameCn" :label='$t("system.project.zhName")'></el-table-column>
      <el-table-column prop="projectNameEn" :label='$t("system.project.enName")'></el-table-column>
      <el-table-column :label='$t("system.project.address")'>
        <template slot-scope="scope"><show-position :device='scope.row' :service="service" @initCurrentPaging="pagingEvent"></show-position></template>
      </el-table-column>
      <el-table-column prop="city" :label='$t("system.project.city")'></el-table-column>
      <el-table-column prop="floorArea" :label='$t("system.project.area")'></el-table-column>
      <el-table-column prop="floorHight" :label='$t("system.project.height")'></el-table-column>
      <el-table-column prop="bulidYear" :label='$t("system.project.completionTime")'></el-table-column>
      <el-table-column prop="catchTime" :label='$t("system.project.handover")'></el-table-column>
      <el-table-column prop="userName" :label='$t("system.project.projectLeader")'></el-table-column>
      <el-table-column prop="zipCode" :label='$t("system.project.email")'></el-table-column>
      <el-table-column prop="businessType" :label='$t("system.project.type")'></el-table-column>
      <el-table-column :label='$t("common.operation")' width="87">
        <template slot-scope="scope">
          <el-row type="flex" justify="space-between">
            <oper-component :project="scope.row" :edit="true" @initCurrentPaging="pagingEvent"></oper-component>
            <delete-component :id="scope.row.id" @initCurrentPaging="pagingEvent"></delete-component>
          </el-row>
        </template>
      </el-table-column>
    </template>
  </list-content-component>

</template>
<script>
    import Service from "../../../services/project";
    import Constants from "../../../constants/common"
    import OperComponent from "./oper-component";
    import DeleteComponent from "./delete-component";
    export default {
        components: {DeleteComponent, OperComponent},
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