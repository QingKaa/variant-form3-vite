<template>
  <div id="app">
    <v-form-designer ref="vfDesignerRef" :designerConfig="designerConfig" :bannedWidgets="bannedWidgets" :global-dsv="globalDsv">
      <!--
      <template #customToolButtons>
        <el-button type="text" @click="doTest">测试btn</el-button>
      </template>
      -->
    </v-form-designer>
  </div>
</template>

<script>
import VFormDesigner from './components/form-designer/index.vue'

export default {
  name: 'App',
  components: {
    VFormDesigner,
  },
  data() {
    return {
      //全局数据源变量
      globalDsv: {
        testApiHost: 'http://www.test.com/api',
        testPort: 8080,
      },

      bannedWidgets:['table','rate', 'html', 'button', 'rich-editor', 'html-text'],
      designerConfig:{
        eventCollapse: false,
        formTemplates: true,
      }
    }
  },
  computed: {
    //
  },
  methods: {
    doTest() {
      let fieldList = this.$refs.vfDesignerRef.getFieldWidgets(null, true)
      console.log('test', fieldList)
    }

  }
}
</script>

<style lang="scss">
  #app {
    height: 100%;
  }
</style>
