<template>
  <static-content-wrapper
    :designer="designer"
    :field="field"
    :design-state="designState"
    :parent-widget="parentWidget"
    :parent-list="parentList"
    :index-of-parent-list="indexOfParentList"
    :sub-form-row-index="subFormRowIndex"
    :sub-form-col-index="subFormColIndex"
    :sub-form-row-id="subFormRowId"
  >
    <div :style="titleStyle" :class="[isShowPre ? 'title-pre' : undefined]" class="title-widget-tx">{{ field.options.title }}</div>
  </static-content-wrapper>
</template>

<script>
import StaticContentWrapper from "@/components/form-designer/form-widget/field-widget/static-content-wrapper";
import emitter from "@/utils/emitter";
import i18n from "@/utils/i18n";
import fieldMixin from "@/components/form-designer/form-widget/field-widget/fieldMixin";

export default {
  name: "title-widget",
  componentName: "FieldWidget", //必须固定为FieldWidget，用于接收父级组件的broadcast事件
  mixins: [emitter, fieldMixin, i18n],
  props: {
    field: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,

    designState: {
      type: Boolean,
      default: false,
    },

    subFormRowIndex: {
      /* 子表单组件行索引，从0开始计数 */ type: Number,
      default: -1,
    },
    subFormColIndex: {
      /* 子表单组件列索引，从0开始计数 */ type: Number,
      default: -1,
    },
    subFormRowId: {
      /* 子表单组件行Id，唯一id且不可变 */ type: String,
      default: "",
    },
  },
  computed: {
    titleStyle(){
      const { fontSize, textAlign, backgroundColor, color } = this.field.options;
      return {
        fontSize: fontSize || '24px',
        textAlign: textAlign || 'left',
        backgroundColor: backgroundColor || '#fff',
        color: color,
      }
    },
    isShowPre() {
      return !!this.field.options.isActive;
    },
  },
  components: {
    StaticContentWrapper,
  },
  created() {
    this.registerToRefList();
    this.initEventHandler();
  },
  beforeUnmount() {
    this.unregisterFromRefList();
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.title-widget-tx {
  line-height: 1.4;
  padding: 5px;
}
.title-pre {
  position: relative;
  padding-left: 10px;
  background-color: #e5e5e5;
  &::after {
    content: "";
    position: absolute;
    width: 4px;
    height: 80%;
    border-radius: 20px;
    top: 10%;
    left: 0px;
    margin-top: 0;
    background-color: var(--vf-primary);
  }
}
</style>
