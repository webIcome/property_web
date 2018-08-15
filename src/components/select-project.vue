<template>
  <el-select :value="value" :placeholder='$t("common.select")' clearable @change="change">
    <el-option v-for="project in projects"
               :value="project.id" :key="project.id" :label="project.projectName"></el-option>
  </el-select>
</template>
<script>
    import Storage from '../store/user'
    import Language from "../utils/language";
    export default {
        name: "selectProjectComponent",
        data() {
            return {
                projects: [],
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
                    this.projects = this.transformData(projects);;
                    if (this.defaultId) {
                        this.change('input', this.projects[0].id)
                    }
                })
            },
            transformData(list) {
                return list.map(item => {
                    return {id: item.id, projectName: this.getName(item)}
                })
            },
            getName(data) {
                if (Language.isEn()) {
                    return data.projectNameEn
                } else {
                    return data.projectNameCn
                }
            },
            change(item) {
                this.$emit('input', item)
            }
        },
    }
</script>