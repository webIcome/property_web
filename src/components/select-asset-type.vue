<template>
  <el-select :value="selections" :placeholder='$t("common.select")' clearable @change="change" multiple>
    <el-option v-for="item in systemCodes"
               :value="item.code" :key="item.code" :label="item.name"></el-option>
  </el-select>
</template>
<script>
    export default {
        name: "selectAssetTypeComponent",
        data() {
            return {
                systemCodes: [],
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
            this.initSystem();
        },
        methods: {
            initSystem() {
                this.$globalCache.assetType.then(system => {
                    this.systemCodes = system;
                })
            },
            change(items) {
                this.$emit('input', items.join(','))
            }
        },
    }
</script>