<template>
  <div>
    <div class="control control-on">
      <el-button :disabled="!deviceIds.length" @click="showModal" class="control-btn">{{$t("control.searchStatus")}}</el-button>
    </div>
    <el-dialog :title='$t("dialog.title")' :visible.sync="visible" center width="600px">
      <div class="text-center">
        <div class="dialog-warning"></div>
      </div>
      <p class="title">{{$t("control.searchStatusTip")}}</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="controlDevice">{{$t("dialog.confirm")}}</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
    import Service from "../../../../services/inundate-probe";
    export default {
        name: 'searchStatusComponent',
        components: {},
        data() {
            return {
                visible: false,
            }
        },
        props: {
            deviceIds: {
                default: function () {
                    return []
                }
            }
        },
        methods: {
            controlDevice: function () {
                Service.controlSearchStatus(this.deviceIds.join(',')).then(res => {
                    this.hideModal();
                    this.initPaging();
                });
            },
            showModal() {
                this.visible = true;
            },
            hideModal: function () {
                this.visible = false;
            },
            initPaging() {
                this.$emit('initPaging')
            }
        }
    }
</script>
