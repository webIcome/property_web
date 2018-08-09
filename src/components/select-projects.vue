<template>
  <el-select :value="selections" :placeholder='$t("common.select")' clearable @change="change" multiple>
    <el-option v-for="project in projects"
               :value="project.id" :key="project.id" :label="project.projectName"></el-option>
  </el-select>
</template>
<script>
    export default {
        name: "selectProjectsComponent",
        data() {
            return {
                projects: [{id: 1, projectName: 'aa'}, {id: 2, projectName: 'bbbb'}],
            }
        },
        props: {
            value: ''
        },
        computed: {
            selections: function () {
                if (this.value) {
                    return this.value.split(',')
                } else {
                    return []
                }
            }
        },
        created() {
            this.initProjects();
        },
        methods: {
            initProjects() {
                this.$globalCache.projects.then(projects => {
                    this.projects = projects;
                })
            },
            change(items) {
                this.$emit('input', items.join(','))
            }
        },
    }
</script>