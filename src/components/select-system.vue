<template>
  <el-select v-model="selections" :placeholder='$t("common.select")' clearable @change="change" multiple>
    <el-option v-for="item in systemCodes"
               :value="item.code" :key="item.code" :label="item.name"></el-option>
  </el-select>
</template>
<script>
    export default {
        name: "selectSystemComponent",
        data() {
            return {
                systemCodes: [],
                selections: []
            }
        },
        props: {
            value: ''
        },
        created() {
            this.initSystem();
        },
        methods: {
            initSystem() {
                this.$globalCache.system.then(system => {
                    this.systemCodes = system;
                })
            },
            change(items) {
                this.$emit('input', items.join(','))
            }
        },
    }
</script>