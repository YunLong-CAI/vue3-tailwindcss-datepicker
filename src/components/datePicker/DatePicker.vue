<template>
  <div
    v-outside
    :class="[
      'flex',
      'box-border',
      'items-center',
      'relative',
      'flex-col',
      'my-0',
      // 'mx-auto',
      '!select-none',
      {'w-64': type === 'date'|| type === 'dates' || type === 'week' || type === 'month' || type === 'year' },
      {'w-96': type === 'daterange' || type === 'monthrange' }
    ]"
  >
    <template v-if="type === 'date' || type === 'dates' || type === 'week' || type === 'month' || type === 'year'">
      <div
        :class="[
          'w-64',
          'h-32px',
          'bg-white',
          'rounded-md',
          'border',
          'flex',
          'items-center',
          'box-border',
          'text-inherit',
          'pl-4',
          'pr-8',
          'py-0',
          'relative',
          'cursor-pointer',
          'dark:bg-slate-900',
          'dark:text-slate-200',
          'dark:border-slate-600',
          {'!border-[#3bf]': isShow},
          {'!bg-slate-50 dark:!bg-slate-700': disabled},
          {'cursor-not-allowed': disabled},
          {'!text-slate-300 dark:!text-gray-300': disabled},
          {'!select-none': disabled},
          {'h-40px': size === 'large'},
          {'h-24px': size === 'small'},
        ]"
        @mouseover="showClear = true"
        @mouseout="showClear = false"
      >
        <span class="flex-none w-3.5 h-3.5">
          <img
            src="@/assets/icon.png"
            class="w-3.5 h-3.5"
          >
        </span>
        <input
          :class="[
            'w-36',
            'grow',
            'outline-none',
            'text-sm',
            'h-30px',
            'px-2',
            'cursor-pointer',
            'disabled:bg-slate-50',
            'disabled:cursor-not-allowed',
            'disabled:text-slate-300',
            'disabled:select-none',
            'dark:bg-slate-900',
            'dark:text-slate-200',
            {'h-38px': size === 'large'},
            {'h-22px': size === 'small'},
          ]"
          :readOnly="readonly || !editable"
          :disabled="disabled"
          :placeholder="placeholder"
          :value="showValue"
        >
        <span
          v-show="showDate && showClear && clearable"
          class="absolute w-3.5 h-3.5 bottom-1/2 right-4 translate-y-1/2"
          @click.stop="clearShowDate"
        >
          <img
            src="@/assets/delete.png"
            class="w-3.5 h-3.5"
          >
        </span>
      </div>
    </template>
    <template v-if="type === 'daterange' || type === 'monthrange'">
      <div
        :class="[
          'w-96',
          'h-32px',
          'bg-white',
          'rounded-md',
          'border',
          'flex',
          'items-center',
          'box-border',
          'text-inherit',
          'pl-4',
          'pr-8',
          'py-0',
          'relative',
          'cursor-pointer',
          'dark:bg-slate-900',
          'dark:text-slate-200',
          'dark:border-slate-600',
          {'!border-[#3bf]': isShow},
          {'!bg-slate-50 dark:!bg-slate-700': disabled},
          {'cursor-not-allowed': disabled},
          {'!text-slate-300 dark:!text-gray-300': disabled},
          {'!select-none': disabled},
          {'h-40px': size === 'large'},
          {'h-24px': size === 'small'},
        ]"
        @mouseover="showClear = true"
        @mouseout="showClear = false"
      >
        <span class="flex-none w-3.5 h-3.5">
          <img
            src="@/assets/icon.png"
            class="w-3.5 h-3.5"
          >
        </span>
        <input
          :class="[
            'w-36',
            'grow',
            'outline-none',
            'text-sm',
            'h-30px',
            'text-center',
            'cursor-pointer',
            'dark:bg-slate-900',
            'dark:text-slate-200',
            'disabled:bg-slate-50',
            'disabled:cursor-not-allowed',
            'disabled:text-slate-300',
            'disabled:select-none',
            {'h-38px': size === 'large'},
            {'h-22px': size === 'small'},
          ]"
          :readOnly="readonly || !editable"
          :disabled="disabled"
          :placeholder="startPlaceholder"
          :value="showValue[0]"
        >
        <span class="flex-none mx-1 flex items-center justify-center">{{ rangeSeparator }}</span>
        <input
          :class="[
            'grow',
            'w-36',
            'outline-none',
            'text-sm',
            'h-30px',
            'text-center',
            'cursor-pointer',
            'dark:bg-slate-900',
            'dark:text-slate-200',
            'disabled:bg-slate-50',
            'disabled:cursor-not-allowed',
            'disabled:text-slate-300',
            'disabled:select-none',
            {'h-38px': size === 'large'},
            {'h-22px': size === 'small'},
          ]"
          :readOnly="readonly || !editable"
          :disabled="disabled"
          :placeholder="endPlaceholder"
          :value="showValue[1]"
        >
        <span
          v-show="showDate && showClear && clearable"
          class="absolute w-3.5 h-3.5 bottom-1/2 right-4 translate-y-1/2"
          @click.stop="clearShowDate"
        >
          <img
            src="@/assets/delete.png"
            class="w-3.5 h-3.5"
          >
        </span>
      </div>
    </template>
    <div
      v-if="isShow"
      ref="operateBox"
      :class="[
        'flex',
        'justify-center',
        'absolute',
        'z-999',
        'shadow-lg',
        'bg-white',
        'text-inherit',
        'border',
        'border-inherit',
        'border-solid',
        'rounded-md',
        'leading-4',
        'dark:border-slate-600',
        'dark:bg-slate-900',
        'dark:text-slate-300',
        'transition',
        {'top-12': seatY === 'bottom' || ''},
        {'bottom-12': seatY === 'top'}
      ]"
    >
      <div
        v-if="shortcutsList && shortcutsList.length > 0"
        class="w-32 border-r border-inherit border-solid pt-2"
      >
        <div
          v-for="(item,index) in shortcutsList"
          :key="index"
          class="w-full h-8 leading-8 cursor-pointer text-sm pl-4 pr-2 text-slate-600 dark:text-slate-300 hover:text-[#3bf]"
          @click="shortcutsValue(item)"
        >{{ item.text }}</div>
      </div>
      <template v-if="type === 'daterange' || type === 'monthrange'">
        <div class="flex justify-center">
          <div class="px-4 py-4 text-slate-600 border-r border-inherit border-solid dark:text-slate-300 dark:border-slate-600">
            <div class="flex relative justify-center mb-4 text-base">
              <span
                class="cursor-pointer absolute bottom-1/2 left-2 translate-y-1/2 hover:text-[#3bf]"
                @click="operate('reduceYear', 'select')"
              >&lt;&lt;</span>
              <span
                v-show="type === 'daterange'"
                class="cursor-pointer absolute bottom-1/2 left-12 translate-y-1/2 hover:text-[#3bf]"
                @click="operate('reduceMonth', 'select')"
              >&lt;</span>
              <div v-show="type === 'daterange'">
                <span class="mr-4">{{ getNowYearAndMonth(selectTime).year }}</span>
                <span>{{ getNowYearAndMonth(selectTime).month }}</span>
              </div>
              <span
                v-show="type === 'monthrange'"
              >{{ getYearScopeAndMonth('month',selectTime)[0].getFullYear() }}</span>
              <span
                v-show="type === 'daterange' && !unlinkPanels"
                :class="[
                  'cursor-pointer',
                  'absolute',
                  'bottom-1/2',
                  'right-12',
                  'translate-y-1/2',
                  'hover:text-[#3bf]',
                  {'text-slate-300 hover:text-slate-300 dark:text-slate-600 dark:hover:text-slate-600 !cursor-not-allowed': isChange(selectTime,lastDate,'month')}
                ]"
                @click="operate('addMonth', 'select', 'month')"
              >&gt;</span>
              <span
                v-show="!unlinkPanels"
                :class="[
                  'cursor-pointer',
                  'absolute',
                  'bottom-1/2',
                  'right-2',
                  'translate-y-1/2',
                  'hover:text-[#3bf]',
                  {'text-slate-300 hover:text-slate-300 dark:text-slate-600 dark:hover:text-slate-600 !cursor-not-allowed': isChange(selectTime,lastDate,'year')}
                ]"
                @click="operate('addYear', 'select', 'year')"
              >&gt;&gt;</span>
            </div>
            <div
              v-show="type === 'daterange'"
              class="flex justify-around text-xs pb-2"
            >
              <span
                v-for="w in weeks"
                :key="w"
                class="w-26px h-26px flex items-center justify-center"
              >{{ w }}</span>
            </div>
            <div
              v-if="type === 'daterange'"
              class="w-full h-px bg-slate-100 dark:bg-slate-600"
            />
            <template v-if="type === 'daterange'">
              <div
                v-for="m in 6"
                :key="m"
                :class="[
                  'flex',
                  'mt-2',
                  'justify-around'
                ]"
              >
                <div
                  v-for="n in 7"
                  :key="n"
                  :class="[
                    'px-2',
                    {'bg-[#f5f7fa] text-slate-400 hover:text-slate-400 dark:bg-slate-700 rounded-l-full': (judgeDate.length > 1 && isEquation(nowList[(m - 1) * 7 + (n - 1)], judgeDate[0])) && !isNowMonth(nowList[(m - 1) * 7 + (n - 1)],selectTime)},
                    {'bg-[#f5f7fa] text-slate-400 hover:text-slate-400 dark:bg-slate-700 rounded-r-full': (judgeDate.length > 1 && isEquation(nowList[(m - 1) * 7 + (n - 1)], judgeDate[1])) && !isNowMonth(nowList[(m - 1) * 7 + (n - 1)],selectTime)},
                    {'bg-[#f5f7fa] text-slate-400 hover:text-slate-400 dark:bg-slate-700': isScope(nowList[(m - 1) * 7 + (n - 1)], judgeDate) && !isNowMonth(nowList[(m - 1) * 7 + (n - 1)],selectTime)},
                    {'bg-[#f5f7fa] !cursor-not-allowed text-slate-400 hover:text-slate-400 dark:bg-slate-700 dark:hover:text-slate-400': exceedToday(nowList[(m - 1) * 7 + (n - 1)])}
                  ]"
                  @click="activeDay(nowList[(m - 1) * 7 + (n - 1)])"
                >
                  <span
                    :class="[
                      'flex',
                      'items-center',
                      'justify-center',
                      'cursor-pointer',
                      'my-1',
                      'mx-0',
                      'w-26px',
                      'h-26px',
                      'text-xs',
                      { 'text-slate-400': isNowMonth(nowList[(m - 1) * 7 + (n - 1)],selectTime) },
                      {'hover:text-[#3bf]': type === 'daterange' && !isNowMonth(nowList[(m - 1) * 7 + (n - 1)],selectTime)},
                      {'text-[#3bf] font-bold': isToday(nowList[(m - 1) * 7 + (n - 1)])},
                      {'!text-white rounded-full bg-[#3bf] hover:!text-white': (isDatesList(nowList[(m - 1) * 7 + (n - 1)],daterangeList) && !isNowMonth(nowList[(m - 1) * 7 + (n - 1)],selectTime))},
                      {'!cursor-not-allowed text-slate-400 hover:text-slate-400': exceedToday(nowList[(m - 1) * 7 + (n - 1)])}
                    ]"
                  >
                    {{ (nowList[(m - 1) * 7 + (n - 1)]).getDate() }}
                  </span>
                </div>
              </div>
            </template>
            <template v-if="type === 'monthrange'">
              <div class="w-80 flex flex-wrap">
                <div
                  v-for="(item,index) in getYearScopeAndMonth(type,selectTime)"
                  :key="index"
                  class="mb-4 last:mb-0"
                >
                  <div
                    :class="[
                      'px-2',
                      'py-1',
                      {'bg-[#f5f7fa] text-slate-400 hover:text-slate-400 dark:bg-slate-700 rounded-l-full': (judgeDate.length > 1 && isMonthEquation(item, judgeDate[0]))},
                      {'bg-[#f5f7fa] text-slate-400 hover:text-slate-400 dark:bg-slate-700 rounded-r-full': (judgeDate.length > 1 && isMonthEquation(item, judgeDate[1]))},
                      {'bg-[#f5f7fa] text-slate-400 hover:text-slate-400 dark:bg-slate-700': isScope(item, judgeDate)},
                      {'bg-[#f5f7fa] !cursor-not-allowed text-slate-400 hover:text-slate-400 dark:bg-slate-700 dark:hover:text-slate-400': exceedToday(item)}
                    ]"
                    @click="activeDay(item)"
                  >
                    <span
                      :class="[
                        'flex',
                        'items-center',
                        'justify-center',
                        'cursor-pointer',
                        'my-2',
                        'mx-1',
                        'w-14',
                        'h-8',
                        'text-xs',
                        'hover:text-[#3bf]',
                        {'!text-white rounded-full bg-[#3bf] hover:!text-white': (isMonthList(item,daterangeList))},
                        {'text-[#3bf] font-bold': isThisMonth(item)},
                        {'!cursor-not-allowed text-slate-400 hover:text-slate-400': exceedToday(item)}
                      ]"
                    >
                      {{ monthEnglish[item.getMonth()] }}
                    </span>
                  </div>
                </div>
              </div>
            </template>
          </div>
          <div class="px-4 py-4 text-slate-600 dark:text-slate-300">
            <div class="flex relative justify-center mb-4 text-base">
              <span
                v-show="!unlinkPanels"
                :class="[
                  'cursor-pointer',
                  'absolute',
                  'bottom-1/2',
                  'left-2',
                  'translate-y-1/2',
                  'hover:text-[#3bf]',
                  {'text-slate-300 hover:text-slate-300 dark:text-slate-600 dark:hover:text-slate-600 !cursor-not-allowed': isChange(selectTime,lastDate,'year')}
                ]"
                @click="operate('reduceYear', 'last', 'year')"
              >&lt;&lt;</span>
              <span
                v-show="type === 'daterange' && !unlinkPanels"
                :class="[
                  'cursor-pointer',
                  'absolute',
                  'bottom-1/2',
                  'left-12',
                  'translate-y-1/2',
                  'hover:text-[#3bf]',
                  {'text-slate-300 hover:text-slate-300 dark:text-slate-600 dark:hover:text-slate-600 !cursor-not-allowed': isChange(selectTime,lastDate,'month')}
                ]"
                @click="operate('reduceMonth', 'last', 'month')"
              >&lt;</span>
              <div v-show="type === 'daterange'">
                <span class="mr-4">{{ getNowYearAndMonth(lastDate).year }}</span>
                <span>{{ getNowYearAndMonth(lastDate).month }}</span>
              </div>
              <span
                v-show="type === 'monthrange'"
              >{{ getYearScopeAndMonth('month',lastDate)[0].getFullYear() }}</span>
              <span
                v-show="type === 'daterange'"
                class="cursor-pointer absolute bottom-1/2 right-12 translate-y-1/2 hover:text-[#3bf]"
                @click="operate('addMonth', 'last')"
              >&gt;</span>
              <span
                class="cursor-pointer absolute bottom-1/2 right-2 translate-y-1/2 hover:text-[#3bf]"
                @click="operate('addYear', 'last')"
              >&gt;&gt;</span>
            </div>
            <div
              v-show="type === 'daterange'"
              class="flex justify-around text-xs pb-2"
            >
              <span
                v-for="w in weeks"
                :key="w"
                class="w-26px h-26px flex items-center justify-center"
              >{{ w }}</span>
            </div>
            <div
              v-if="type === 'daterange'"
              class="w-full h-px bg-slate-100 dark:bg-slate-600"
            />
            <template v-if="type === 'daterange'">
              <div
                v-for="m in 6"
                :key="m"
                :class="[
                  'flex',
                  'mt-2',
                  'justify-around'
                ]"
              >
                <div
                  v-for="n in 7"
                  :key="n"
                  :class="[
                    'px-2',
                    {'bg-[#f5f7fa] text-slate-400 hover:text-slate-400 dark:bg-slate-700 rounded-l-full': (judgeDate.length > 1 && isEquation(lastList[(m - 1) * 7 + (n - 1)], judgeDate[0])) && !isNowMonth(lastList[(m - 1) * 7 + (n - 1)],lastDate)},
                    {'bg-[#f5f7fa] text-slate-400 hover:text-slate-400 dark:bg-slate-700 rounded-r-full': (judgeDate.length > 1 && isEquation(lastList[(m - 1) * 7 + (n - 1)], judgeDate[1])) && !isNowMonth(lastList[(m - 1) * 7 + (n - 1)],lastDate)},
                    {'bg-[#f5f7fa] text-slate-400 hover:text-slate-400 dark:bg-slate-700': isScope(lastList[(m - 1) * 7 + (n - 1)], judgeDate) && !isNowMonth(lastList[(m - 1) * 7 + (n - 1)],lastDate)},
                    {'bg-[#f5f7fa] !cursor-not-allowed text-slate-400 hover:text-slate-400 dark:bg-slate-700': exceedToday(lastList[(m - 1) * 7 + (n - 1)])}
                  ]"
                  @click="activeDay(lastList[(m - 1) * 7 + (n - 1)])"
                >
                  <span
                    :class="[
                      'flex',
                      'items-center',
                      'justify-center',
                      'cursor-pointer',
                      'my-1',
                      'mx-0',
                      'w-26px',
                      'h-26px',
                      'text-xs',
                      { 'text-slate-400': isNowMonth(lastList[(m - 1) * 7 + (n - 1)],lastDate) },
                      {'hover:text-[#3bf]': !isNowMonth(lastList[(m - 1) * 7 + (n - 1)],lastDate)},
                      {'text-[#3bf] font-bold': isToday(lastList[(m - 1) * 7 + (n - 1)]) && !isNowMonth(lastList[(m - 1) * 7 + (n - 1)],lastDate)},
                      {'!text-white rounded-full bg-[#3bf] hover:!text-white': (isDatesList(lastList[(m - 1) * 7 + (n - 1)],daterangeList)) && !isNowMonth(lastList[(m - 1) * 7 + (n - 1)],lastDate)},
                      {'!cursor-not-allowed text-slate-400 hover:text-slate-400': exceedToday(lastList[(m - 1) * 7 + (n - 1)])}
                    ]"
                  >
                    {{ (lastList[(m - 1) * 7 + (n - 1)]).getDate() }}
                  </span>
                </div>
              </div>
            </template>
            <template v-if="type === 'monthrange'">
              <div class="w-80 flex flex-wrap">
                <div
                  v-for="(item,index) in getYearScopeAndMonth(type,lastDate)"
                  :key="index"
                  class="mb-4 last:mb-0"
                >
                  <div
                    :class="[
                      'px-2',
                      'py-1',
                      {'bg-[#f5f7fa] text-slate-400 hover:text-slate-400 dark:bg-slate-700 rounded-l-full': (judgeDate.length > 1 && isMonthEquation(item, judgeDate[0]))},
                      {'bg-[#f5f7fa] text-slate-400 hover:text-slate-400 dark:bg-slate-700 rounded-r-full': (judgeDate.length > 1 && isMonthEquation(item, judgeDate[1]))},
                      {'bg-[#f5f7fa] text-slate-400 hover:text-slate-400 dark:bg-slate-700': isScope(item, judgeDate)},
                      {'bg-[#f5f7fa] !cursor-not-allowed text-slate-400 hover:text-slate-400 dark:bg-slate-700 dark:hover:text-slate-400': exceedToday(item)}
                    ]"
                    @click="activeDay(item)"
                  >
                    <span
                      :class="[
                        'flex',
                        'items-center',
                        'justify-center',
                        'cursor-pointer',
                        'my-2',
                        'mx-1',
                        'w-14',
                        'h-8',
                        'text-xs',
                        'hover:text-[#3bf]',
                        {'!text-white rounded-full bg-[#3bf] hover:!text-white': (isMonthList(item,daterangeList))},
                        {'text-[#3bf] font-bold': isThisMonth(item)},
                        {'!cursor-not-allowed text-slate-400 hover:text-slate-400': exceedToday(item)}
                      ]"
                    >
                      {{ monthEnglish[item.getMonth()] }}
                    </span>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="px-4 py-4 text-slate-600 dark:text-slate-300">
          <div class="flex justify-around mb-4 text-base">
            <span
              class="cursor-pointer hover:text-[#3bf]"
              @click="operate('reduceYear','select')"
            >&lt;&lt;</span>
            <span
              v-show="type === 'date' || type === 'week' || type === 'dates'"
              class="cursor-pointer hover:text-[#3bf]"
              @click="operate('reduceMonth','select')"
            >&lt;</span>
            <span
              v-show="type === 'date' || type === 'week' || type === 'dates'"
            >{{ getNowYearAndMonth(selectTime).year }}</span>
            <span
              v-show="type === 'date' || type === 'week' || type === 'dates'"
            >{{ getNowYearAndMonth(selectTime).month }}</span>
            <span
              v-show="type === 'year'"
            >{{ getYearScopeAndMonth('year',selectTime)[0].getFullYear() }} - {{ getYearScopeAndMonth('year',selectTime)[9].getFullYear() }}</span>
            <span
              v-show="type === 'month'"
            >{{ getYearScopeAndMonth('month',selectTime)[0].getFullYear() }}</span>
            <span
              v-show="type === 'date' || type === 'week' || type === 'dates'"
              class="cursor-pointer hover:text-[#3bf]"
              @click="operate('addMonth','select')"
            >&gt;</span>
            <span
              class="cursor-pointer hover:text-[#3bf]"
              @click="operate('addYear','select')"
            >&gt;&gt;</span>
          </div>
          <div
            v-show="type === 'date' || type === 'week' || type === 'dates'"
            class="flex justify-around text-xs pb-2"
          >
            <span
              v-for="w in weeks"
              :key="w"
              class="w-26px h-26px flex items-center justify-center"
            >{{ w }}</span>
          </div>
          <div class="w-full h-px bg-slate-100 dark:bg-slate-600" />
          <template v-if="type === 'date' || type === 'week' || type === 'dates'">
            <div
              v-for="m in 6"
              :key="m"
              :class="[
                'flex',
                'mt-2',
                'justify-around',
                {'bg-slate-200 dark:bg-slate-700': type === 'week' && WeekStartAndEndScope(nowList[(m - 1) * 7 ],judgeDate) && isActive},
                {'hover:bg-slate-200 rounded-full cursor-pointer dark:hover:bg-slate-700': type === 'week'}
              ]"
            >
              <div
                v-for="n in 7"
                :key="n"
                :class="[
                  'px-2',
                  {'bg-[#f5f7fa] !cursor-not-allowed text-slate-400 hover:text-slate-400 dark:bg-slate-700': exceedToday(nowList[(m - 1) * 7 + (n - 1)])}
                ]"
                @click="activeDay(nowList[(m - 1) * 7 + (n - 1)])"
              >
                <span
                  :class="[
                    'flex',
                    'items-center',
                    'justify-center',
                    'cursor-pointer',
                    'my-1',
                    'mx-0',
                    'w-26px',
                    'h-26px',
                    'text-xs',
                    { 'text-slate-400': isNowMonth(nowList[(m - 1) * 7 + (n - 1)],selectTime) },
                    {'hover:text-[#3bf]': type === 'date' && !isNowMonth(nowList[(m - 1) * 7 + (n - 1)],selectTime)},
                    {'text-[#3bf] font-bold': isToday(nowList[(m - 1) * 7 + (n - 1)]) && !isNowMonth(nowList[(m - 1) * 7 + (n - 1)],selectTime)},
                    {'!text-white rounded-full bg-[#3bf] hover:!text-white': (type === 'dates' && isDatesList(nowList[(m - 1) * 7 + (n - 1)], datesList))},
                    {'!text-white rounded-full bg-[#3bf] hover:!text-white': (type === 'week' && isWeekStartAndEnd(nowList[(m - 1) * 7 + (n - 1)],judgeDate) && isActive)},
                    {'!text-white rounded-full bg-[#3bf] hover:!text-white': (type === 'date' && isEquation(nowList[(m - 1) * 7 + (n - 1)], judgeDate) && isActive)},
                    {'!cursor-not-allowed text-slate-400 hover:text-slate-400 dark:bg-slate-700': exceedToday(nowList[(m - 1) * 7 + (n - 1)])}
                  ]"
                >
                  {{ (nowList[(m - 1) * 7 + (n - 1)]).getDate() }}
                </span>
              </div>
            </div>
            <div
              v-show="type === 'dates'"
              class="w-full h-px bg-slate-100 dark:bg-slate-600"
            />
            <div
              v-show="type === 'dates'"
              class="w-full mt-2 flex flex-row-reverse"
            >
              <div
                class="flex px-2 py-1 cursor-pointer text-xs text-slate-500 justify-center items-center dark:text-slate-300 dark:border-slate-700 rounded-md border border-inherit border-solid hover:text-[#3bf] hover:border-[#3bf]"
                @click="closeBox"
              >OK</div>
            </div>
          </template>
          <template v-if="type === 'year' || type === 'month'">
            <div class="w-80 flex flex-wrap">
              <div
                v-for="(item,index) in getYearScopeAndMonth(type,selectTime)"
                :key="index"
                :class="[
                  'px-4',
                  'py-4',
                  {'bg-[#f5f7fa] !cursor-not-allowed text-slate-400 hover:text-slate-400 dark:bg-slate-700': exceedToday(item)}
                ]"
                @click="activeDay(item)"
              >
                <span
                  :class="[
                    'flex',
                    'items-center',
                    'justify-center',
                    'cursor-pointer',
                    'my-2',
                    'mx-1',
                    'w-10',
                    'h-26px',
                    'text-xs',
                    'hover:text-[#3bf]',
                    {'text-[#3bf] font-bold': type === 'year' && isThisYear(item)},
                    {'text-[#3bf] font-bold': type === 'month' && isThisMonth(item)},
                    {'!text-[#3bf]': (type === 'month' && item.getMonth() === judgeDate.getMonth()) && isActive},
                    {'!text-[#3bf]': (type === 'year' && item.getFullYear() === judgeDate.getFullYear()) && isActive},
                    {'!cursor-not-allowed text-slate-400 hover:text-slate-400': exceedToday(item)}
                  ]"
                >
                  {{ type === 'year' ? item.getFullYear() : monthEnglish[item.getMonth()] }}
                </span>
              </div>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MyDatePicker'
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted, watch, onUnmounted, nextTick, Directive } from 'vue'
import { getYearScopeAndMonth, isNowMonth, getOffset, isScope, isMonthEquation, isMonthList, isChange, copy, getLastYear, getNowYearAndMonth, getLastMonth, isArray, isEquation, getVisibleDays, parsePropsValue, isWeekStartAndEnd, WeekStartAndEndScope, isDatesList, isThisMonth, isThisYear, formateDate, isToday, getYearWeek } from '@/utils/date'

