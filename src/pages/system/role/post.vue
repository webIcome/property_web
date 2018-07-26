<template>
  <div class="organize-content">
    <div class="organize-title">{{$t("system.role.roleTitle")}} </div>
    <div class="organize-btns">
      <oper-post-component @initPaging="refreshPost" :company="company"></oper-post-component>
      <copy-post-component @initPaging="refreshPost" :post="currentRow"></copy-post-component>
      <oper-post-component @initPaging="refreshPost" :edit="true" :post="currentRow"></oper-post-component>
      <frozen-post-component @initPaging="refreshPost" :post="currentRow"></frozen-post-component>
    </div>
    <div class="table-div">
      <div class="table-thead">
        <div class="table-th">{{$t("system.role.belongCompany")}}</div>
        <div class="table-th">{{$t("system.role.roleName")}}</div>
        <div class="table-th">{{$t("system.role.createdName")}}</div>
        <div class="table-th">{{$t("system.role.createdTime")}}</div>
      </div>
      <div class="table-body">
        <div class="table-tr" v-for="item in list" @click="handleCurrentChange(item)"
             :class="{'current-row': item.objectid == currentRow.objectid, 'frozen-row': item.flag == 1}">
          <div v-if="!isEn" class="table-td">{{item.companyname}}</div>
          <div v-else class="table-td">{{item.companynameEn}}</div>
          <div class="table-td">{{item.postname}}</div>
          <div v-if="!isEn" class="table-td">{{item.createman}}</div>
          <div v-else class="table-td">{{item.createmanEn}}</div>
          <div class="table-td">{{item.createtime | formDate('YYYY-MM-DD')}}</div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
    import Service from "../../../services/system"
    import operPostComponent from "./oper-post.vue"
    import FrozenPostComponent from "./frozen-post";
    import CopyPostComponent from "./copy-post";
    import Language from '../../../utils/language'
    export default {
        name: 'postComponent',
        components: {
            CopyPostComponent, FrozenPostComponent, operPostComponent
        },
        data() {
            return {
                list: [],
                currentRow: {},
                tableRef: 'my-table',
                isEn: Language.isEn()
            }
        },
        props: {
            company: '',
        },
        created() {
            this.getPost(this.company.objectid)
        },
        methods: {
            refreshPost() {
                this.getPost(this.company.objectid)
            },
            getPost(id) {
                Service.getPosts(id).then(list => {
                    this.list = list;
                    this.resetData();
                })
            },
            handleCurrentChange(val) {
                this.currentRow = val;
            },
            resetData() {
                if (!this.currentRow.objectid) return;
                this.list.forEach(item => {
                    if (item.objectid == this.currentRow.objectid) {
                        this.currentRow = item;
                    }
                })
            }
        },
        watch: {
            ['company.objectid']: function (newVal, oldVal) {
                if (newVal) this.getPost(newVal)
                this.currentRow = {}
            },
            currentRow: function (newVal) {
                this.$emit('input', newVal);
            }
        }
    }
</script>
<style lang="less" scoped>

</style>