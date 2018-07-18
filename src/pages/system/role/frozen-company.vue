<template>
  <div style="margin-right: 25px;">
    <el-button :disabled="!company.objectid" v-if="!isFrozen" @click="frozen(1)" class="edit-btn">{{$t("system.role.frozen")}}</el-button>
    <el-button v-else @click="frozen(0)" class="edit-btn">{{$t("system.role.activate")}}</el-button>
  </div>
</template>
<script>
    import Service from '../../../services/system'
    import CommonConstant from "../../../constants/common";
    export default {
        name: 'frozenCompanyComponent',
        data() {
            return {
                data: {},
                ref: 'edit',
            }
        },
        props: {
            company: {
                default: function () {
                    return {}
                }
            },
        },
        created() {
            this.initData();
        },
        computed: {
            isFrozen: function () {
               return this.company.flag == 1 ? true : false;
            },
        },
        methods: {
            initData() {
            },
            frozen(flag) {
                Service.frozenCompany({objectid: this.company.objectid, opt: flag}).then(res => {
                    this.emitAddEvent();
                })
            },
            emitAddEvent() {
                this.$emit('initPaging')
            },
        },
    }
</script>