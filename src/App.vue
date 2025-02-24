<template>
  <div id="app">
    <!-- :customWidgets="customWidgets" -->
    <v-form-designer ref="vfDesignerRef"  :designerConfig="designerConfig" :bannedWidgets="bannedWidgets" :global-dsv="globalDsv">
      <template #toolbar-right>
        <el-button link type="primary" @click="doTest">保存</el-button>
      </template>
    </v-form-designer>
  </div>
</template>

<script>
// import VFormDesigner from "./components/form-designer/index.vue";

export default {
  name: "App",
  components: {
    // VFormDesigner,
  },
  data() {
    return {
      //全局数据源变量
      globalDsv: {
        testApiHost: "http://www.test.com/api",
        testPort: 8080,
      },

      bannedWidgets: ["table", "rate", "html", "button", "rich-editor", "html-text"],
      designerConfig: {
        eventCollapse: false,
        formTemplates: true,
      },
      customWidgets: [
        {
          attributeList: [
            {
              sourceType: 1,
              attributeGroupId: "100",
              attributeImage: "",
              moduleCodes: null,
              sort: 0,
              id: "0",
              attributeCode: "0",
              attributeName: "属性类型",
              attributeType: "AttrValueType",
              widgetType: null,
            },
            {
              sourceType: 1,
              attributeGroupId: "100",
              attributeImage: "",
              moduleCodes: null,
              sort: 8,
              id: "8",
              attributeCode: "8",
              attributeName: "时间范围",
              attributeType: "TimeRange",
              widgetType: null,
            },
            {
              sourceType: 1,
              attributeGroupId: "100",
              attributeImage: "",
              moduleCodes: null,
              sort: 9,
              id: "9",
              attributeCode: "9",
              attributeName: "日期",
              attributeType: "Date",
              widgetType: null,
            },
            {
              sourceType: 1,
              attributeGroupId: "100",
              attributeImage: "",
              moduleCodes: null,
              sort: 10,
              id: "10",
              attributeCode: "10",
              attributeName: "日期范围",
              attributeType: "DateRange",
              widgetType: null,
            },
            {
              sourceType: 1,
              attributeGroupId: "100",
              attributeImage: "",
              moduleCodes: null,
              sort: 11,
              id: "11",
              attributeCode: "11",
              attributeName: "开关",
              attributeType: "Switch",
              widgetType: null,
            },
            {
              sourceType: 1,
              attributeGroupId: "100",
              attributeImage: "",
              moduleCodes: null,
              sort: 12,
              id: "12",
              attributeCode: "12",
              attributeName: "颜色",
              attributeType: "Color",
              widgetType: null,
            },
            {
              sourceType: 1,
              attributeGroupId: "100",
              attributeImage: "",
              moduleCodes: null,
              sort: 13,
              id: "13",
              attributeCode: "13",
              attributeName: "级联选择",
              attributeType: "Cascader",
              widgetType: null,
            },
            {
              sourceType: 1,
              attributeGroupId: "100",
              attributeImage: "",
              moduleCodes: null,
              sort: 14,
              id: "14",
              attributeCode: "14",
              attributeName: "图片",
              attributeType: "PictureUpload",
              widgetType: null,
            },
            {
              sourceType: 1,
              attributeGroupId: "100",
              attributeImage: "",
              moduleCodes: null,
              sort: 15,
              id: "15",
              attributeCode: "15",
              attributeName: "附件",
              attributeType: "FileUpload",
              widgetType: null,
            },
          ],
          id: "100",
          groupName: "基础组件",
          sort: 0,
        },
      ],
    };
  },
  computed: {
    //
  },
  mounted() {},
  methods: {
    doTest() {
      let fieldList = this.$refs.vfDesignerRef.getFieldWidgets(null, true);
      console.log("test", fieldList);
    },
  },
};
</script>

<style lang="scss">
#app {
  height: 100%;
}
</style>
