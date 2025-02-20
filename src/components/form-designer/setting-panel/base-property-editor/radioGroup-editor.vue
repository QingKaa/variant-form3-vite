<template>
  <el-form-item :label="i18nt(label)">
    <el-radio-group v-model="optionModel[propName]" >
      <el-radio v-for="item in items" :key="item.key" :label="item.label">
        {{item.title}}
      </el-radio>
    </el-radio-group>
    
  </el-form-item>
</template>

<script>
import i18n from "@/utils/i18n";

export default {
  name: "hidden-editor",
  mixins: [i18n],
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object,

    label: String,
    propName: String,
  },
};
</script>

<style scoped></style>
