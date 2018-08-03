<template>
  <div>
    <template v-for="limit in list">
      <div class="limits">
        <div class="limits-parent">
          <span @click="unSelectLimit(limit)" v-if="limit.checked" class="limits-input-checked"></span>
          <span @click="selectLimit(limit)" v-else class="limits-input"></span>
          {{limit.modulename}}</div>
        <div class="limits-children">
          <limit-component v-if="limit.children.length" :list="limit.children"></limit-component>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
    export default {
        name: 'limitComponent',
        data() {
            return {
                isEdit: false,
            }
        },
        props: {
            list: {
                default: function () {
                    return []
                }
            }
        },
        created() {
        },
        methods: {
            getTransformChecked(array) {
                array.forEach(item => {
                    item.checked = JSON.parse(item.checked);
                });
            },
            selectLimit(item, parent) {
//                item.checked = true;
                this.$set(item, 'checked', true)
                if (parent) {
//                    parent.checked = true;
                    this.$set(parent, 'checked', true)
                }
                let that = this;
                function exec(list) {
                    if (list && list.length) {
                        list.forEach(item => {
//                            item.checked = true;
                            that.$set(item, 'checked', true)
                        })
                    } else {
                        return
                    }
                }
                exec(item.children);
            },
            unSelectLimit(item, parent) {
//                item.checked = false;
                this.$set(item, 'checked', false)
                let that = this;
                function exec(list) {
                    if (list && list.length) {
                        list.forEach(item => {
//                            item.checked = false;
                            that.$set(item, 'checked', false)
                        })
                    } else {
                        return
                    }
                }
                exec(item.children);
                if (parent) {
                    let filter = parent.children.every(item => {
                        return !item.checked
                    })
                    if (filter) {
//                        parent.checked = false;
                        this.$set(parent, 'checked', false)
                    }
                }
            },
        },
        watch: {
            list: function (newVal, oldVal) {
//                this.getTransformChecked(newVal)
            },
        }

    }
</script>
<style lang="less" scoped>
  .organize-limit {
    background: #fff;
    border-radius: 4px;
    padding: 10px 9px 25px;
    font-size: 14px;
    max-width: 298px;
    height: 600px;
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
    .limits {
      .limits-parent {
        color: #323232;
        font-weight: bold;
        display: flex;
        align-items: center;
      }
      .limits-children {
        color: #787878;
        display: flex;
        flex-wrap: wrap;
        padding-left: 20px;
        align-content: space-between;
        margin-bottom: 20px;
        .limits-children-item {
          margin: 20px 20px 0 0;
          white-space: nowrap;
          display: flex;
          align-items: center;
        }
      }
      .limits-input-checked,
      .limits-input{
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 7px;
        cursor: pointer;
      }
      .limits-input-checked {
        background: url("../../../assets/system/input-cheked.png") no-repeat center;
        background-size: contain;
      }
      .limits-input {
        background: url("../../../assets/system/input.png") no-repeat center;
        background-size: contain;
      }
    }
  }
</style>