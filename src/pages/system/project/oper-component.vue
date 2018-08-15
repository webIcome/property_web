<template>
  <div class="oper-component">
    <div v-if="edit" class="icon-item"><span class="edit-icon" @click="showModal"></span></div>
    <div v-else class="icon-item" @click="showModal"><i class="el-icon-plus"></i>{{$t("common.add")}}</div>
    <el-dialog :title="title" :visible.sync="visible" center :width="'800px'">
      <el-form label-width="140px" :model="data" :rules="Rules" :ref="ref" class="el-form-default">
        <el-row>
          <el-col :span="12">
            <el-form-item :label='$t("system.project.zhName")' prop="projectNameCn">
              <el-input v-model.trim="data.projectNameCn" :placeholder='$t("common.input")' clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label='$t("system.project.enName")' prop="projectNameEn">
              <el-input v-model.trim="data.projectNameEn" :placeholder='$t("common.input")'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label='$t("system.project.address")' prop="address">
              <select-position v-model="data.address"></select-position>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label='$t("system.project.area")' prop="floorArea">
              <el-input v-model.trim.number="data.floorArea" :placeholder='$t("common.input")'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label='$t("system.project.height")' prop="floorHight">
              <el-input v-model.trim.number="data.floorHight" :placeholder='$t("common.input")'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label='$t("system.project.completionTime")' prop="bulidYear">
              <el-date-picker v-model="data.bulidYear"  type="date" :value-format="'yyyy-MM-dd'" :placeholder='$t("common.select")'></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label='$t("system.project.handover")' prop="catchTime">
              <el-date-picker v-model="data.catchTime"  type="date" :value-format="'yyyy-MM-dd'" :placeholder='$t("common.select")'></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label='$t("system.project.handover")' prop="catchTime">
              <el-date-picker v-model="data.catchTime"  type="date" :value-format="'yyyy-MM-dd'" :placeholder='$t("common.select")'></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label='$t("system.project.projectLeader")' prop="userName">
              <el-input v-model.trim="data.userName" :placeholder='$t("common.input")'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label='$t("system.project.email")' prop="zipCode">
              <el-input v-model.trim.number="data.zipCode" :placeholder='$t("common.input")'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label='$t("system.project.type")' prop="businessType">
              <el-select v-model="data.businessType" :placeholder='$t("common.select")' clearable style="width: 100%;" multiple>
                <el-option v-for="type in commercialType"
                           :value="type.value" :key="type.value" :label="type.text"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="operate">{{$t("dialog.confirm")}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
    import Service from '../../../services/project'
    import Constants from "../../../constants/common";
    import moment from 'moment'
    export default {
        name: 'operComponent',
        data() {
            return {
                visible: false,
                data: {businessType: []},
                ref: 'edit',
                commercialType: Constants.commercialType,
                Rules: {
                    projectNameCn: [
                        {required: true, message: this.$t("rules.require")},
                    ],
                    address: [
                        {required: true, message: this.$t("rules.require")},
                    ],
                    projectNameEn: [
                        {required: true, message: this.$t("rules.require")},
                    ]
                }
            }
        },
        props: {
            edit: {
                default: false
            },
            project: {
               default: function () {
                   return {}
               }
           }
        },
        created() {
            this.initData();
        },
        computed: {
            title: function () {
                if (this.edit) {
                    return this.$t("common.edit");
                } else {
                    return this.$t("common.add")
                }
            },
        },
        methods: {
            initData() {
            },
            operate() {
                this.$refs[this.ref].validate(valid => {
                    if (valid) {
                        Service.operate(this.getTransformDataToSend(this.data)).then(res => {
                            this.emitEvent();
                            this.hideModal();
                            this.$globalCache.refleshProjects()
                        });
                    }
                })
            },
            getDetail() {
                this.data = this.getTransformDataToUse(this.$common.copyObj(this.project));
            },
            getTransformDataToSend(data) {
                data = this.$common.copyObj(data);
                if (data.businessType) data.businessType = data.businessType.join(',')
                let position = data.address;
                delete data.address;
                data = Object.assign(data, position)
                data.longitude = data.lng;
                data.latitude = data.lat;
                data.address = data.position;
                delete data.position;
                delete data.lng;
                delete data.lat;
                return data;
            },
            getTransformDataToUse(data) {
                data.address = this.getPosition(data);
                if (data.businessType) data.businessType = data.businessType.split(',')
                return data;
            },
            getPosition(position){
                return {
                    position: position.address,
                    lng: position.longitude,
                    lat: position.latitude,
                    province: position.province,
                    city: position.city,
                    district: position.district
                };
            },
            clearValidate() {
                if (this.$refs[this.ref]) this.$refs[this.ref].clearValidate();
            },
            validateField(prop) {
                if (this.$refs[this.ref]) this.$refs[this.ref].validateField(prop, (errorMessage) => {

                })
            },
            emitEvent() {
                if (this.edit) {
                    this.emitEditEvent()
                } else {
                    this.emitAddEvent()
                }
            },
            emitAddEvent() {
                this.$emit('initPaging')
            },
            emitEditEvent() {
                this.$emit('initCurrentPaging')
            },
            showModal() {
                this.visible = true;
            },
            hideModal() {
                this.visible = false;
            }
        },
        watch: {
            visible: function (newValue, oldValue) {
                if (newValue) {
                    if (this.edit) this.getDetail();
                    this.clearValidate();
                } else {
                    this.data = {businessType: []}
                }
            },
            ['data.address']: function (newValue) {
                if (newValue) {
                    this.validateField('address')
                }
            }
        }
    }
</script>