import type { App } from 'vue'
import MyDatePicker from './datePicker'
 
// 所有组件列表
const components = [
  MyDatePicker
]
 
// 定义 install 方法
const install = (app: App): void => {
  // 遍历注册所有组件
  components.forEach(component => app.component(component.name, component))
}
 
const VueTailWindUI = {
  install
}
 
export {
  MyDatePicker
}
 
export default VueTailWindUI