export function copy(obj: any) {
  const temp = JSON.parse(JSON.stringify(obj))
  return temp
}

export function formatTime(time: Date) {
  const date = new Date(time)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return { year, month, day }
}

export function getNowYearAndMonth(time: Date) {
  const { year } = formatTime(time)
  const month = getNowMonth(time)
  return {
    year, month
  }
}

export function isChange(oneTime: Date, twoTime: Date, type: string) {
  const { year, month } = formatTime(oneTime)
  const { year: y, month: m } = formatTime(twoTime)
  if (type === 'year') {
    if (y > year + 1) {
      return false
    } else if (y === year + 1 && m >= month + 1) {
      return false
    } else {
      return true
    }
  } else if (type === 'month') {
    if (y === year) {
      if (m > month + 1) {
        return false
      } else {
        return true
      }
    } else {
      return false
    }
  }
}

export function isNowMonth(date: Date, nowDate: Date) {
  const { year, month } = formatTime(date)
  const { year: y, month: m } = formatTime(nowDate)
  return year !== y || month !== m
}

export function judgeType(obj: any) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}

export function isArray(obj: any) {
  return judgeType(obj) === 'array'
}

export function isDate(obj: any) {
  return judgeType(obj) === 'Date'
}

export function padZero(time: number | string) {
  if (typeof time === 'number') {
    return time.toString().padStart(2, '0')
  } else {
    return time.padStart(2, '0')
  }
}

export function getVisibleDays(time: Date) {
  const { year, month } = formatTime(time)
  const firstDay: Date = new Date(year, month - 1, 1)
  let weeks: number = firstDay.getDay()
  if (weeks === 0) {
    weeks = 7
  }
  const weeksDate:number = weeks * 24 * 60 * 60 * 1000
  const firstDate:number = firstDay.getTime() - weeksDate
  const arr = []
  for (let i = 0; i < 42; i++) {
    arr.push(new Date(firstDate + i * 24 * 60 * 60 * 1000))
  }
  return arr
}

export function getLastMonth(time: Date) {
  const tempTime: Date = parseTime(time)
  tempTime.setMonth(tempTime.getMonth() + 2)
  tempTime.setDate(0)
  return tempTime
}

export function getLastYear(time: Date) {
  const tempTime: Date = parseTime(time)
  tempTime.setFullYear(tempTime.getFullYear() + 1)
  tempTime.setMonth(0)
  return tempTime
}

export function parsePropsValue(time: any, type: string):any {
  if (!time) {
    return new Date()
  }
  if (type === 'date') {
    return parseTime(time)
  }
  if (type === 'dates') {
    if ((typeof time === 'string')) {
      const list = time.split(',')
      return parseTime(list[list.length - 1])
    } else if (isArray(time)) {
      if (time.length > 0) {
        return parseTime(time[time.length - 1])
      } else {
        return new Date()
      }
    } else {
      return parseTime(time)
    }
  }
  if (type === 'week') {
    const tempTime = parseTime(time)
    const weeks = tempTime.getDay()
    const weekStart = new Date(tempTime.getTime() - weeks * 24 * 60 * 60 * 1000)
    // const weekEnd = new Date(time.getTime() + (6 - weeks) * 24 * 60 * 60 * 1000)
    return parseTime(weekStart)
  }
  if (type === 'year') {
    if ((typeof time === 'number')) {
      const date = new Date()
      time = date.setFullYear(time)
      return parseTime(time)
    } else if ((typeof time === 'string')) {
      time = Number(time)
      const date = new Date()
      time = date.setFullYear(time)
      return parseTime(time)
    } else {
      return parseTime(time)
    }
  }
  if (type === 'month') {
    if ((typeof time === 'string')) {
      const date = new Date(Date.parse(time.replace(/-/g, '/')))
      return parseTime(date)
    } else {
      const { year, month } = formatTime(time)
      return parseTime(new Date(year, month - 1, 1))
    }
  }
  if (type === 'daterange' || type === 'monthrange') {
    let startDate
    let endDate
    if (isArray(time)) {
      if (time.length === 2) {
        startDate = parseTime(time[0])
        endDate = parseTime(time[1])
      } else {
        startDate = new Date()
        if (type === 'daterange') {
          const temp = copy(startDate)
          endDate = getLastMonth(temp)
        } else {
          const temp = copy(startDate)
          endDate = getLastYear(temp)
        }
      }
      return {
        startDate,
        endDate
      }
    } else {
      startDate = new Date()
      if (type === 'daterange') {
        const temp = copy(startDate)
        endDate = getLastMonth(temp)
      } else {
        const temp = copy(startDate)
        endDate = getLastYear(temp)
      }
      return {
        startDate,
        endDate
      }
    }
  }
}

