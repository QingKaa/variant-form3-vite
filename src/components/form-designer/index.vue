<!--
/**
 * author: vformAdmin
 * email: vdpadmin@163.com
 * website: https://www.vform666.com
 * date: 2021.08.18
 * remark: 如果要分发VForm源码，需在本文件顶部保留此文件头信息！！
 */
-->

<template>
  <el-container class="designer-container">
    <el-aside class="side-panel" style="width:300px;">
      <widget-panel :designer="designer" :customWidgets="$attrs.customWidgets" :isInnerWidgets="$attrs.isInnerWidgets" />
    </el-aside>

    <el-container class="center-layout-container">
      <el-header class="toolbar-header">
        <toolbar-panel :designer="designer" :global-dsv="globalDsv" ref="toolbarRef">
          <template v-for="(idx, slotName) in $slots" #[slotName]>
            <slot :name="slotName"></slot>
          </template>
        </toolbar-panel>
      </el-header>
      <el-main class="form-widget-main">
        <el-scrollbar class="container-scroll-bar" :style="{ height: scrollerHeight }">
          <v-form-widget :designer="designer" :form-config="designer.formConfig" :global-dsv="globalDsv" ref="formRef"> </v-form-widget>
        </el-scrollbar>
      </el-main>
    </el-container>

    <el-aside style="width:300px;">
      <setting-panel :designer="designer" :selected-widget="designer.selectedWidget" :form-config="designer.formConfig" :global-dsv="globalDsv" @edit-event-handler="testEEH" />
    </el-aside>
  </el-container>
</template>

<script>
import WidgetPanel from "./widget-panel/index";
import ToolbarPanel from "./toolbar-panel/index";
import SettingPanel from "./setting-panel/index";
import VFormWidget from "./form-widget/index";
import { createDesigner } from "@/components/form-designer/designer";
import { addWindowResizeHandler, deepClone, getQueryParam, getAllContainerWidgets, getAllFieldWidgets, traverseAllWidgets } from "@/utils/util";
import { MOCK_CASE_URL, VARIANT_FORM_VERSION } from "@/utils/config";
import i18n, { changeLocale } from "@/utils/i18n";
import axios from "axios";
import SvgIcon from "@/components/svg-icon/index";

