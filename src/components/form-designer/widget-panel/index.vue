<template>
  <!-- <el-scrollbar class="side-scroll-bar" :style="{ height: scrollerHeight }"> -->
  <div class="panel-container">
    <el-tabs v-model="firstTab" class="no-bottom-margin indent-left-margin">
      <el-tab-pane name="componentLib" style="height: 100%; width: 100%; overflow: hidden">
        <template #label>
          <span style="padding-bottom: 2px"><svg-icon icon-class="el-set-up" /> {{ i18nt("designer.componentLib") }}</span>
        </template>
        <el-scrollbar class="side-scroll-bar">
          <el-collapse v-model="activeNames" class="widget-collapse">
            <el-collapse-item name="base-widgets" :title="i18nt('designer.containerTitle')">
              <draggable
                tag="ul"
                :list="containers"
                item-key="key"
                :group="{ name: 'dragGroup', pull: 'clone', put: false }"
                :clone="handleContainerWidgetClone"
                ghost-class="ghost"
                :sort="false"
                :move="checkContainerMove"
                @end="onContainerDragEnd"
              >
                <template #item="{ element: ctn }">
                  <li class="container-widget-item" :title="ctn.displayName" @dblclick="addContainerByDbClick(ctn)">
                    <span><svg-icon :icon-class="ctn.icon" class-name="color-svg-icon" />{{ i18n2t(`designer.widgetLabel.${ctn.type}`, `extension.widgetLabel.${ctn.type}`) }}</span>
                  </li>
                </template>
              </draggable>
            </el-collapse-item>

            <template v-if="!isInnerWidgets">
              <el-collapse-item v-for="group in customWidgetGroups" :key="group.id" :name="group.id" :title="group.groupName">
                <draggable tag="ul" :list="group.attributeList" item-key="id" :group="{ name: 'dragGroup', pull: 'clone', put: false }" :move="checkFieldMove" :clone="handleFieldWidgetClone" ghost-class="ghost" :sort="false">
                  <template #item="{ element: fld }">
                    <li class="field-widget-item" :title="fld.attributeName" @dblclick="addFieldByDbClick(fld)">
                      <span>
                        <img v-if="fld.attributeImage" :src="fld.attributeImage" class="svg-icon" />
                        <svg-icon v-else :icon-class="fld.icon" class-name="color-svg-icon" />
                        {{ fld.attributeName }}
                      </span>
                    </li>
                  </template>
                </draggable>
              </el-collapse-item>
            </template>
            <template v-else>
              <el-collapse-item v-for="group in innerWidgetGroups" :key="group.id" :name="group.id" :title="group.groupName">
                <draggable tag="ul" :list="group.attributeList" item-key="id" :group="{ name: 'dragGroup', pull: 'clone', put: false }" :move="checkFieldMove" :clone="handleFieldWidgetClone" ghost-class="ghost" :sort="false">
                  <template #item="{ element: fld }">
                    <li class="field-widget-item" :title="fld.attributeName" @dblclick="addFieldByDbClick(fld)">
                      <span>
                        <img v-if="fld.attributeImage" :src="fld.attributeImage" class="svg-icon" />
                        <svg-icon v-else :icon-class="fld.icon" class-name="color-svg-icon" />
                        {{ i18n2t(`designer.widgetLabel.${fld.type}`, `extension.widgetLabel.${fld.type}`) }}
                      </span>
                    </li>
                  </template>
                </draggable>
                <div v-if="!group.attributeList || !group.attributeList.length" style="text-align: center;"> 暂无数据 </div>
              </el-collapse-item>
            </template>
          </el-collapse>
        </el-scrollbar>
      </el-tab-pane>

      <!-- <el-tab-pane v-if="showFormTemplates()" name="formLib"  style="height: 100%; width: 100%; overflow: hidden; padding:8px;box-sizing:border-box;">
        <template #label>
          <span><svg-icon icon-class="el-form-template" /> {{ i18nt("designer.formLib") }}</span>
        </template>
        <el-scrollbar class="side-scroll-bar">
        <template v-for="(ft, idx) in formTemplates">
          <el-card :bord-style="{ padding: '0' }" shadow="hover" class="ft-card">
            <el-popover placement="right" trigger="hover">
              <template #reference>
                <img :src="ft.imgUrl" style="width: 200px" />
              </template>
              <img :src="ft.imgUrl" style="height: 600px; width: 720px" />
            </el-popover>
            <div class="bottom clear-fix">
              <span class="ft-title">#{{ idx + 1 }} {{ ft.title }}</span>
              <el-button link type="primary" class="right-button" @click="loadFormTemplate(ft.jsonUrl)"> {{ i18nt("designer.hint.loadFormTemplate") }}</el-button>
            </div>
          </el-card>
        </template>
      </el-scrollbar>
      </el-tab-pane> -->
    </el-tabs>
  </div>
  <!-- </el-scrollbar> -->
