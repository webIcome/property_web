<template>
  <div class="content-right">
    <transition-group name="slide-fade">
      <company-component :key="1" v-model="currentCompany"></company-component>
      <post-component :key="2" v-show="currentCompanyId" :company="currentCompany" v-model="currentPost"></post-component>
      <limitComponent :key="3" v-show="currentPostId" :postId="currentPostId"></limitComponent>
    </transition-group>

  </div>
</template>
<script>

  import companyComponent from "./company.vue"
  import postComponent from "./post.vue"
  import limitComponent from "./limit.vue"
  export default {
      name: 'organizePage',
      components: {
          companyComponent,
          postComponent,
          limitComponent
      },
      data() {
          return {
              currentCompany: {},
              currentPost: {},
          }
      },
      computed: {
          currentCompanyId: function () {
              return true
//              return this.currentCompany.objectid;
          },
          currentPostId: function () {
              return true
//              return this.currentPost.objectid;
          }
      },
      created() {},
      methods: {

      },
  }
</script>
<style lang="less" scoped>
  .slide-fade-enter-active {
    position: absolute;
    right: 0;
  }
  .slide-fade-leave-active {
    position: absolute;
    right: 0;
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(100px);
    opacity: 0;
  }
  .slide-fade-move {
    transition: transform .5s;
  }
  .content-right {
    &>span {
      display: flex;
      justify-content: space-between;
      .organize-content{
        flex: 1 1 auto;
        margin-right: 30px;
        height: 100%;
      }
    }
  }
</style>
<style lang="less">
  .organize-title {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    padding: 0 20px;
    border-left: 5px solid #5181ed;
    font-size: 14px;
    font-weight: bolder;
    color: #323232;
    letter-spacing: 1px;
    margin-bottom: 25px;
  }
  .table-div{
    font-size: 14px;
    height: 600px;
    background: #fff;
    padding: 20px 30px;
    .table-thead {
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 15px;
      .table-th{
        padding: 12px 0 12px 10px;
        color: #323232;
        flex: 1;
        font-weight: bold;
        text-align: center;
        letter-spacing: 3px;
      }
    }
    .table-body{
      height: 600px;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 10px;
        cursor: pointer;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: #2ca1b9;
      }
      &::-webkit-scrollbar-track {
        background-color: transparent;
      }
      .table-tr{
        margin-bottom: 10px;
        background-color: #25273E;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &.frozen-row {
          background-color: #ccc;
        }
        &:hover,
        &.current-row {
          background-color: #317BD3;
        }
        cursor: pointer;
        .table-td{
          padding: 19px 0 19px 10px;
          color: #787878;
          flex: 1;
        }
      }
    }
  }

  .organize-btns {
    display: flex;
    margin-bottom: 30px;
    .add-btn,
    .edit-btn {
      padding: 10px 35px;
      color: #fff;
      font-size: 14px;
      line-height: inherit;
      font-weight: bold;
      margin-right: 25px;
      &:hover {
        transform: scale(1.05);
      }
      &.is-disabled {
        opacity: 0.5;
        &:hover,
        &:focus {
          color: #c0c4cc;
          transform: scale(1);
        }
        color: #c0c4cc;
      }
    }
    .add-btn {
      background: #ea6a76;
      &:hover {
        background: #ea6a76;
      }
    }
    .edit-btn {
      background: #5082ec;
      &:hover {
        background: #5082ec;
      }
    }
  }

</style>