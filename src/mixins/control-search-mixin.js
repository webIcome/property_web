/**
 * Created by spring on 2018/7/24.
 */
export default {
    name: 'searchComponent',
    data() {
        return {
            visible: false,
            operateType: '',
        }
    },
    props: {
        deviceIds: {
            default: function () {
                return []
            }
        },
    },
    methods: {
        controlDevice: function () {
            this.getControlFn(this.operateType)(this.deviceIds.join(',')).then(res => {
                this.hideModal();
                this.initPaging();
            });
        },
        showModal(show) {
            if (!show && this.operateType && this.deviceIds.length) {
                this.visible = true;
            }
        },
        hideModal: function () {
            this.visible = false;
        },
        initPaging() {
            this.$emit('initPaging')
        }
    },
    watch: {
        visible: function (newValue, oldValue) {
            if (!newValue) {
                this.operateType = ''
            }
        }
    }
}