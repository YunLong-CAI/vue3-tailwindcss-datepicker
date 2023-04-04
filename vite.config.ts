import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  //解决“vite use `--host` to expose”
  base: './',	//不加打包后白屏
  server: {             
    host: '0.0.0.0',	
    // port: 8080,      
    open: true
  },
  resolve:{   
    //别名配置，引用src路径下的东西可以通过@如：import Layout from '@/layout/index.vue'
    alias:[   
      {
        find:'@',
        replacement:resolve(__dirname,'src') 
      }
    ]
  },
  build: {
		outDir: "dist", //输出文件名称
		lib: {
			entry: resolve(__dirname, "./src/components/index.ts"), //指定组件编译入口文件
			name: "VueTailWindUI",
			fileName: 'vue-tailwind-ui'
		}, rollupOptions: { // 自定义底层的Rollup打包配置
      external: ['vue', 'vue-router'],
      output: {
        exports: 'named', // https://rollupjs.org/configuration-options/#output-exports
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'vue-router': 'VueRouter' // 引入vue-router全局变量，否则router.push将无法使用
        }
      }
    },
    minify: 'terser',
    terserOptions: { // 在打包代码时移除 console、debugger 和 注释
      compress: {
        drop_console: true, // 生产环境时移除console
        drop_debugger: true
      },
      format: {
        comments: false // 删除注释comments
      }
    }
	}
})
