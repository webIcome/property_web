<template>
  <el-select v-model="selections"
             :multiple="multiple"
             filterable
             reserve-keyword
             :placeholder='$t("common.select")'
             :remote-method="remoteMethod"
             @change="change"
             :loading="loading"
             remote>
    <el-option v-for="item in assets" :key="item.id" :value="item.id" :label="item.assetManageName"></el-option>
  </el-select>
</template>
<script>
     import Service from "../services/standing-book"
     export default {
         name: 'selectAssetComponent',
         data() {
             return {
                 selections: [],
                 loading: false,
                 assets: []
             }
         },
         props: {
             value: '',
             multiple: false
         },
         methods: {
             remoteMethod(query) {
                 if (query !== '') {
                     this.loading = true;
                     Service.getList({assetManageName: query}).then(list => {
                         this.loading = false;
                         this.assets = list;
                     })
                 }
             },
             change(items) {
                 this.$emit('input', items.join(','))
             }
         }
     }
</script>