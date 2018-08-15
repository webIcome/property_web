<template>
  <div class="content-right">
    <div class="title-header">
      <div class="title-header-content">
        <span>{{title}}</span>
      </div>
      <div class="title-btn">
        <slot name="add" :initList="initList" :table="$refs[tableRef]" :list="list" :selectionList="selectionList"></slot>
      </div>
    </div>
    <div class="search-header" v-if="isSearch">
      <div class="search-header-content">
        <form class="form-inline default-form">
          <slot name="search" :searchParams="searchParams"></slot>
          <list-search-btns-component @search="search" @clearSearchParams="clearSearchParams" @refresh="pagingEvent"></list-search-btns-component>
        </form>
        <div class="control-content">
          <slot name="control" :refreshPage="refreshPage" :ids="selectionDeviceIds"></slot>
        </div>
      </div>
    </div>
    <el-table
        :data="list"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        class="my-table"
        :ref="tableRef">
      <slot name="table" :isSelectable="isSelectable" :pagingEvent="pagingEvent" :getPowerClass="getPowerClass" :getSignalClass="getSignalClass"></slot>
    </el-table>
    <el-row style="padding: 25px 0" type="flex" justify="end">
      <el-pagination
          :ref="pagingRef"
          background
          :current-page.sync="searchParams.pageNum"
          layout="total, prev, pager, next, jumper"
          :page-size.sync="searchParams.pageSize"
          @current-change="pagingEvent"
          :total="searchParams.total">
      </el-pagination>
    </el-row>
  </div>
</template>
<script>
    import Config from "../config";
    import CommonConstant from "../constants/common";
    export default {
        name: 'listContent',
        data() {
            return {
                searchParams: {},
                defaultPaging: {
                    pageSize: Config.DEFAULT_PAGE_SIZE,
                    pageNum: 1
                },
                list: [],
                selectionList: [],
                selectionDeviceIds: [],
                selectionIds: [],
                tableRef: 'my-table',
                pagingRef: 'paging-ref'
            }
        },
        props: {
            service: Object,
            title: String,
            isSearch: {
                default: true
            }
        },
        created() {
            this.initList();
        },
        methods: {
            initList() {
                this.findList(this.defaultPaging);
            },
            findList(params) {
                this.service.findList(params).then(data => {
                    this.searchParams.pageNum = data.pageNum;
                    this.searchParams.pages = data.pages;
                    this.searchParams.pageSize = data.pageSize;
                    this.searchParams.total = data.total;
                    this.list = data.list;
                })
            },
            refreshPage() {
                this.service.findList(this.searchParams).then(data => {
                    this.list.forEach(item => {
                        data.list.forEach(i => {
                            if (i.sn == item.sn) {
                                Object.assign(item, i);
                            }
                        })
                    })
                })
            },
            search: function () {
                this.$refs[this.pagingRef].handleCurrentChange(this.defaultPaging.pageNum)
            },
            pagingEvent(pageNumber) {
                if (pageNumber) this.searchParams.pageNum = pageNumber;
                this.findList(this.searchParams);
            },
            clearSearchParams: function (e) {
                this.searchParams = {};
                this.initList();
            },
            handleSelectionChange(val) {
                this.selectionList = val;
                this.selectionDeviceIds = [];
                val.forEach(item => {
                    this.selectionDeviceIds.push(item.deviceId);
                });
            },
            isSelectable(row,index) {
                return true;
//                return row.status != 1
            },
            getPowerClass(value) {
                let className = '';
                switch (value) {
                    case 1:
                        className = 'full-power';
                        break;
                    case 2:
                        className = 'two-power';
                        break;
                    case 3:
                        className = 'one-power';
                        break;
                    case 4:
                        className = 'no-power';
                        break;
                    default:
                        break;
                }
                return className;
            },
            getSignalClass(value) {
                let className = '';
                switch (value) {
                    case 1:
                        className = 'full-signal';
                        break;
                    case 2:
                        className = 'two-signal';
                        break;
                    case 3:
                        className = 'one-signal';
                        break;
                    case 4:
                        className = 'no-signal';
                        break;
                    default:
                        break;
                }
                return className;
            },
        },
        destroyed() {
        }
    }
</script>
<style lang="less" scoped>
  .content-right {
    .title-header{
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      .title-header-content {
        span {
          display: inline-block;
          height: 30px;
          line-height: 30px;
          padding: 0 20px;
          border-left: 5px solid #5181ed;
          font-size: 14px;
          font-weight: bolder;
          color: #323232;
          letter-spacing: 1px;
        }
      }
      .title-btn {
        display: flex;
      }
    }
    .search-header {
      background: #fff;
      padding: 20px 45px;
      margin-bottom: 22px;
      box-shadow: 0 0 5px #ccc;
      .search-header-content {
        .default-form {
          display: inline-block;
          font-size: 14px;
          label {
            font-weight: bold;
            color: #787878;
            margin-right: 10px;
          }
          .el-input {
            width: 180px;
            &.el-date-editor--datetime {
              width: 200px;
            }
          }
          .el-select {
            width: 200px;
            .el-input {
              width: 100%;
            }
          }
          .form-group {
            margin-right: 25px;
            margin-bottom: 30px;
          }
        }
        .control-content {
          .control-items {
            /*padding-top: 30px;*/
            display: flex;
          }
        }
      }
    }
  }
</style>