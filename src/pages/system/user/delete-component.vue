<template>
  <div class="oper-component" @click.stop="">
    <div class="icon-item">
      <span @click="showModal" class="delete-icon"></span>
    </div>
    <el-dialog :title='$t("dialog.title")' :visible.sync="visible" center :width="'400px'">
      <div class="text-center">
        <div class="dialog-warning"></div>
      </div>
      <p class="title">您确认要删除此账号吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteDevice">{{$t("dialog.confirm")}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
    import Service from '../../../services/user'
    export default {
        name: 'deleteComponent',
        data() {
            return {
                visible: false
            }
        },
        props: {
            id: {
                default: ''
            }
        },
        methods: {
            deleteDevice() {
                Service.deleteUser({objectid: this.id}).then(res => {
                    this.hideModal();
                    this.$emit('initCurrentPaging')
                })
            },
            showModal() {
                this.visible = true;
            },
            hideModal() {
                this.visible = false;
            }
        }
    }
</script>