<template>
  <el-popover
      placement="right"
      trigger="hover"
      :disabled="!length"
      @show="findProjects"
  >
    <table class="table table-striped">
      <thead>
      <tr>
        <th>{{$t("system.project.zhName")}}</th>
        <th>{{$t("system.project.enName")}}</th>
        <th>{{$t("system.project.city")}}</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="item in list">
          <td>{{item.projectNameCn}}</td>
          <td>{{item.projectNameEn}}</td>
          <td>{{item.city}}</td>
        </tr>
      </tbody>
    </table>
    <span slot="reference">{{length}}</span>
  </el-popover>
</template>
<script>
    import Service from '../../../services/project'
    export default {
        name: 'showProjectsComponent',
        data() {
            return {
                list: [],
                isInit: false
            }
        },
        props: {
            id: '',
            projectIds: ''
        },
        computed: {
            length: function () {
                if (this.projectIds) {
                    return this.projectIds.split(',').length
                } else {
                    return 0
                }
            }
        },
        created() {

        },
        methods: {
            findProjects() {
                if (this.isInit) return;
                Service.getList({userId: this.id}).then(list => {
                    this.list = list;
                    this.isInit = true;
                })
            }
        }
    }
</script>