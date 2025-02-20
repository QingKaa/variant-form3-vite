<template>
    <el-form-item :label="i18nt(label)">
      <el-input type="text" v-model="optionModel[propName]"></el-input>
    </el-form-item>
  </template>
  
  <script>
    import i18n from "@/utils/i18n"
  
    export default {
      name: "hidden-editor",
      mixins: [i18n],
      props: {
        designer: Object,
        selectedWidget: Object,
        optionModel: Object,

        label: String,
        propName: String
      },
    }
  </script>
  
  <style scoped>
  
  </style>
  