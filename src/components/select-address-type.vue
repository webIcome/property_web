<template>
  <el-select :value="value" :placeholder='$t("common.select")' clearable @change="change">
    <el-option v-for="item in systemCodes"
               :value="item.code" :key="item.code" :label="item.name"></el-option>
  </el-select>
</template>
<script>
    export default {
        name: "selectAddressTypeComponent",
        data() {
            return {
                systemCodes: [],
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
                this.$globalCache.addressType.then(system => {
                    this.systemCodes = system;
                })
            },
            change(items) {
                this.$emit('input', items.join(','))
            }
        },
    }
</script>