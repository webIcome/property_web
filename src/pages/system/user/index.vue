<template>
  <list-content-component :title="title" :service="service" v-if="visible">
    <template slot="search" slot-scope="{searchParams}">
      <div class="form-group">
        <label>{{$t("system.user.name")}}</label>
        <el-input type="text" v-model="searchParams.userinname" :placeholder='$t("common.input")' clearable/>
      </div>
      <div class="form-group">
        <label>{{$t("system.user.projects")}}</label>
        <el-select v-model="searchParams.type" :placeholder='$t("common.select")' clearable>
          <el-option v-for="type in projects" :value="type.value" :key="type.value" :label="type.text"></el-option>
        </el-select>
      </div>
      <div class="form-group">
        <label>{{$t("system.user.job")}}</label>
        <el-input type="text" v-model="searchParams.userinname" :placeholder='$t("common.input")' clearable/>
      </div>
      <div class="form-group">
        <label>{{$t("system.user.phone")}}</label>
        <el-input type="text" v-model="searchParams.userinname" :placeholder='$t("common.input")' clearable/>
      </div>
    </template>
    <template slot="table" slot-scope="{pagingEvent}">
      <el-table-column prop="operationtime" :label='$t("system.user.zhName")'></el-table-column>
      <el-table-column prop="operation" :label='$t("system.user.enName")'></el-table-column>
      <el-table-column prop="companyname" :label='$t("system.user.projects")'></el-table-column>
      <el-table-column prop="username" :label='$t("system.user.role")'></el-table-column>
      <el-table-column prop="username" :label='$t("system.user.job")'></el-table-column>
      <el-table-column prop="username" :label='$t("system.user.phone")'></el-table-column>
      <el-table-column prop="username" :label='$t("system.user.email")'></el-table-column>
      <el-table-column :label='$t("common.operation")' width="170">
        <template slot-scope="scope">
          <el-row type="flex" justify="space-between">
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
    export default {
        components: {ResetPasswordComponent, DeleteComponent},
        name: 'userPage',
        data() {
            return {
                service: Service,
                title: this.$t("system.user.title"),
                projects: [],
                visible: false
            }
        },
        created() {
            this.$globalCache.projects.then(data => {
                this.projects = data;
            })
            this.visible = true;
        }
    }
</script>