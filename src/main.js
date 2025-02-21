import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "@/styles/cssVar.css"
import '@/styles/index.scss'
import "@/styles/global.scss"

import '@/iconfont/iconfont.css'
import Draggable from '@/../lib/vuedraggable/dist/vuedraggable.umd.js'
import {registerIcon} from '@/utils/el-icons'
import 'virtual:svg-icons-register'

import ContainerWidgets from '@/components/form-designer/form-widget/container-widget/index'
import ContainerItems from '@/components/form-render/container-item/index'

import { addDirective } from '@/utils/directive'
import { installI18n } from '@/utils/i18n'
import { loadExtension } from '@/extension/extension-loader'

// import { registerTitleWidget } from "@/extension/components/title/index";


import vForm3 from "@/../install"
console.log('  =====> vForm3:', vForm3);


if (typeof window !== 'undefined') {
  window.axios = axios
}

const vfApp = createApp(App)

vfApp.use(ElementPlus)
vfApp.use(vForm3)
// registerTitleWidget(vfApp)
// registerIcon(vfApp)
// vfApp.component('draggable', Draggable)
// addDirective(vfApp)
// installI18n(vfApp)

// vfApp.use(ContainerWidgets)
// vfApp.use(ContainerItems)
// loadExtension(vfApp)

vfApp.mount('#app')
