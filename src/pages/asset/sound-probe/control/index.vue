<template>
  <div class="control-items">
    <search-status-component :deviceIds="deviceIds" @initPaging="initPaging"></search-status-component>
    <set-component :deviceIds="deviceIds" @initPaging="initPaging"></set-component>
  </div>
</template>

<script>
    import controlTimerMixin from '../../../../mixins/control-timer-mixin'
    import SearchStatusComponent from "./search-status-component";
    import SetComponent from "./set-component";

    export default {
        name: 'controlComponent',
        components: {SetComponent, SearchStatusComponent},
        mixins: [controlTimerMixin],
        props: {
            deviceIds: {
                default: function () {
                    return []
                }
            }
        },
        created: function () {
        },
        methods: {

        }
    }
</script>

