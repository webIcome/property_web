<template>
  <div class="oper-component" @click.stop="">
    <div class="icon-item"><span @click="showModal" class="icon-text">重置密码</span></div>
    <el-dialog :title='$t("dialog.title")' :visible.sync="visible" center :width="'500px'">
      <div class="text-center">
        <div class="dialog-warning"></div>
      </div>
      <p class="warning">（密码重置成功后， 将发送密码至您所设置的邮箱）</p>
      <p class="title">您确认要重置密码吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteDevice">{{$t("dialog.confirm")}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
    import Service from '../../../services/user'
    export default {
        name: 'resetPasswordComponent',
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
                Service.resetPassword({objectid: this.id}).then(res => {
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