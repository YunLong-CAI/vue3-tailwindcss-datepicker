<template>
  <div class="w-1000px my-0 mx-auto pt-0 pb-36 px-auto box-border dark:bg-slate-900 dark:text-slate-300">
    <div>
      <div class="mt-9 mb-5 pb-1 leading-tight text-2xl">选择某一天</div>
      <div class="my-4 mx-0">以”日“为基本单位，基础的日期选择控件</div>
      <div class="my-4 mx-0">基本单位由 type 属性指定。 通过 shortcuts 配置快捷选项， 通过 disabledDate 函数，来设置禁用掉的日期。</div>
      <div class="flex w-full p-0 flex-wrap border border-inherit border-solid rounded-md dark:border-slate-600">
        <div class="py-10 px-0 grow shrink basis-0 flex items-center flex-col">
          <span
            class="block text-base mb-8 text-center"
          >Default</span>
          <my-date-picker
            v-model="formData.date"
            placeholder="Pick a date"
            :readonly="false"
            :editable="false"
            :disabled="false"
            type="date"
            size="large"
            @change="inputDate"
          />
        </div>
        <div class="py-10 px-0 grow shrink basis-0 flex items-center flex-col">
          <span class="block text-base mb-8 text-center">Picker with quick options</span>
          <my-date-picker
            v-model="formData.quick"
            placeholder="Pick a date"
            :readonly="false"
            :editable="false"
            :disabled="false"
            :shortcuts="shortcuts"
            :disabled-date="disabledDate"
            type="date"
            size="large"
            @change="inputDate"
          />
        </div>
      </div>
      <div class="mt-9 mb-5 pb-1 leading-tight text-2xl">其他日期单位</div>
      <div class="my-4 mx-0">通过扩展基础的日期选择，可以选择周、月、年或多个日期</div>
      <div class="flex w-full p-0 flex-wrap border border-inherit border-solid rounded-md dark:border-slate-600">
        <div class="grow shrink basis-0">
          <div class="py-10 px-0 grow shrink basis-0 flex items-center flex-col">
            <span class="block text-base mb-8 text-center">Week</span>
            <my-date-picker
              v-model="week"
              placeholder="Pick a week"
              :readonly="false"
              :editable="false"
              :disabled="false"
              type="week"
              size="large"
              @change="inputDate"
            />
          </div>
          <div class="py-10 px-0 grow shrink basis-0 flex items-center flex-col">
            <span class="block text-base mb-8 text-center">Month</span>
            <my-date-picker
              v-model="formData.month"
              placeholder="Pick a Month"
              :readonly="false"
              :editable="false"
              :disabled="false"
              type="month"
              size="large"
              @change="inputDate"
            />
          </div>
        </div>
        <div class="grow shrink basis-0">
          <div class="py-10 px-0 grow shrink basis-0 flex items-center flex-col">
            <span class="block text-base mb-8 text-center">Year</span>
            <my-date-picker
              v-model="formData.year"
              placeholder="Pick a Year"
              :readonly="false"
              :editable="false"
              :disabled-date="disabledDate"
              :disabled="false"
              type="year"
              size="large"
              @change="inputDate"
            />
          </div>
          <div class="py-10 px-0 grow shrink basis-0 flex items-center flex-col">
            <span class="block text-base mb-8 text-center">Dates</span>
            <my-date-picker
              v-model="formData.dates"
              placeholder="Pick one or more dates"
              :readonly="false"
              :editable="false"
              :disabled="false"
              type="dates"
              size="large"
              @change="inputDate"
            />
          </div>
        </div>
      </div>
      <div class="mt-9 mb-5 pb-1 leading-tight text-2xl">选择一段时间</div>
      <div class="my-4 mx-0">在选择日期范围时，默认情况下左右面板会联动。 如果希望两个面板各自独立切换当前月份，可以使用 unlink-panels 属性解除联动。</div>
      <div class="flex w-full p-0 flex-wrap border border-inherit border-solid rounded-md dark:border-slate-600">
        <div class="py-10 px-0 grow shrink basis-0 flex items-center flex-col">
          <span
            class="block text-base mb-8 text-center"
          >Default</span>
          <my-date-picker
            v-model="formData.daterange"
            placeholder="Pick a date"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
            type="daterange"
            size="large"
            @change="inputDate"
          />
        </div>
        <div class="py-10 px-0 grow shrink basis-0 flex items-center flex-col">
          <span class="block text-base mb-8 text-center">Picker with quick options</span>
          <my-date-picker
            v-model="formData.dateranges"
            placeholder="Pick a date"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
            type="daterange"
            :shortcuts="shortcutsRange"
            size="large"
            @change="inputDate"
          />
        </div>
      </div>
      <div class="mt-9 mb-5 pb-1 leading-tight text-2xl">选择月份范围</div>
      <div class="my-4 mx-0">在选择月份范围时，默认情况下左右面板会联动。 如果希望两个面板各自独立切换当前年份，可以使用 unlink-panels 属性解除联动。</div>
      <div class="flex w-full p-0 flex-wrap border border-inherit border-solid rounded-md dark:border-slate-600">
        <div class="py-10 px-0 grow shrink basis-0 flex items-center flex-col">
          <span
            class="block text-base mb-8 text-center"
          >Default</span>
          <my-date-picker
            v-model="formData.monthrange"
            placeholder="Pick a date"
            range-separator="To"
            start-placeholder="Start Month"
            end-placeholder="End Month"
            type="monthrange"
            size="large"
            @change="inputDate"
          />
        </div>
        <div class="py-10 px-0 grow shrink basis-0 flex items-center flex-col">
          <span class="block text-base mb-8 text-center">Picker with quick options</span>
          <my-date-picker
            v-model="formData.monthranges"
            placeholder="Pick a date"
            range-separator="To"
            start-placeholder="Start Month"
            end-placeholder="End Month"
            type="monthrange"
            :shortcuts="monthrangelist"
            size="large"
            @change="inputDate"
          />
        </div>
      </div>
    </div>
    <div>
      <div class="mt-9 mb-5 pb-1 leading-tight text-2xl">Attributes</div>
      <table class="w-1000px table-fixed border-collapse break-all text-sm">
        <thead>
          <tr class="border-b border-inherit border-solid dark:border-slate-600">
            <th
              v-for="(item,index) in titleList"
              :key="index"
              class="p-2 text-left"
            >{{ item }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item,index) in attributesList"
            :key="index"
            class="border-b border-inherit border-solid dark:border-slate-600"
          >
            <td class="p-2">{{ item.name }}</td>
            <td class="p-2">{{ item.explain }}</td>
            <td class="p-2">{{ item.type }}</td>
            <td class="p-2">{{ item.optionalValue }}</td>
            <td class="p-2">{{ item.defaultValue }}</td>
          </tr>
        </tbody>
      </table>
      <div class="mt-9 mb-5 pb-1 leading-tight text-2xl">Events</div>
      <table class="w-1000px table-fixed border-collapse break-all text-sm">
        <thead>
          <tr class="border-b border-inherit border-solid dark:border-slate-600">
            <th
              v-for="(item,index) in eventsTitleList"
              :key="index"
              class="p-2 text-left"
            >{{ item }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item,index) in eventsList"
            :key="index"
            class="border-b border-inherit border-solid dark:border-slate-600"
          >
            <td class="p-2">{{ item.name }}</td>
            <td class="p-2">{{ item.explain }}</td>
            <td class="p-2">{{ item.value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'HomeView'
})

