//import { vfApp } from '@/utils/create-app'

/**
 * 格式说明：属性名称==对应属性编辑器的组件名称
 */


/**
 * 基础信息
 */
const BASE_PROPERTIES = {
  'name'              :            'name-editor',
  'label'             :            'label-editor',
  'type'              :            'type-editor',
  'defaultValue'      :            'defaultValue-editor',
  'placeholder'       :            'placeholder-editor',
}
// 组件样式
const STYLE_PROPERTIES = {
  'color'             :            'color-editor',
  'labelAlign'        :            'labelAlign-editor',
  'startPlaceholder'  :            'startPlaceholder-editor',
  'endPlaceholder'    :            'endPlaceholder-editor',
  'columnWidth'       :            'columnWidth-editor',
  'autoFullWidth'     :            'autoFullWidth-editor',
  'size'              :            'size-editor',
  'border'            :            'border-editor',
  'labelWidth'        :            'labelWidth-editor',
  'labelFontSize'     :            "labelFontSize-editor",
  'labelFontColor'    :            'labelFontColor-editor',
  'labelHidden'       :            'labelHidden-editor',
  'rows'              :            'rows-editor',
  'textAlign'         :            'textAlign-editor',
  'fontSize'          :            'fontSize-editor',
  'preWrap'           :            'preWrap-editor',
  'contentPosition'   :            'contentPosition-editor',
  'controlsPosition'  :            'controlsPosition-editor',
  'cellWidth'          :            'cellWidth-editor',
  'cellHeight'         :            'cellHeight-editor',
  'colHeight'          :            'colHeight-editor',
  'gutter'             :            'gutter-editor',
  'responsive'         :            'responsive-editor',
  'span'               :            'span-editor',
  'offset'             :            'offset-editor',
  'push'               :            'push-editor',
  'pull'               :            'pull-editor',
  'displayStyle'      :            'displayStyle-editor',
  'buttonStyle'       :            'buttonStyle-editor',
}

// 限制信息
const LIMIT_PROPERTIES = {
  'readonly'          :            'readonly-editor',
  'disabled'          :            'disabled-editor',
  'hidden'            :            'hidden-editor',
  'required'          :            'required-editor',
  'requiredHint'      :            'requiredHint-editor',
  'validation'        :            'validation-editor',
  'validationHint'    :            'validationHint-editor',
  'clearable'         :            'clearable-editor',
  'editable'          :            'editable-editor',
  'multiple'          :            'multiple-editor',
  'multipleLimit'     :            'multipleLimit-editor',
  'multipleSelect'    :            'multipleSelect-editor',
  'limit'             :            'limit-editor',
  'fileMaxSize'       :            'fileMaxSize-editor',
  'fileTypes'         :            'fileTypes-editor',
  'min'               :            'min-editor',
  'max'               :            'max-editor',
  'precision'         :            'precision-editor',
  'step'              :            'step-editor',
  'minLength'         :            'minLength-editor',
  'maxLength'         :            'maxLength-editor',
}

// 其他设置
const OTHER_PROPERTIES = {
  //字段
  'showStops'         :            'showStops-editor',
  'showPassword'      :            'showPassword-editor',
  'textContent'       :            'textContent-editor',
  'htmlContent'       :            'htmlContent-editor',
  'format'            :            'format-editor',
  'valueFormat'       :            'valueFormat-editor',
  'filterable'        :            'filterable-editor',
  'allowCreate'       :            'allowCreate-editor',
  'remote'            :            'remote-editor',
  'automaticDropdown' :            'automaticDropdown-editor',
  'checkStrictly'     :            'checkStrictly-editor',
  'showAllLevels'     :            'showAllLevels-editor',
  'optionItems'       :            'optionItems-editor',
  'uploadURL'         :            'uploadURL-editor',
  'uploadTip'         :            'uploadTip-editor',
  'withCredentials'   :            'withCredentials-editor',
  'contentHeight'     :            'contentHeight-editor',
  // 'customClass'       :            'customClass-editor',
  //容器
  'showBlankRow'       :            'showBlankRow-editor',
  'showRowNumber'      :            'showRowNumber-editor',
  'wordBreak'          :            'wordBreak-editor',
}

