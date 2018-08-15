<template>
  <div>
    <el-button v-if="!value" type="primary" @click="showModal">{{$t("component.select")}}</el-button>
    <div v-else class="show-text" @click.self="showModal">{{name}}<span class="clear" @click.stop="changeSelect">&times;</span>
    </div>
    <el-dialog :title='$t("component.selectAsset")' :visible.sync="visible" center :width="'600px'" append-to-body>
      <el-form :inline="true" label-width="170px" :model="searchParams" ref="editGroup">
        <el-form-item prop="assetName">
          <el-input type="text" v-model="searchParams.assetName" :placeholder='$t("component.inputAssetName")'></el-input>
        </el-form-item>
        <el-form-item prop="assetCode">
          <el-input type="text" v-model="searchParams.assetCode" :placeholder='$t("component.inputAssetCode")'></el-input>
        </el-form-item>
        <el-button type="primary" @click="search" icon="el-icon-search">{{$t("common.search")}}</el-button>
      </el-form>
      <div>
        <el-table ref="singleTable" :data="list" border class="table" @row-click="select" highlight-current-row>
          <el-table-column prop="assetManageSn" :label='$t("asset.standingBook.device.assetCode")'></el-table-column>
          <el-table-column prop="assetManageName" :label='$t("asset.standingBook.device.assetName")'></el-table-column>
        </el-table>
        <el-row type="flex" justify="end">
          <el-pagination
              background
              :current-page="searchParams.pageNum"
              layout="total, prev, pager, next, jumper"
              :page-size="searchParams.pageSize"
              @current-change="pagingEvent"
              :total="searchParams.total">
          </el-pagination>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import Service from '../../services/standing-book'
  import Config from "../../config";
  export default {
      name: 'selectAssetComponent',
      data() {
          return {
              visible: false,
              searchParams: {},
              list: [],
              defaultPaging: {
                  pageSize: Config.DEFAULT_PAGE_SIZE,
                  pageNum: 1
              },
              name: ''
          }
      },
      props: {
          value: '',
          assetManageName: '',
          reset: {
              default: false
          }
      },
      created() {

      },
      methods: {
          search() {
              this.findList(this.searchParams)
          },
          pagingEvent: function (pageNumber) {
              this.searchParams.pageNum = pageNumber;
              this.findList(this.searchParams);
          },
          search: function () {
              this.findList(Object.assign(this.searchParams, this.defaultPaging))
          },
          findList: function (params) {
              Service.findList(params).then(data => {
                  this.searchParams.pageNum = data.pageNum;
                  this.searchParams.pages = data.pages;
                  this.searchParams.pageSize = data.pageSize;
                  this.searchParams.total = data.total;
                  this.list = data.list;
              })
          },
          showModal: function () {
              this.findList(this.defaultPaging);
              this.visible = true;
          },
          select: function (val) {
              this.visible = false;
              this.$emit('input', val.id);
              this.name = val.assetManageName;
          },
          changeSelect: function (val) {
              this.$emit('input', '');
              this.name = '';
          },
      },
      watch: {
          reset: {
              immediate: true,
              handler(val) {
                  if (val) {
                      this.name = this.assetManageName;
                  }
              }
          },
      }
  }
</script>
<style lang="less" scoped>
  .show-text {
    position: relative;
    cursor: pointer;
    color: #1789e1;
    &:hover {
      color: #2b71b8;
    }
  }
  .clear {
    position: absolute;
    right: 10px;
    top: 50%;
    user-select: none;
    margin-top: -13px;
    cursor: pointer;
    font-size: 21px;
    font-weight: 700;
    line-height: 1;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    opacity: .2;
    &:hover {
      color: #000;
      text-decoration: none;
      cursor: pointer;
      opacity: .5;
    }
  }
</style>