<template>
  <el-select v-model="selections" :placeholder='$t("common.select")' clearable @change="change">
    <el-option v-for="project in projects"
               :value="project.id" :key="project.id" :label="project.projectName"></el-option>
  </el-select>
</template>
<script>
    import Storage from '../store/user'
    export default {
        name: "selectProjectComponent",
        data() {
            return {
                projects: [],
                selections: ''
            }
        },
        props: {
            value: '',
            defaultId: false
        },
        created() {
            this.initProjects();
        },
        methods: {
            initProjects() {
                this.$globalCache.projects.then(projects => {
                    this.projects = projects;
                    if (this.defaultId) {
                        this.selections = this.projects[0].id
                    }
                })
            },
            change(item) {
                this.$emit('input', item)
            }
        },
    }
</script>