import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { resolve } from "path";
import commonjs from "@rollup/plugin-commonjs";
import { visualizer } from "rollup-plugin-visualizer";
import requireTransform from "vite-plugin-require-transform";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    //添加jsx/tsx支持
    vueJsx({}),

    //解决引入commonjs模块后打包出现的{'default' is not exported by XXX}错误!!
    // commonjs({requireReturnsDefault:true}) /* 配置requireReturnsDefault属性，
    // 解决打包后引入VForm出现的"Axios is not a constructor"错！！ */,
    // requireTransform({}),
    //可视化Bundle
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      fileName: "stats.html",
    }),

    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [resolve(process.cwd(), "src/icons/svg")],
      // Specify symbolId format
      symbolId: "icon-[dir]-[name]",
    }),
  ],

  resolve: {
    alias: {
      "@": resolve(__dirname, "src"), // 路径别名
    },
    extensions: [".js", ".vue", ".json", ".ts"], // 使用路径别名时想要省略的后缀名，可以自己 增减
  },

  optimizeDeps: {
    include: ["@/../lib/vuedraggable/dist/vuedraggable.umd.js", "quill"],
  },

  css: {
    preprocessorOptions: {
      scss: {
        /* 自动引入全局scss文件 */
        // additionalData: '@import "./src/styles/global.scss";'
        additionalData: '@use "@/styles/global.scss";',
        api: "modern-compiler",
      },
    },
  },

  build: {
    minify: 'terser',
    lib: {
      entry: resolve(__dirname, "install.js"),
      name: "VFormDesigner",
      fileName: (format) => `designer.${format}.js`,
    },
    rollupOptions: {
      //   // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue", "element-plus"],
      output: {
        //     // exports: 'default',  //要支持CDN引入必须设置此参数！！！
        //     // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        dir: resolve(__dirname, "vFormFullDist"),
        globals: {
          vue: "Vue",
          "element-plus": "ElementPlus",
        },
        assetFileNames: `designer.style.css`,
      },
    },
  },
});
