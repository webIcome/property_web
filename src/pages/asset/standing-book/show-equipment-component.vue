<template>
  <div>
    <div class="show-text"><span @click="showModal">{{showText}}</span></div>
    <el-dialog :title='$t("asset.standingBook.device.equipment")' :visible.sync="visible" center width="500px">
      <el-table ref="singleTable" :data="list" border class="table">
        <el-table-column :label='$t("asset.standingBook.device.sn")' prop="sn" align="center"></el-table-column>
        <el-table-column :label='$t("asset.standingBook.device.deviceModel")' prop="deviceModel" align="center"></el-table-column>
        <el-table-column :label='$t("asset.standingBook.device.terminalType")' prop="terminalType" align="center"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
  import Service from "../../../services/standing-book"
  export default {
      name: 'showEquipmentComponent',
      data() {
          return {
              visible: false,
              list: []
          }
      },
      props: {
          id: ''
      },
      computed: {
          showText: function () {
              return this.list.length
          }
      },
       created() {
          this.initData()
      },
      methods: {
          initData() {
              this.getList()
          },
          getList() {
              Service.getDeviceList(this.id).then(list => {
                  if (list) {
                      this.list = list;
                  }
              })
          },
          showModal() {
              this.visible = true;
          },
          hideModal() {
              this.visible = false;
          }
      },
      watch: {
          id: function () {
              this.getList()
          }
      }
  }
</script>