</template>

<script>
import { advancedFields as AFS, containers as CONS, basicFields as BFS, customFields as CFS } from "./widgetsConfig";
import { formTemplates } from "./templatesConfig";
import { addWindowResizeHandler, generateId } from "@/utils/util";
import i18n from "@/utils/i18n";
import axios from "axios";
import SvgIcon from "@/components/svg-icon/index";

export default {
  name: "FieldPanel",
  mixins: [i18n],
  components: {
    SvgIcon,
  },
  props: {
    designer: Object,
    customWidgets: {
      type: Array,
      default: () => [],
    },
    // 是否启用默认组件, true 加载内置组件
    isInnerWidgets: {
      type: Boolean,
      default: false,
    },
  },
  inject: ["getBannedWidgets", "getDesignerConfig"],
  data() {
    return {
      designerConfig: this.getDesignerConfig(),

      firstTab: "componentLib",

      scrollerHeight: "100%",

      activeNames: ["base-widgets"],

      containers: [],

      basicFields: [],

      formTemplates: formTemplates,

      customWidgetGroups: [],

      innerWidgetGroups: [],
    };
  },
  computed: {
    //
  },
  watch: {
    customWidgets: {
      handler(v) {
        if (this.isInnerWidgets) return;
        this.loadCustomWidgets();
      },
      deep: true,
      immediate: true,
    },
  },
  created() {},
  mounted() {
    // 加载基础组件
    this.loadBaseWidgets();
    // 加载内置组件
    console.log("  =====> this.isInnerWidgets:", this.isInnerWidgets);
    this.isInnerWidgets && this.loadInnerWidgets();
  },
  methods: {
    // 加载外部widgets
    loadCustomWidgets() {
      try {
        const list = this.customWidgets.reduce((ls, group) => {
          const { attributeList, groupName, id, sort } = group;
          if (!attributeList || !attributeList.length) return ls;

          const attrList = attributeList.reduce((ls, attrItem) => {
            const item = this.getWidgetByType(attrItem.attributeType);
            if (!item) return ls;
            // 服务端定义的选项
            if (attrItem.sourceType === 2) {
              item.options.optionItems = [...(attrItem.attributeOptions || [])];
            }
            return ls.concat({ ...attrItem, attributeId: attrItem.id, displayName: attrItem.attributeName, ...item });
          }, []);

          return ls.concat({
            groupName,
            id,
            sort,
            attributeList: [...attrList],
          });
        }, []);
        this.customWidgetGroups = list.sort((a, b) => a.sort - b.sort);
        this.activeNames = ["base-widgets", ...list.map((it) => it.id)];
      } catch (error) {
        console.log("  =====> error:", error);
      }
    },

    /**
     * 加载默认组件
     */
    loadBaseWidgets() {
      this.containers = CONS.map((con) => {
        return {
          key: generateId(),
          ...con,
          displayName: this.i18n2t(`designer.widgetLabel.${con.type}`, `extension.widgetLabel.${con.type}`),
        };
      }).filter((con) => {
        return !con.internal && !this.isBanned(con.type);
      });
    },

    /**
     * 加载内置组件
     */
    loadInnerWidgets() {
      const basicFields = BFS.map((fld) => {
        return {
          key: generateId(),
          ...fld,
          displayName: this.i18n2t(`designer.widgetLabel.${fld.type}`, `extension.widgetLabel.${fld.type}`),
        };
      }).filter((fld) => {
        return !this.isBanned(fld.type);
      });

      const advancedFields = AFS.map((fld) => {
        return {
          key: generateId(),
          ...fld,
          displayName: this.i18n2t(`designer.widgetLabel.${fld.type}`, `extension.widgetLabel.${fld.type}`),
        };
      }).filter((fld) => {
        return !this.isBanned(fld.type);
      });

      const customFields = CFS.map((fld) => {
        return {
          key: generateId(),
          ...fld,
          displayName: this.i18n2t(`designer.widgetLabel.${fld.type}`, `extension.widgetLabel.${fld.type}`),
        };
      }).filter((fld) => {
        return !this.isBanned(fld.type);
      });

      this.innerWidgetGroups = [
        {
          groupName: this.i18nt("designer.basicFieldTitle"),
          id: "base-widgets",
          sort: 0,
          attributeList: basicFields,
        },
        {
          groupName: this.i18nt("designer.advancedFieldTitle"),
          id: "advanced-widgets",
          sort: 0,
          attributeList: advancedFields,
        },
        {
          groupName: this.i18nt("designer.customFieldTitle"),
          id: "custom-widgets",
          sort: 0,
          attributeList: customFields,
        },
      ];
    },

    getWidgetByType(attributeType) {
      const widgetType = this.camelToKebabCase(attributeType);
      return BFS.find((it) => {
        return widgetType === it.type && !this.isBanned(widgetType);
      });
    },

    /**
     * 将 AttrValueType 转换成 attr-value-type
     * @param str
     */
    camelToKebabCase(str) {
      return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
    },

    isBanned(wName) {
      return this.getBannedWidgets().indexOf(wName) > -1;
    },

    showFormTemplates() {
      if (this.designerConfig["formTemplates"] === undefined) {
        return true;
      }

      return !!this.designerConfig["formTemplates"];
    },

    handleContainerWidgetClone(origin) {
      return this.designer.copyNewContainerWidget(origin);
    },

    handleFieldWidgetClone(origin) {
      return this.designer.copyNewFieldWidget(origin);
    },

    checkContainerMove(evt) {
      return this.designer.checkWidgetMove(evt);
    },

    checkFieldMove(evt) {
      return this.designer.checkFieldMove(evt);
    },

    onContainerDragEnd(evt) {
      //console.log('Drag end of container: ')
      //console.log(evt)
    },

    addContainerByDbClick(container) {
      this.designer.addContainerByDbClick(container);
    },

    addFieldByDbClick(widget) {
      this.designer.addFieldByDbClick(widget);
    },

    loadFormTemplate(jsonUrl) {
      this.$confirm(this.i18nt("designer.hint.loadFormTemplateHint"), this.i18nt("render.hint.prompt"), {
        confirmButtonText: this.i18nt("render.hint.confirm"),
        cancelButtonText: this.i18nt("render.hint.cancel"),
      })
        .then(() => {
          axios
            .get(jsonUrl)
            .then((res) => {
              let modifiedFlag = false;
              if (typeof res.data === "string") {
                modifiedFlag = this.designer.loadFormJson(JSON.parse(res.data));
              } else if (res.data.constructor === Object) {
                modifiedFlag = this.designer.loadFormJson(res.data);
              }
              if (modifiedFlag) {
                this.designer.emitHistoryChange();
              }

              this.$message.success(this.i18nt("designer.hint.loadFormTemplateSuccess"));
            })
            .catch((error) => {
              this.$message.error(this.i18nt("designer.hint.loadFormTemplateFailed") + ":" + error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.color-svg-icon {
  -webkit-font-smoothing: antialiased;
  color: #7c7d82;
}

.side-scroll-bar {
  :deep(.el-scrollbar__wrap) {
    overflow-x: hidden;
  }
}

div.panel-container {
  // padding-bottom: 10px;
  height: 100%;
  box-sizing: border-box;
}

.no-bottom-margin :deep(.el-tabs__header) {
  margin-bottom: 0;
}
.no-bottom-margin :deep(.el-tabs__nav-wrap) {
  padding-bottom: 2px;
}
.no-bottom-margin {
  height: 100%;
}

.indent-left-margin {
  :deep(.el-tabs__nav) {
    margin-left: 20px;
  }
}

.el-collapse-item :deep(ul) > li {
  list-style: none;
}

.widget-collapse {
  border-top-width: 0;

  :deep(.el-collapse-item__header) {
    padding: 0 8px;
    font-style: italic;
    font-weight: bold;
  }

  :deep(.el-collapse-item__content) {
    padding-bottom: 6px;

    ul {
      padding-left: 10px; /* 重置IE11默认样式 */
      margin: 0; /* 重置IE11默认样式 */
      margin-block-start: 0;
      margin-block-end: 0.25em;
      padding-inline-start: 10px;

      &:after {
        content: "";
        display: block;
        clear: both;
      }

      .container-widget-item,
      .field-widget-item {
        display: inline-block;
        height: 32px;
        line-height: 32px;
        width: 98px;
        float: left;
        margin: 2px 6px 6px 0;
        cursor: move;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        background: #fff;
        border: 1px solid #e8e9eb;
        border-radius: 4px;
        padding: 0 8px;
      }

      .container-widget-item:hover,
      .field-widget-item:hover {
        background: #f1f2f3;
        border-color: var(--vf-primary);

        .color-svg-icon {
          color: var(--vf-primary);
        }
      }

      .drag-handler {
        position: absolute;
        top: 0;
        left: 160px;
        background-color: #dddddd;
        border-radius: 5px;
        padding-right: 5px;
        font-size: 11px;
        color: #666666;
      }
    }
  }
}

.el-card.ft-card {
  border: 1px solid #8896b3;
}

.ft-card {
  margin-bottom: 10px;

  .bottom {
    margin-top: 10px;
    line-height: 12px;
  }

  /*
    .image-zoom {
      height: 500px;
      width: 620px
    }
    */

  .ft-title {
    font-size: 13px;
    font-weight: bold;
  }

  .right-button {
    padding: 0;
    float: right;
  }

  .clear-fix:before,
  .clear-fix:after {
    display: table;
    content: "";
  }

  .clear-fix:after {
    clear: both;
  }
}
</style>