</script>
<script setup lang="ts">

// import datePicker from '@/components/super-ui/datePicker/datePicker.vue'

import { ref } from 'vue'
const week = ref(new Date())
const formData = ref<any>({
  daterange: []
})
const titleList = ref([
  '属性名',
  '说明',
  '类型',
  '可选值',
  '默认'
])
const eventsTitleList = ref([
  '事件名',
  '说明',
  '回调参数'
])

const shortcutsRange = ref<Array<object>>([
  {
    text: 'Last week',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    }
  },
  {
    text: 'Last month',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    }
  },
  {
    text: 'Last 3 months',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    }
  }
])
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
const monthrangelist = ref<Array<object>>(
  [
    {
      text: 'This month',
      value: [new Date(), new Date()]
    },
    {
      text: 'This year',
      value: () => {
        const end = new Date()
        const start = new Date(new Date().getFullYear(), 0)
        return [start, end]
      }
    },
    {
      text: 'Last 6 months',
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setMonth(start.getMonth() - 6)
        return [start, end]
      }
    }
  ]
)

const attributesList = ref([
  {
    name: 'v-model/model-value',
    explain: '绑定值，如果它是数组，长度应该是 2',
    type: 'Date / number / string / Array',
    optionalValue: '—',
    defaultValue: '—'
  },
  {
    name: 'readonly',
    explain: '只读',
    type: 'boolean',
    optionalValue: '—',
    defaultValue: 'false'
  },
  {
    name: 'disabled',
    explain: '禁用',
    type: 'boolean',
    optionalValue: '—',
    defaultValue: 'false'
  },
  {
    name: 'size',
    explain: '输入框尺寸',
    type: 'string',
    optionalValue: 'large/default/small',
    defaultValue: 'default'
  },
  {
    name: 'editable',
    explain: '文本框可输入',
    type: 'boolean',
    optionalValue: '—',
    defaultValue: 'true'
  },
  {
    name: 'clearable',
    explain: '是否显示清除按钮',
    type: 'boolean',
    optionalValue: '—',
    defaultValue: 'true'
  },
  {
    name: 'placeholder',
    explain: '非范围选择时的占位内容',
    type: 'string',
    optionalValue: '—',
    defaultValue: 'Pick a date'
  },
  {
    name: 'start-placeholder',
    explain: '范围选择时开始日期的占位内容',
    type: 'string',
    optionalValue: '—',
    defaultValue: 'Start Date'
  },
  {
    name: 'end-placeholder',
    explain: '范围选择时结束日期的占位内容',
    type: 'string',
    optionalValue: '—',
    defaultValue: 'End Date'
  },
  {
    name: 'type',
    explain: '显示类型',
    type: 'string',
    optionalValue: 'year/month/date/dates/week/daterange/monthrange',
    defaultValue: 'date'
  },
  {
    name: 'range-separator',
    explain: '选择范围时的分隔符',
    type: 'string',
    optionalValue: '—',
    defaultValue: 'To'
  },
  {
    name: 'unlink-panels',
    explain: '在范围选择器里取消两个日期面板之间的联动',
    type: 'boolean',
    optionalValue: '—',
    defaultValue: 'false'
  },
  {
    name: 'disabled-date',
    explain: '一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数。 应该返回一个 Boolean 值',
    type: 'function',
    optionalValue: '—',
    defaultValue: '—'
  },
  {
    name: 'shortcuts',
    explain: '设置快捷选项，需要传入数组对象',
    type: 'Array<{ text: string, value: Date | Function }>',
    optionalValue: '—',
    defaultValue: '—'
  }
])

const eventsList = ref([
  {
    name: 'change',
    explain: '用户确认选定的值时触发',
    value: '(val: typeof v-model)'
  },
  {
    name: 'focus',
    explain: '在组件 Input 获得焦点时触发',
    value: '(e: MouseEvent)'
  },
  {
    name: 'blur',
    explain: '在组件 Input 失去焦点时触发',
    value: '(e: MouseEvent)'
  }
])
const disabledDate = (time: Date) => {
  return time.getTime() > Date.now()
}

const inputDate = (e: any) => {
  console.log(e)
}
</script>
