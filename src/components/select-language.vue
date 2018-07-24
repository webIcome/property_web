<template>
  <el-select @change="selectLanguage" :value="language">
    <el-option value="en" label="english">english</el-option>
    <el-option value="zh" label="简体中文">简体中文</el-option>
  </el-select>
</template>
<script>
    import Language from "../utils/language"
    export default {
        name: 'selectLanguageComponent',
        data() {
            return {
                language: ''
            }
        },
        created() {
            this.language = Language.getLanguage()
        },
        methods: {
            selectLanguage(value) {
                Language.setLanguage(value, 365)
            }
        }
    }
</script>