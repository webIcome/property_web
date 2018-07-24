<template>
  <div class="batch-component">
    <el-dropdown @command="handleCommand" trigger="click">
         <el-button type="warning">
           {{$t("common.bulkImport")}}<i class="el-icon-arrow-down el-icon--right"></i>
         </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="download">{{$t("common.download")}}</el-dropdown-item>
        <el-dropdown-item command="upload"> {{$t("common.bulkImport")}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog :title='$t("common.bulkImport")' :visible.sync="visible" center :width="'600px'">
      <el-upload
          class="upload-demo"
          ref="upload"
          drag
          accept=".xlsx"
          :auto-upload="false"
          :data="{type: type}"
          :headers="headers"
          :limit="1"
          :file-list="fileList"
          :http-request="upload"
          :on-success="success"
          :on-error="fault"
          :action="uploadUrl">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip">只能上传xlsx文件，且只能上传一个文件</div>
      </el-upload>
      <div style="display: flex; align-items: center; margin-top: 10px;">
        <div style="margin-bottom: 5px; margin-right: 10px">重复数据：</div>
        <el-radio-group v-model="type">
          <el-radio :label="1">提醒</el-radio>
          <el-radio :label="2">覆盖</el-radio>
          <el-radio :label="3">忽略</el-radio>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="uploadExcel">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="格式提醒" :visible.sync="faultVisible" center :width="'600px'">
      <p class="text-center" v-for="data in faultData">{{data}}</p>
    </el-dialog>
  </div>
</template>
<script>
    import ExcelFileClass from '../utils/excel-file-class'
    import CommonConstant from "../constants/common";
    import Storage from '../store/user';
    import Config from "../config"
    export default {
        name: 'batchCreateDataComponent',
        data() {
            return {
                visible: false,
                ref: 'file-form',
                type: 1,
                headers: {},
                fileList: [],
                uploadVisible: true,
                faultVisible: false,
                faultData: []
            }
        },
        props: {
            fileName: '',
            url: '',
            baseUrl: ''
        },
        computed: {
            uploadUrl: function () {
                return this.url + 'upload'
            },
            downloadUrl: function () {
                return this.url + 'download/template'
            }
        },
        methods: {
            handleCommand(command) {
                let fn;
                switch (command) {
                    case 'download':
                        fn = this.getExcel;
                        break;
                    case 'upload':
                        fn = this.showModal;
                        break;
                }
                fn();
            },
            getExcel() {
                ExcelFileClass.getExcel(this.getBaseUrl(), this.downloadUrl, this.fileName)
            },
            uploadExcel() {
                this.$refs.upload.submit();
            },
            upload(content) {
                ExcelFileClass.uploadExcel(this.getBaseUrl(), this.uploadUrl, {file: content.file, opType: this.type}).then(res => {
                    if (res.data.success) {
                        content.onSuccess(res)
                    } else {
                        content.onError(res)
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            getBaseUrl() {
                if (this.baseUrl) {
                    return this.baseUrl
                } else {
                    return Config.WELL_URL_API;
                }
            },
            showModal() {
                this.visible = true;
            },
            hideModal() {
                this.visible = false;
            },
            showFaultModal() {
                this.faultVisible = true;
            },
            success(response, file, fileList) {
                this.$refs.upload.clearFiles();
                this.hideModal();
                this.emitEvent();
            },
            fault(res, file, fileList) {
                this.faultData = res.data.msg.split(';');
                this.showFaultModal()
            },
            emitEvent() {
                this.$emit('initPaging')
            },
        }
    }
</script>
<style lang="less">
  .batch-component {
    margin-left: 25px;
    .el-button--warning {
      background: #5181ed;
      padding: 12px 10px 12px 30px;
      color: #fff;
      font-size: 14px;
      letter-spacing: 2px;
      cursor: pointer;
      line-height: inherit;
      border: none;
      border-radius: inherit;
    }
    input[type="file"] {
      display: none;
    }
    .el-dialog__body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .upload-demo {
      display: inline-block;
    }
  }
</style>