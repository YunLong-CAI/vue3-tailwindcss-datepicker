import type { App } from 'vue'
import MyDatePicker from './DatePicker.vue'
 
// 使用install方法，在app.use挂载
MyDatePicker.install = (app: App) => {
  app.component(MyDatePicker.name, MyDatePicker)
}
 
export default MyDatePicker