<template>
  <div class="form-group">
    <div @click="search" class=" default-btn" style="margin-right: 10px">{{$t("common.search")}}</div>
    <div @click="clearSearchParams" class=" default-btn">{{$t("common.reset")}}</div>
  </div>
</template>
<script>
  export default {
      name: 'listSearchBtnsComponent',
      data: function () {
          return {
          }
      },
      methods: {
          search() {
              this.$emit('search')
          },
          clearSearchParams() {
              this.$emit('clearSearchParams')
          },
          refresh() {
              this.$emit('refresh')
          }
      }
  }
</script>
<style scoped lang="less">
  .form-group {
    margin-right: 25px;
    margin-bottom: 30px;
    display: inline-block;
    vertical-align: middle;
  }
  .default-btn {
    display: inline-block;
    background: #eef1fc;
    padding: 9px 14px;
    color: #5181ed;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    &:hover {
      transform: scale(1.05);
    }
  }
</style>