export function parseTime(time: string | number | Date):any {
  if (!time) {
    return {}
  }
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  return date
}

export function formateDate(time: string | number | Date, cFormat: string) {
  if (!time) {
    return ''
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj: any = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result: any, key: string) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

export function isEquation(timeOne: Date, timeTwo:Date) {
  const { year, month, day } = formatTime(timeOne)
  const { year: y, month: m, day: d } = formatTime(timeTwo)
  return year === y && month === m && day === d
}

export function isMonthEquation(timeOne: Date, timeTwo:Date) {
  const { year, month } = formatTime(timeOne)
  const { year: y, month: m } = formatTime(timeTwo)
  return year === y && month === m
}

export function isToday(date: Date) {
  const { year, month, day } = formatTime(date)
  const { year: y, month: m, day: d } = formatTime(new Date())
  return year === y && month === m && day === d
}

export function getNowMonth(time: Date) {
  const { month } = formatTime(time)
  const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return monthArray[month - 1]
}

export function getYearWeek(time: Date) {
  const { year, month, day } = formatTime(time)
  const date1 = new Date(year, month - 1, day)
  const date2 = new Date(year, 0, 1)
  const d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000)
  return Math.ceil((d + ((date2.getDay() + 1) - 1)) / 7)
}

export function WeekStartAndEndScope(time: Date, propsDate: Date) {
  const weeks = propsDate.getDay()
  const weekStart = new Date(propsDate.getTime() - weeks * 24 * 60 * 60 * 1000)
  if (isEquation(time, weekStart)) {
    return true
  } else {
    return false
  }
}

export function isWeekStartAndEnd(time: Date, propsDate: Date) {
  const weeks = propsDate.getDay()
  const weekStart = new Date(propsDate.getTime() - weeks * 24 * 60 * 60 * 1000)
  const weekEnd = new Date(propsDate.getTime() + (6 - weeks) * 24 * 60 * 60 * 1000)
  if (isEquation(time, weekStart) || isEquation(time, weekEnd)) {
    return true
  } else {
    return false
  }
}

export function getYearScopeAndMonth(type:string, date: Date) {
  if (type === 'year') {
    const { year } = formatTime(date)
    const length = year.toString().length
    const newArr = year.toString().split('')
    newArr[length - 1] = '0'
    const startYear = Number(newArr.join(''))
    const dt = new Date()
    const yearArr = []
    for (let i = 0; i < 10; i++) {
      yearArr.push(new Date(dt.setFullYear(startYear + i * 1)))
    }
    return yearArr
  } else if (type === 'month' || type === 'monthrange') {
    const { year } = formatTime(date)
    const monthArr = []
    for (let i = 0; i < 12; i++) {
      monthArr.push(new Date(new Date(year, i * 1)))
    }
    return monthArr
  } else {
    return []
  }
}

export function isThisYear(date: Date) {
  const { year } = formatTime(date)
  const { year: y } = formatTime(new Date())
  return year === y
}

export function isThisMonth(date: Date) {
  const { year, month } = formatTime(date)
  const { year: y, month: m } = formatTime(new Date())
  return year === y && month === m
}

export function isScope(date: Date, list: any) {
  if (list.length > 1) {
    const startDate = parseTime(list[0]).getTime()
    const endDate = parseTime(list[1]).getTime()
    const nowDate = date.getTime()
    if (nowDate > startDate && nowDate < endDate) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

export function isDatesList(date: Date, list: any) {
  const temp = formateDate(date, '{y}-{m}-{d}')
  const flag = list.map((item: Date) => {
    return formateDate(item, '{y}-{m}-{d}')
  }).indexOf(temp)
  if (flag !== -1) {
    return true
  } else {
    return false
  }
}

export function isMonthList(date: Date, list: any) {
  const temp = formateDate(date, '{y}-{m}')
  const flag = list.map((item: Date) => {
    return formateDate(item, '{y}-{m}')
  }).indexOf(temp)
  if (flag !== -1) {
    return true
  } else {
    return false
  }
}

export function getOffset(element: any) {
  let left = element.offsetLeft
  let top = element.offsetTop
  let parent = element.offsetParent
  while (parent !== null) {
    left += parent.offsetLeft
    top += parent.offsetTop
    parent = parent.offsetParent
  }
  return { left, top }
}
