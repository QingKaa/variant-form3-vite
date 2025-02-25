<template>
  <el-form-item :label="i18nt('designer.setting.widgetSize')">
    <el-radio-group v-model="optionModel.size">
      <el-radio-button v-for="item in widgetSizes" :key="item.key" v-model="optionModel.size" :value="item.value">{{ i18nt(item.label) }}</el-radio-button>
    </el-radio-group>
  </el-form-item>
</template>

<script>
import i18n from "@/utils/i18n";

export default {
  name: "size-editor",
  mixins: [i18n],
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object,
  },
  data() {
    return {
      widgetSizes: [
        { label: "designer.setting.widgetSizeLarge", value: "large" },
        { label: "designer.setting.widgetSizeDefault", value: "" },
        { label: "designer.setting.widgetSizeSmall", value: "small" },
      ],
    };
  },
};
</script>

<style scoped></style>
