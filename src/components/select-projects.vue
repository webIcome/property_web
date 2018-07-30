<template>
  <el-select v-model="selections" :placeholder='$t("common.select")' clearable @change="change" multiple>
    <el-option v-for="project in projects"
               :value="project.id" :key="project.id" :label="project.projectName"></el-option>
  </el-select>
</template>
<script>
    import Storage from '../store/user'
    export default {
        name: "selectProjectsComponent",
        data() {
            return {
                projects: [{id: 1, projectName: 'aa'}, {id: 2, projectName: 'bbbb'}],
                selections: []
            }
        },
        props: {
            value: ''
        },
        created() {
            this.initProjects();
            this.initSelection()
        },
        methods: {
            initProjects() {
                this.$globalCache.projects.then(projects => {
                    this.projects = projects;
                })
            },
            initSelection() {
                if (Storage.state.user.projectIds) {
                    this.selections = Storage.state.user.projectIds.split(',')
                    this.change(this.selections);
                }
            },
            change(items) {
                this.$emit('input', items.join(','))
            }
        },
    }
</script>