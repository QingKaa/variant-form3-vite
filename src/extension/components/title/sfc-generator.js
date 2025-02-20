const titleTemplateGenerator = function (fw, formConfig) {
  const wop = fw.options;
  // const titleAttr = `title="${wop.title}"`;
  // const typeAttr = `type=${wop.type}`;
  // const descriptionAttr = !!wop.description ? `description="${wop.description}"` : "";
  // const closableAttr = `:closable="${wop.closable}"`;
  // const closeTextAttr = !!wop.closeText ? `close-text="${wop.closeText}"` : "";
  // const centerAttr = `:center="${wop.center}"`;
  // const showIconAttr = `:show-icon="${wop.showIcon}"`;
  // const effectAttr = `effect="${wop.effect}"`;

  // const alertTemplate = `<el-alert ${titleAttr} ${typeAttr} ${descriptionAttr} ${closableAttr} ${closeTextAttr} ${centerAttr}
  // ${showIconAttr} ${effectAttr}>
  // </el-alert>`;

  const tileText = wop.title;
  const style = `style="text-align:${wop.textAlign};font-size:${wop.fontSize};color:${wop.color}"`;
  const titleTemplate = `<div :style="${style}">${tileText}</div>`;

  return titleTemplate;
};

export default titleTemplateGenerator;
