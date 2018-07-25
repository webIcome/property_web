<template>
  <div class="export" @click="exportExcel">{{$t("statistics.dataAnalyse.export")}}</div>
</template>
<script>
    import FileSaver from 'file-saver'
    import XLSX from 'xlsx'
    export default {
        name: "exportData",
        data() {
            return {}
        },
        props: {
            fileName: '',
            list: {
                default: function () {
                    return []
                }
            },
            selectionList: {
                default: function () {
                    return [
                    ]
                }
            },
            title: {
                default: function () {
                    return []
                }
            },
        },
        methods: {
            exportExcel () {
                let worksheet = XLSX.utils.aoa_to_sheet(this.getTableData());
                let new_workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(new_workbook, worksheet, this.$t("statistics.dataAnalyse.title"));
                let wbout = XLSX.write(new_workbook, {bookType: 'xlsx', bookSST: true, type: 'array'});
                try {
                    FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), this.fileName + '.xlsx');
                } catch (e) {
                    if (typeof console !== 'undefined')
                        console.log(e, wbout)
                }
                return wbout
            },
            getTableData() {
                let list = [];
                if (this.selectionList.length) {
                    list = this.selectionList;
                } else {
                    list = this.list;
                }
                let data = [[]];
                let keys = [];
                this.title.forEach(item => {
                    for (let key in item) {
                        keys.push(key)
                        data[0].push(item[key])
                    }
                });
                list.forEach((item, index) => {
                    data[index + 1] = [];
                    for (let itemKey in item) {
                        keys.forEach((key, keyIndex) => {
                            if (key == itemKey) {
                                data[index +1][keyIndex] = item[itemKey];
                            }
                        })
                    }
                });
                return data;
            },
        }
    }
</script>
<style lang="less" scoped>
  .export {
    background: #5181ed;
    padding: 12px 30px;
    color: #fff;
    font-size: 14px;
    letter-spacing: 2px;
    cursor: pointer;
  }
</style>