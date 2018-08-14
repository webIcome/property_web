<template>
  <el-select :value="selections" :placeholder='$t("common.select")' clearable @change="change" multiple>
    <el-option v-for="project in projects"
               :value="project.id" :key="project.id" :label="project.projectName"></el-option>
  </el-select>
</template>
<script>
    import Language from "../utils/language";
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
                    return this.value.split(',').map(item => Number(item))
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
                    this.projects = this.transformData(projects);
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
            change(items) {
                this.$emit('input', items.join(','))
            }
        },
    }
</script>