// 高级
const ADVANCED_PROPERTIES = {
  'showWordLimit'     :            'showWordLimit-editor',
  'prefixIcon'        :            'prefixIcon-editor',
  'suffixIcon'        :            'suffixIcon-editor',
  'switchWidth'       :            'switchWidth-editor',
  'activeText'        :            'activeText-editor',
  'inactiveText'      :            'inactiveText-editor',
  'activeColor'       :            'activeColor-editor',
  'inactiveColor'     :            'inactiveColor-editor',
  'lowThreshold'      :            'lowThreshold-editor',
  'highThreshold'     :            'highThreshold-editor',
  'allowHalf'         :            'allowHalf-editor',
  'showText'          :            'showText-editor',
  'showScore'         :            'showScore-editor',
  'range'             :            'range-editor',
  'vertical'          :            'vertical-editor',
  'plain'             :            'plain-editor',
  'round'             :            'round-editor',
  'circle'            :            'circle-editor',
  'icon'              :            'icon-editor',
  'labelIconClass'    :            'labelIconClass-editor',
  'labelIconPosition' :            'labelIconPosition-editor',
  'labelTooltip'      :            'labelTooltip-editor',
  'appendButton'      :            'appendButton-editor',
  'appendButtonDisabled':          'appendButtonDisabled-editor',
  'buttonIcon'        :            'buttonIcon-editor',
}

const EVENT_PROPERTIES = {
  //字段
  'onCreated'         :            'onCreated-editor',
  'onMounted'         :            'onMounted-editor',
  'onClick'           :            'onClick-editor',
  'onInput'           :            'onInput-editor',
  'onChange'          :            'onChange-editor',
  'onFocus'           :            'onFocus-editor',
  'onBlur'            :            'onBlur-editor',
  'onRemoteQuery'     :            'onRemoteQuery-editor',
  'onBeforeUpload'    :            'onBeforeUpload-editor',
  'onUploadSuccess'   :            'onUploadSuccess-editor',
  'onUploadError'     :            'onUploadError-editor',
  'onFileRemove'      :            'onFileRemove-editor',
  'onValidate'        :            'onValidate-editor',
  'onAppendButtonClick':           'onAppendButtonClick-editor',

  //容器
  'onSubFormRowAdd'   :            'onSubFormRowAdd-editor',
  'onSubFormRowInsert':            'onSubFormRowInsert-editor',
  'onSubFormRowDelete':            'onSubFormRowDelete-editor',
  'onSubFormRowChange':            'onSubFormRowChange-editor',
}

/**
 * 注册组件常见属性
 * 如属性编辑器的组件名称propEditorName设置为null，则不显示该属性编辑器！！
 * @param uniquePropName 属性名称（保证名称唯一，不跟其他组件属性冲突）
 * @param propEditorName 对应属性编辑器的组件名称
 */
export function registerCommonProperty(uniquePropName, propEditorName) {
  OTHER_PROPERTIES[uniquePropName] = propEditorName
}

/**
 * 注册组件高级属性
 * 如属性编辑器的组件名称propEditorName设置为null，则不显示该属性编辑器！！
 * @param uniquePropName 属性名称（保证名称唯一，不跟其他组件属性冲突）
 * @param propEditorName 对应属性编辑器的组件名称
 */
export function registerAdvancedProperty(uniquePropName, propEditorName) {
  ADVANCED_PROPERTIES[uniquePropName] = propEditorName
}

/**
 * 注册组件事件属性
 * 如属性编辑器的组件名称propEditorName设置为null，则不显示该属性编辑器！！
 * @param uniquePropName 属性名称（保证名称唯一，不跟其他组件属性冲突）
 * @param propEditorName 对应属性编辑器的组件名称
 */
export function registerEventProperty(uniquePropName, propEditorName) {
  EVENT_PROPERTIES[uniquePropName] = propEditorName
}

/**
 * 判断属性是否已注册
 * @param uniquePropName 属性名称（保证名称唯一，不跟其他组件属性冲突）
 */
export function propertyRegistered(uniquePropName) {
  return !!OTHER_PROPERTIES[uniquePropName] || !!ADVANCED_PROPERTIES[uniquePropName] || !!EVENT_PROPERTIES[uniquePropName]
}

/**
 * 注册常见属性对应的属性编辑器
 * @param app
 * @param uniquePropName
 * @param propEditorName
 * @param editorComponent
 */
export function registerCPEditor(app, uniquePropName, propEditorName, editorComponent) {
  app.component(propEditorName, editorComponent)
  registerCommonProperty(uniquePropName, propEditorName)
}

/**
 * 注册高级属性对应的属性编辑器
 * @param app
 * @param uniquePropName
 * @param propEditorName
 * @param editorComponent
 */
export function registerAPEditor(app, uniquePropName, propEditorName, editorComponent) {
  app.component(propEditorName, editorComponent)
  registerAdvancedProperty(uniquePropName, propEditorName)
}

/**
 * 注册事件属性对应的属性编辑器
 * @param app
 * @param uniquePropName
 * @param propEditorName
 * @param editorComponent
 */
export function registerEPEditor(app, uniquePropName, propEditorName, editorComponent) {
  app.component(propEditorName, editorComponent)
  registerEventProperty(uniquePropName, propEditorName)
}

export default {
  BASE_PROPERTIES,
  STYLE_PROPERTIES,
  LIMIT_PROPERTIES,
  OTHER_PROPERTIES,
  ADVANCED_PROPERTIES,
  EVENT_PROPERTIES
}


