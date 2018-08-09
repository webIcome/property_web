<template>
  <list-content-component :title="title" :service="service" v-if="visible">
    <template slot="add" slot-scope="{initList}">
      <oper-component @initPaging="initList"></oper-component>
    </template>
    <template slot="search" slot-scope="{searchParams}">
      <div class="form-group">
        <label>{{$t("system.user.name")}}</label>
        <el-input type="text" v-model="searchParams.prousername" :placeholder='$t("common.input")' clearable/>
      </div>
      <div class="form-group">
        <label>{{$t("system.user.projects")}}</label>
        <select-projects-component v-model="searchParams.projectids"></select-projects-component>
      </div>
      <div class="form-group">
        <label>{{$t("system.user.job")}}</label>
        <el-input type="text" v-model="searchParams.job" :placeholder='$t("common.input")' clearable/>
      </div>
      <div class="form-group">
        <label>{{$t("system.user.phone")}}</label>
        <el-input type="text" v-model="searchParams.linkphone" :placeholder='$t("common.input")' clearable/>
      </div>
    </template>
    <template slot="table" slot-scope="{pagingEvent}">
      <el-table-column prop="username" :label='$t("system.user.zhName")'></el-table-column>
      <el-table-column prop="usernameEn" :label='$t("system.user.enName")'></el-table-column>
      <el-table-column prop="companyname" :label='$t("system.user.projects")'>
        <templage slot-scope="scope">
          <show-projects-component :id="scope.row.objectid" :projectIds="scope.row.projectIds"></show-projects-component>
        </templage>
      </el-table-column>
      <el-table-column prop="postname" :label='$t("system.user.role")'></el-table-column>
      <el-table-column prop="job" :label='$t("system.user.job")'></el-table-column>
      <el-table-column prop="linkphone" :label='$t("system.user.phone")'></el-table-column>
      <el-table-column prop="email" :label='$t("system.user.email")'></el-table-column>
      <el-table-column :label='$t("common.operation")' width="200">
        <template slot-scope="scope">
          <el-row type="flex" justify="space-between">
            <oper-component :edit="true" :user="scope.row" @initCurrentPaging="pagingEvent"></oper-component>
            <delete-component :id="scope.row.objectid" @initCurrentPaging="pagingEvent"></delete-component>
            <reset-password-component :id="scope.row.objectid" @initCurrentPaging="pagingEvent"></reset-password-component>
          </el-row>
        </template>
      </el-table-column>
    </template>
  </list-content-component>

</template>
<script>
    import Service from "../../../services/user";
    import DeleteComponent from "./delete-component";
    import ResetPasswordComponent from "./reset-password-component";
    import OperComponent from "./oper-component";
    import ShowProjectsComponent from "./show-projects-component";
    export default {
        components: {ShowProjectsComponent, OperComponent, ResetPasswordComponent, DeleteComponent},
        name: 'userPage',
        data() {
            return {
                service: Service,
                title: this.$t("system.user.title"),
                visible: false
            }
        },
        created() {
            this.visible = true;
        }
    }
</script>