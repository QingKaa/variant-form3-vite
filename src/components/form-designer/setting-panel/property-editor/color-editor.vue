<template>
    <el-form-item :label="i18nt('designer.setting.textColor')">
      <el-color-picker v-model="optionModel.color" @change="emitDefaultValueChange">
      </el-color-picker>
    </el-form-item>
  </template>
  
  <script>
    import i18n from "@/utils/i18n"
    import propertyMixin from "@/components/form-designer/setting-panel/property-editor/propertyMixin"
  
    export default {
      name: "color-editor",
      mixins: [i18n, propertyMixin],
      props: {
        designer: Object,
        selectedWidget: Object,
        optionModel: Object,
      },
    }
  </script>
  
  <style scoped>
  
  </style>
  