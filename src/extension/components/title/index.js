import TitleWidget from "./title-widget.vue";
import schema from "./schema";
import sfcTemplate from "./sfc-generator";
import { addBasicFieldSchema } from "@/components/form-designer/widget-panel/widgetsConfig";
import * as PERegister from "@/components/form-designer/setting-panel/propertyRegister";
import * as PEFactory from "@/components/form-designer/setting-panel/property-editor-factory.jsx";
import { registerFWGenerator } from "@/utils/sfc-generator";

/**
 * 加载字段组件步骤：
 * 1. 加载组件Json Schema;
 * 2. 全局注册字段组件，字段组件设计期和运行期共用，故仅需注册一个组件；
 * 3. 全局注册属性编辑器组件（基本属性、高级属性、事件属性）；
 * 4. 注册字段组件的代码生成器；
 * 5. 加载完毕。
 */
export const registerTitleWidget = (app) => {
  addBasicFieldSchema(schema);
  app.component(TitleWidget.name, TitleWidget);

  PERegister.registerCPEditor(app, "title-title", "title-title-editor", PEFactory.createInputTextEditor("title", "extension.setting.alertTitle"));
  PERegister.registerCPEditor(app, "title-color", "color", PEFactory.createColorPickerEditor("color", "extension.setting.textColor"));
  PERegister.registerCPEditor(app, "title-backgroundColor", "backgroundColor", PEFactory.createColorPickerEditor("backgroundColor", "extension.setting.bgColor"));
  PERegister.registerCPEditor(app, "title-isActive", "isActive", PEFactory.createBooleanEditor("isActive", "extension.setting.titleIsActive"));
  const alignItems = [
    { label: "左", value: "left" },
    { label: "中间", value: "center" },
    { label: "右", value: "right" },
  ];
  PERegister.registerCPEditor(app, "title-textAlign", "title-textAlign-editor", PEFactory.createRadioButtonGroupEditor("textAlign", "designer.setting.textAlign", { optionItems: alignItems }));
  registerFWGenerator("title", sfcTemplate);
};
