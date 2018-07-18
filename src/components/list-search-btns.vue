<template>
  <div style="display: inline">
    <div @click="search" class="form-group default-btn" style="margin-right: 10px">{{$t("common.search")}}</div>
    <div @click="clearSearchParams" class="form-group default-btn">{{$t("common.reset")}}</div>
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
  .default-btn {
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