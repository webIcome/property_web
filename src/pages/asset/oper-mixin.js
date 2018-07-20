/**
 * Created by spring on 2018/7/20.
 */
export default {
    data() {
        return {
            ref: 'edit',
            visible: false,
            data: {},
        }
    },
    props: {
        id: {
            default: ''
        },
        edit: {
            default: false
        }
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
        operate() {
            this.$refs[this.ref].validate(valid => {
                if (valid) {
                    this.service.operate(this.getTransformDataToSend(this.data)).then(res => {
                        this.emitEvent();
                        this.hideModal();
                    });
                }
            })
        },
        getDetail() {
            this.service.getDetail(this.id).then(data => {
                this.data = this.getTransformDataToUse(data);
            })
        },
        getTransformDataToSend(data) {
            return data;
        },
        getTransformDataToUse(data) {
            return data;
        },
        clearValidate() {
            if (this.$refs[this.ref]) this.$refs[this.ref].clearValidate();
        },
        emitEvent() {
            if (this.edit) {
                this.emitEditEvent()
            } else {
                this.emitAddEvent();
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
        },
        resetData() {
            this.data = {}
        }
    },
    watch: {
        visible: function (newValue, oldValue) {
            if (newValue) {
                if (this.edit) this.getDetail();
                this.clearValidate();
            } else {
                this.resetData()
            }
        }
    }
}