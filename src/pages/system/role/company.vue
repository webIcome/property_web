<template>
  <div class="organize-content">
    <div class="organize-title">{{$t("system.role.companyTitle")}} </div>
    <div class="organize-btns">
      <oper-company-component @initPaging="initList"></oper-company-component>
      <oper-company-component @initPaging="initList" :edit="true" :company="currentRow"></oper-company-component>
      <frozen-company-component @initPaging="initList" :company="currentRow"></frozen-company-component>
    </div>
    <div class="table-div">
      <div class="table-thead">
        <div class="table-th">{{$t("system.role.zhName")}}</div>
        <div class="table-th">{{$t("system.role.enName")}}</div>
      </div>
      <div class="table-body">
        <div class="table-tr" v-for="item in list" @click="handleCurrentChange(item)"
             :class="{'current-row': item.objectid == currentRow.objectid, 'frozen-row': item.flag == 1}">
          <div class="table-td">{{item.companyname}}</div>
          <div class="table-td">{{item.parentname}}</div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import Service from "../../../services/system"
  import operCompanyComponent from "./oper-company.vue"
  import FrozenCompanyComponent from "./frozen-company";
    export default {
        name: 'companyComponent',
        components: {
            FrozenCompanyComponent, operCompanyComponent,
        },
        data() {
            return {
                list: [],
                currentRow: {},
                tableRef: 'my-table'
            }
        },
        created() {
//            this.initList();
        },
        methods: {
            initList() {
                Service.getCompanyList().then(list => {
                    this.list = list;
                    this.resetData()
                })
            },

            handleCurrentChange(val) {
                this.currentRow = val;
                this.$emit('input', val);
            },
            resetData() {
                if (!this.currentRow.objectid) return;
                this.list.forEach(item => {
                    if (item.objectid == this.currentRow.objectid) {
                        this.currentRow = item;
                    }
                })
            },
        }
    }
</script>
<style lang="less" scoped>

</style>