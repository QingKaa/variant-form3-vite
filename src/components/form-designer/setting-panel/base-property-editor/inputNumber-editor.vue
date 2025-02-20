<template>
  <el-form-item :label="i18nt(label)">
    <el-input-number v-model="optionModel[propName]" style="width: 100%" @change="updateValue"></el-input-number>
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
  methods: {
    updateValue(newValue) {
      if (newValue === undefined || newValue === null || isNaN(newValue)) {
        this.optionModel[this.propName] = null;
      } else {
        this.optionModel[this.propName] = Number(newValue);
      }
    },
  },
};
</script>

<style scoped></style>
