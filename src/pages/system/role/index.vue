<template>
  <div class="content-right">
    <transition-group name="slide-fade">
      <company-component :key="1" v-if="showCompany" v-model="currentCompany"></company-component>
      <post-component :key="2" v-show="currentCompanyId" :company="currentCompany" v-model="currentPost"></post-component>
      <limitComponent :key="3" v-show="currentPostId" :postId="currentPostId"></limitComponent>
    </transition-group>

  </div>
</template>
<script>

  import companyComponent from "./company.vue"
  import postComponent from "./post.vue"
  import limitComponent from "./limit.vue"
  import Storage from '../../../store/user';
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
          showCompany: function () {
              return Storage.state.user.postid == 1
          },
          currentCompanyId: function () {
              if (this.showCompany) {
                  return this.currentCompany.objectid;
              } else {
                  return Storage.state.user.companyid
              }
          },
          currentPostId: function () {
              return this.currentPost.objectid;
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
    overflow: auto;
    &::-webkit-scrollbar {
      width: 10px;
      cursor: pointer;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: #5181ed;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
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
      /*height: 521px;*/
      .table-tr{
        margin-bottom: 10px;
        background-color: #fff;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &.frozen-row {
          background-color: #ccc;
        }
        &:hover,
        &.current-row {
          background-color: #618ced;
          .table-td{
            color: #fff;
          }
        }
        cursor: pointer;
        .table-td{
          padding: 19px 10px;
          color: #787878;
          flex: 1;
          text-align: center;
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