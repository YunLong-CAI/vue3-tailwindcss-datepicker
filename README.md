<!-- # vue3-tailwindcss-datepicker -->

<!-- 参考文档： http://markdown.p2hp.com/index.html -->
# simple-tailwind-ui
 
## 安装插件
 
```
npm install simple-tailwind-ui
```
 
## 引入并注册插件
 
```
// 全部引入
import VueTailWindUI from 'simple-tailwind-ui'
 
app.use(VueTailWindUI)
 
// 按需引入
import MyDatePicker from 'simple-tailwind-ui'
app.use(MyDatePicker)
```
 
## 在项目中使用(示例)

#### 选择某一天
以”日“为基本单位，基础的日期选择控件
基本单位由 type 属性指定。 通过 shortcuts 配置快捷选项， 通过 disabledDate 函数，来设置禁用掉的日期。
 
```
<my-date-picker
  v-model="formData.quick"
  placeholder="Pick a date"
  :disabled-date="disabledDate"
  type="date"
  size="large"
/>

// 禁用函数
const disabledDate = (time: Date) => {
  return time.getTime() > Date.now()
}

// 快捷配置选项
const shortcuts = ref<Array<object>>([
  {
    text: 'Today',
    value: new Date()
  },
  {
    text: 'Yesterday',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return date
    }
  },
  {
    text: 'A week ago',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return date
    }
  }
])
```
![avatar](/public/quick.png)

#### 其他日期单位
通过扩展基础的日期选择，可以选择周、月、年或多个日期
 
```
// 通过改变 type 的值  week 选择周 dates 日期多选 month 选择月份 year 选择年份
<my-date-picker
  v-model="formData.quick"
  placeholder="Pick a date"
  type="week"
  size="large"
/>
```
![avatar](/public/week.png)

#### 选择一段时间
在选择日期范围时，默认情况下左右面板会联动。 如果希望两个面板各自独立切换当前月份，可以使用 unlink-panels 属性解除联动。
 
```
// 通过改变 type 的值  daterange 选择日期范围 month 选择月份范围

<my-date-picker
  v-model="daterange"
  placeholder="Pick a date"
  unlink-panels
  range-separator="To"
  start-placeholder="Start date"
  end-placeholder="End date"
  type="daterange"
  size="large"
/>

```
![avatar](/public/daterange.png)

#### Attributes
![avatar](/public/Attributes.png)
#### Events
![avatar](/public/event.png)