const props = defineProps({
  modelValue: {
    type: [Date, Number, String, Object],
    default: ''
  },
  readonly: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'default'
  },
  editable: {
    type: Boolean,
    default: true
  },
  placeholder: {
    type: String,
    default: 'Pick a date'
  },
  clearable: {
    type: Boolean,
    default: true
  },
  disabledDate: {
    type: Function,
    default: () => {}
  },
  type: {
    type: String,
    default: 'date'
  },
  shortcuts: {
    type: Array,
    default: () => { [] }
  },
  startPlaceholder: {
    type: String,
    default: 'Start date'
  },
  endPlaceholder: {
    type: String,
    default: 'End date'
  },
  rangeSeparator: {
    type: String,
    default: 'To'
  },
  unlinkPanels: {
    type: Boolean,
    default: false
  }
})

const type = ref(props.type)
const shortcutsList = ref<any>(props.shortcuts)
const judgeDate = ref<any>(new Date())
const lastDate = ref<any>(new Date())
const flag = ref(0)
const selectTime = ref<Date>(new Date())
const isShow = ref(false)
const weeks = ref(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])
const showClear = ref(false)
const isActive = ref(false)
const monthEnglish = ref(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Spt', 'Oct', 'Nov', 'Dec'])
const datesList = ref<any>([])
const emits = defineEmits(['update:modelValue', 'change', 'focus', 'blur'])
const daterangeList = ref<any>([])
const operateBox = ref()
const operateBoxObj = ref<any>({})
const bodyWidth = ref()
const bodyHeight = ref()
const seatY = ref('bottom')
const oldScrollTop = ref(0)
const scrollTop = ref<number>(0)
const scrollFixedStatus = ref<boolean>(true)

onMounted(() => {
  bodyWidth.value = document.documentElement.clientWidth
  bodyHeight.value = document.documentElement.clientHeight
  window.addEventListener('scroll', handleScroll, true)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(() => props.modelValue, (e:any) => {
  if (e) {
    isActive.value = true
    judgeDate.value = e
    if (type.value === 'daterange' || type.value === 'monthrange') {
      if (isArray(e)) {
        daterangeList.value = e
      }
    }
    if (type.value === 'dates') {
      if (isArray(e)) {
        datesList.value = e
      }
    }
    emits('change', e)
  }
}, { immediate: true, deep: true })

const vOutside: Directive = {
  mounted(el, binding) {
    // console.log('2122', el, binding)
    function handler(e: MouseEvent) {
      if (el.contains(e.target)) {
        emits('focus', e)
        if (!isShow.value && (props.readonly !== true && props.disabled !== true)) {
          isShow.value = true
          nextTick(() => {
            operateBoxObj.value.top = getOffset(operateBox.value).top
            operateBoxObj.value.width = operateBox.value.offsetWidth
            operateBoxObj.value.height = operateBox.value.offsetHeight
            computedSeatY(scrollTop.value)
          })
          if (type.value === 'daterange' || type.value === 'monthrange') {
            if (props.unlinkPanels) {
              selectTime.value = parsePropsValue(judgeDate.value, type.value).startDate
              if (type.value === 'daterange') {
                const temp = copy(selectTime.value)
                lastDate.value = getLastMonth(temp)
              } else {
                const temp = copy(selectTime.value)
                lastDate.value = getLastYear(temp)
              }
            } else {
              selectTime.value = parsePropsValue(judgeDate.value, type.value).startDate
              if (type.value === 'daterange') {
                const temp = copy(selectTime.value)
                lastDate.value = getLastMonth(temp)
                if (!isChange(parsePropsValue(judgeDate.value, type.value).endDate, lastDate.value, 'month')) {
                  lastDate.value = parsePropsValue(judgeDate.value, type.value).endDate
                }
              } else {
                const temp = copy(selectTime.value)
                lastDate.value = getLastYear(temp)
                if (!isChange(parsePropsValue(judgeDate.value, type.value).endDate, lastDate.value, 'year')) {
                  lastDate.value = parsePropsValue(judgeDate.value, type.value).endDate
                }
              }
            }
          } else {
            selectTime.value = parsePropsValue(judgeDate.value, type.value)
          }
        }
      } else {
        emits('blur', e)
        if (isShow.value) {
          isShow.value = false
          seatY.value = 'bottom'
        }
      }
    }
    el._handler_ = handler
    document.addEventListener('click', handler)
  },
  unmounted(el) {
    document.removeEventListener('click', el._handler_)
    delete el._handler_
  }
}


const computedSeatY = (e: number) => {
  if (seatY.value === 'bottom') {
    if ((bodyHeight.value - (operateBoxObj.value.top - e)) < operateBoxObj.value.height) {
      seatY.value = 'top'
    } else {
      seatY.value = 'bottom'
    }
  } else {
    if ((bodyHeight.value - (operateBoxObj.value.top - e)) > operateBoxObj.value.height) {
      seatY.value = 'bottom'
    } else {
      seatY.value = 'top'
    }
  }
}

const nowList = computed(() => {
  return getVisibleDays(selectTime.value)
})

const lastList = computed(() => {
  return getVisibleDays(lastDate.value)
})

const showValue = computed(() => {
  if (type.value === 'date') {
    if (isToday(judgeDate.value) === isToday(new Date()) && !flag.value) {
      return ''
    } else {
      return formateDate(judgeDate.value, '{y}-{m}-{d}')
    }
  } else if (type.value === 'week') {
    if (isToday(judgeDate.value) === isToday(new Date()) && !isActive.value) {
      return ''
    } else {
      return `Week ${getYearWeek(judgeDate.value)}`
    }
  } else if (type.value === 'year') {
    if (isThisYear(judgeDate.value) === isThisYear(new Date()) && !flag.value) {
      return ''
    } else {
      return formateDate(judgeDate.value, '{y}')
    }
  } else if (type.value === 'month') {
    if (isThisMonth(judgeDate.value) === isThisMonth(new Date()) && !flag.value) {
      return ''
    } else {
      return formateDate(judgeDate.value, '{y}-{m}')
    }
  } else if (type.value === 'dates') {
    if (isArray(datesList.value)) {
      if (datesList.value.length > 0) {
        return datesList.value.map((item: any) => {
          return formateDate(item, '{y}-{m}-{d}')
        }).join(',')
      } else {
        return ''
      }
    } else {
      return ''
    }
  } else if (type.value === 'daterange' || type.value === 'monthrange') {
    if (judgeDate.value.length !== 2) {
      return []
    } else {
      if (type.value === 'monthrange') {
        return judgeDate.value.map((item: any) => {
          return formateDate(item, '{y}-{m}')
        })
      } else {
        return judgeDate.value.map((item: any) => {
          return formateDate(item, '{y}-{m}-{d}')
        })
      }
    }
  } else {
    return ''
  }
})

const showDate = computed(() => {
  if (type.value === 'daterange' || type.value === 'dates' || type.value === 'monthrange') {
    if (isArray(judgeDate.value) && judgeDate.value.length > 0) {
      return true
    } else {
      return false
    }
  } else {
    if (props.modelValue) {
      return true
    } else {
      return false
    }
  }
})

const exceedToday = (date: Date) => {
  return props.disabledDate(date)
}

const handleScroll = () => {
  scrollTop.value = document.documentElement.scrollTop || document.body.scrollTop
}

watch(() => scrollTop.value, (newValue, oldValue) => {
  setTimeout(() => {
    if (newValue === window.scrollY) {
      // console.log('end')
      oldScrollTop.value = newValue
      computedSeatY(newValue)
    }
  }, 20)
  if (oldScrollTop.value === oldValue) {
    scrollFixedStatus.value = false
    // console.log('start')
  }
}
)

const activeDay = (date: Date) => {
  if (exceedToday(date)) return
  flag.value++
  isActive.value = true
  if (type.value === 'dates') {
    if (datesList.value.length > 0) {
      const index = datesList.value.map((item: any) => {
        return formateDate(item, '{y}-{m}-{d}')
      }).indexOf(formateDate(date, '{y}-{m}-{d}'))
      if (index === -1) {
        datesList.value.push(date)
      } else {
        datesList.value.splice(index, 1)
      }
    } else {
      datesList.value.push(date)
    }
    judgeDate.value = datesList.value
  } else if (type.value === 'daterange' || type.value === 'monthrange') {
    if (daterangeList.value.length >= 0 && daterangeList.value.length < 2) {
      daterangeList.value.push(date)
      if (daterangeList.value.length === 1) {
        return
      } else {
        const tempList = daterangeList.value.map((item: Date) => {
          return item
        }).sort((a:any, b:any) => {
          return a - b
        })
        daterangeList.value = tempList
      }
    } else {
      daterangeList.value = []
      daterangeList.value.push(date)
    }
    judgeDate.value = daterangeList.value
  } else if (type.value === 'week') {
    const weeks = date.getDay()
    const weekStart = new Date(date.getTime() - weeks * 24 * 60 * 60 * 1000)
    judgeDate.value = weekStart
  } else {
    judgeDate.value = date
  }
  if (type.value === 'dates' || type.value === 'daterange' || type.value === 'monthrange') {
    emits('update:modelValue', judgeDate.value)
  } else {
    isShow.value = false
    seatY.value = 'bottom'
    emits('update:modelValue', judgeDate.value)
  }
}

const operate = (e: string, unlinkType?: string, model?: any) => {
  if (type.value === 'daterange' && model && isChange(selectTime.value, lastDate.value, model)) return
  let tempTime
  if (props.unlinkPanels) {
    tempTime = new Date(selectTime.value.getTime())
  } else {
    if (unlinkType === 'select') {
      tempTime = new Date(selectTime.value.getTime())
    } else {
      tempTime = new Date(lastDate.value.getTime())
    }
  }
  if (e === 'reduceMonth') {
    tempTime.setMonth(tempTime.getMonth())
    tempTime.setDate(0)
  }
  if (e === 'addMonth') {
    tempTime.setMonth(tempTime.getMonth() + 2)
    tempTime.setDate(0)
  }
  if (e === 'reduceYear') {
    if (type.value === 'date' || type.value === 'week' || type.value === 'month' || type.value === 'daterange') {
      tempTime.setFullYear(tempTime.getFullYear() - 1)
    }
    if (type.value === 'year') {
      tempTime.setFullYear(tempTime.getFullYear() - 10)
    }
  }
  if (e === 'addYear') {
    if (type.value === 'date' || type.value === 'week' || type.value === 'month' || type.value === 'daterange') {
      tempTime.setFullYear(tempTime.getFullYear() + 1)
    }
    if (type.value === 'year') {
      tempTime.setFullYear(tempTime.getFullYear() + 10)
    }
  }
  if (props.unlinkPanels) {
    selectTime.value = tempTime
    const temp = copy(selectTime.value)
    lastDate.value = getLastMonth(temp)
  } else {
    if (unlinkType === 'select') {
      selectTime.value = tempTime
    } else {
      lastDate.value = tempTime
    }
  }
}

const clearShowDate = () => {
  if (isShow.value) {
    isShow.value = false
    seatY.value = 'bottom'
  }
  if (type.value === 'dates' || type.value === 'daterange' || type.value === 'monthrange') {
    selectTime.value = new Date()
    datesList.value = []
    daterangeList.value = []
    judgeDate.value = []
    emits('update:modelValue', judgeDate.value)
  }
  if (type.value !== 'dates') {
    judgeDate.value = ''
    isActive.value = false
    emits('update:modelValue', judgeDate.value)
    judgeDate.value = new Date()
  }
  flag.value = 0
}

const closeBox = () => {
  if (isShow.value) {
    isShow.value = false
    seatY.value = 'bottom'
  }
}

const shortcutValue = ref<any>()
const shortcutsValue = (shortcut: any) => {
  if (typeof shortcut.value === 'function') {
    shortcutValue.value = shortcut.value()
  } else {
    shortcutValue.value = shortcut.value
  }
  if (type.value === 'daterange' || type.value === 'monthrange') {
    judgeDate.value = shortcutValue.value
    emits('update:modelValue', judgeDate.value)
    isShow.value = false
    seatY.value = 'bottom'
  } else {
    activeDay(shortcutValue.value)
  }
}

</script>
