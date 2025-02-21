<template>
  <el-form-item :label="i18nt('designer.setting.labelIconPosition')">
    <el-radio-group v-model="optionModel.labelIconPosition">
      <el-radio-button v-for="item in labelIconPosition" :key="item.key" :value="item.value">
        {{ i18nt(item.label) }}
      </el-radio-button>
    </el-radio-group>
  </el-form-item>
</template>

<script>
import i18n from "@/utils/i18n";

export default {
  name: "labelIconPosition-editor",
  mixins: [i18n],
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object,
  },
  data() {
    return {
      labelIconPosition: [
        { label: "designer.setting.labelIconPositionFront", value: "front" },
        { label: "designer.setting.labelIconPositionRear", value: "rear" },
      ],
    };
  },
};
</script>

<style scoped></style>
