<template>
  <el-select @change="selectLanguage" :value="language">
    <el-option value="en" label="english">english</el-option>
    <el-option value="zh" label="简体中文">简体中文</el-option>
  </el-select>
</template>
<script>
    import Cookie from "../utils/cookie"
    import Type from "../store/types"
    export default {
        name: 'selectLanguageComponent',
        data() {
            return {
                language: ''
            }
        },
        created() {
            this.language = Cookie.getCookie(Type.LANGUAGE)
        },
        methods: {
            selectLanguage(value) {
                Cookie.setCookie(Type.LANGUAGE, value, 365);
                location.reload()
            }
        }
    }
</script>