export default {
  name: "VFormDesigner",
  componentName: "VFormDesigner",
  mixins: [i18n],
  components: {
    SvgIcon,
    WidgetPanel,
    ToolbarPanel,
    SettingPanel,
    VFormWidget,
  },
  props: {
    /* 后端字段列表API */
    fieldListApi: {
      type: Object,
      default: null,
    },

    /* 禁止显示的组件名称数组 */
    bannedWidgets: {
      type: Array,
      default: () => [],
    },

    designerConfig: {
      type: Object,
      default: () => {
        return {
          languageMenu: true, //是否显示语言切换菜单
          externalLink: true, //是否显示GitHub、文档等外部链接
          formTemplates: true, //是否显示表单模板
          eventCollapse: true, //是否显示组件事件属性折叠面板
          widgetNameReadonly: false, //禁止修改组件名称

          clearDesignerButton: true, //是否显示清空设计器按钮
          previewFormButton: true, //是否显示预览表单按钮
          importJsonButton: true, //是否显示导入JSON按钮
          exportJsonButton: true, //是否显示导出JSON器按钮
          exportCodeButton: true, //是否显示导出代码按钮
          generateSFCButton: true, //是否显示生成SFC按钮

          toolbarMaxWidth: 450, //设计器工具按钮栏最大宽度（单位像素）
          toolbarMinWidth: 300, //设计器工具按钮栏最小宽度（单位像素）

          presetCssCode: "", //设计器预设CSS样式代码

          resetFormJson: false, //是否在设计器初始化时将表单内容重置为空
        };
      },
    },

    /* 全局数据源变量 */
    globalDsv: {
      type: Object,
      default: () => ({}),
    },

  },
  data() {
    return {
      vFormVersion: VARIANT_FORM_VERSION,
      curLangName: "",
      curLocale: "",

      vsCodeFlag: false,
      caseName: "",

      scrollerHeight: "100%",

      designer: createDesigner(this),

      fieldList: [],
    };
  },
  provide() {
    return {
      serverFieldList: this.fieldList,
      getDesignerConfig: () => this.designerConfig,
      getBannedWidgets: () => this.bannedWidgets,
    };
  },
  created() {
    this.vsCodeFlag = getQueryParam("vscode") == 1;
    this.caseName = getQueryParam("case");
  },
  mounted() {
    // this.initLocale();
  },
  methods: {
    testEEH(eventName, eventParams) {
      console.log("test", eventName);
      console.log("test222222", eventParams);
    },

    initLocale() {
      this.curLocale = localStorage.getItem("v_form_locale");
      if (!!this.vsCodeFlag) {
        this.curLocale = this.curLocale || "en-US";
      } else {
        this.curLocale = this.curLocale || "zh-CN";
      }
      this.curLangName = this.i18nt("application." + this.curLocale);
      this.changeLanguage(this.curLocale);
    },

    loadFieldListFromServer() {
      if (!this.fieldListApi) {
        return;
      }

      let headers = this.fieldListApi.headers || {};
      axios
        .get(this.fieldListApi.URL, { headers: headers })
        .then((res) => {
          let labelKey = this.fieldListApi.labelKey || "label";
          let nameKey = this.fieldListApi.nameKey || "name";

          this.fieldList.splice(0, this.fieldList.length); //清空已有
          res.data.forEach((fieldItem) => {
            this.fieldList.push({
              label: fieldItem[labelKey],
              name: fieldItem[nameKey],
            });
          });
        })
        .catch((error) => {
          this.$message.error(error);
        });
    },

    handleLanguageChanged(command) {
      this.changeLanguage(command);
      this.curLangName = this.i18nt("application." + command);
    },

    changeLanguage(langName) {
      changeLocale(langName);
    },

    setFormJson(formJson) {
      let modifiedFlag = false;
      if (!!formJson) {
        if (typeof formJson === "string") {
          modifiedFlag = this.designer.loadFormJson(JSON.parse(formJson));
        } else if (formJson.constructor === Object) {
          modifiedFlag = this.designer.loadFormJson(formJson);
        }

        if (modifiedFlag) {
          this.designer.emitHistoryChange();
        }
      }
    },

    getFormJson() {
      return {
        widgetList: deepClone(this.designer.widgetList),
        formConfig: deepClone(this.designer.formConfig),
      };
    },

    clearDesigner() {
      this.$refs.toolbarRef.clearFormWidget();
    },

    /**
     * 刷新表单设计器
     */
    refreshDesigner() {
      let fJson = this.getFormJson();
      this.designer.clearDesigner(true); //不触发历史记录变更
      this.designer.loadFormJson(fJson);
    },

    /**
     * 预览表单
     */
    previewForm() {
      this.$refs.toolbarRef.previewForm();
    },

    /**
     * 导入表单JSON
     */
    importJson() {
      this.$refs.toolbarRef.importJson();
    },

    /**
     * 导出表单JSON
     */
    exportJson() {
      this.$refs.toolbarRef.exportJson();
    },

    /**
     * 导出Vue/HTML代码
     */
    exportCode() {
      this.$refs.toolbarRef.exportCode();
    },

    /**
     * 生成SFC代码
     */
    generateSFC() {
      this.$refs.toolbarRef.generateSFC();
    },

    /**
     * 获取所有字段组件
     * @returns {*[]}
     */
    getFieldWidgets(widgetList = null) {
      return !!widgetList ? getAllFieldWidgets(widgetList) : getAllFieldWidgets(this.designer.widgetList);
    },

    /**
     * 获取所有容器组件
     * @returns {*[]}
     */
    getContainerWidgets(widgetList = null) {
      return !!widgetList ? getAllContainerWidgets(widgetList) : getAllContainerWidgets(this.designer.widgetList);
    },

    /**
     * 升级表单json，以补充最新的组件属性
     * @param formJson
     */
    upgradeFormJson(formJson) {
      if (!formJson.widgetList || !formJson.formConfig) {
        this.$message.error("Invalid form json!");
        return;
      }

      traverseAllWidgets(formJson.widgetList, (w) => {
        this.designer.upgradeWidgetConfig(w);
      });
      this.designer.upgradeFormConfig(formJson.formConfig);

      return formJson;
    },

    getWidgetRef(widgetName, showError = false) {
      return this.$refs["formRef"].getWidgetRef(widgetName, showError);
    },

    getSelectedWidgetRef() {
      return this.$refs["formRef"].getSelectedWidgetRef();
    },

    //TODO: 增加更多方法！！
  },
};
</script>

<style lang="scss" scoped>
.designer-container {
  height: 100%;
}
.el-container.main-container {
  background: #fff;

  :deep(aside) {
    /* 防止aside样式被外部样式覆盖！！ */
    margin: 0;
    padding: 0;
    background: inherit;
  }
}

.el-container.full-height {
  height: 100%;
  overflow-y: hidden;
}

.el-container.center-layout-container {
  min-width: 680px;
  border-left: 2px dotted #ebeef5;
  border-right: 2px dotted #ebeef5;
}

.el-header.main-header {
  border-bottom: 2px dotted #ebeef5;
  height: 48px !important;
  line-height: 48px !important;
  min-width: 800px;
}

div.main-title {
  font-size: 18px;
  color: #242424;
  display: flex;
  align-items: center;
  justify-items: center;

  img {
    cursor: pointer;
    width: 36px;
    height: 36px;
  }

  span.bold {
    font-size: 20px;
    font-weight: bold;
    margin: 0 6px 0 6px;
  }

  span.version-span {
    font-size: 14px;
    color: #101f1c;
    margin-left: 6px;
  }
}

.float-left {
  float: left;
}

.float-right {
  float: right;
}

.el-dropdown-link {
  margin-right: 12px;
  cursor: pointer;
}

div.external-link {
  display: flex;
  align-items: center;

  a {
    font-size: 13px;
    text-decoration: none;
    margin-right: 10px;
    color: #606266;
  }
}

.el-header.toolbar-header {
  font-size: 14px;
  border-bottom: 1px dotted #cccccc;
  height: 42px !important;
  background-color: #fff;
  //line-height: 42px !important;
}

.el-aside.side-panel {
  width: 260px !important;
  overflow-y: hidden;
  background-color: #fff;
}

.el-main.form-widget-main {
  padding: 0;

  position: relative;
  overflow-x: hidden;
}

.container-scroll-bar {
  :deep(.el-scrollbar__wrap),
  :deep(.el-scrollbar__view) {
    overflow-x: hidden;
  }
}
</style>
