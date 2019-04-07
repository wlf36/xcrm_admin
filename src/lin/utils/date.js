/**
 * @param {number} hours
 */
export function getDateAfterHours(hours) {
  const now = new Date()
  return new Date(now.setHours(now.getHours() + hours))
}
/**
 * @param {number} days
 */
export function getDateAfterDays(days) {
  const now = new Date()
  return new Date(now.setHours(now.getHours() + (days * 24)))
}

/**
 * 日期范围工具类
 */
class DateRangeUtil {
  // 一天的毫秒数
  millisecond = 1000 * 60 * 60 * 24

  // 获取当前时间
  currentDate = this.getCurrentDate()

  // 返回date是一周中的某一天
  week = this.currentDate.getDay()

  // 获得当前月份0-11
  currentMonth = this.currentDate.getMonth()

  // 获得当前年份4位年
  currentYear = this.currentDate.getFullYear()

  setStartStop(start, stop) {    
    let startStop = []
    startStop.push(start)
    startStop.push(stop)    
    return startStop
  }

  /**
   * 获得当前时间
   */
  getCurrentDate() {
    return new Date()
  }

  /**
   * 获得本周起止时间
   */
  getCurrentWeek() {
    // 减去的天数
    const minusDay = this.week !== 0 ? this.week - 1 : 6
    // alert(minusDay);
    // 本周周一
    const monday = new Date(this.currentDate.getTime() - (minusDay * this.millisecond))
    // 本周 周日
    const sunday = new Date(monday.getTime() + (6 * this.millisecond))

    return this.setStartStop(monday, sunday)
  }

  /**
   * 获得本月的起止时间
   */
  getCurrentMonth() {
    // 求出本月第一天
    const firstDay = new Date(this.currentYear, this.currentMonth, 1)

    let nextMonth = null
    let nextYear = null
    // 当为12月的时候年份需要加1
    // 月份需要更新为0 也就是下一年的第一个月
    if (this.currentMonth === 11) {
      nextYear = this.currentYear + 1
      nextMonth = 0
    } else {
      nextYear = this.currentYear
      // 否则只是月份增加,以便求的下一月的第一天
      nextMonth = this.currentMonth + 1
    }
    // 下月的第一天
    const nextMonthDayOne = new Date(nextYear, nextMonth, 1)
    // 求出上月的最后一天
    const lastDay = new Date(nextMonthDayOne.getTime() - this.millisecond)
    // 返回
    return this.setStartStop(firstDay, lastDay)
  }

  /**
   * 得到本季度开始的月份
   * @param month 需要计算的月份
   */
  getQuarterSeasonStartMonth(month) {
    const spring = 0 // 春
    const summer = 3 // 夏
    const fall = 6 // 秋
    const winter = 9 // 冬
    // 月份从0-11
    if (month < 3) {
      return spring
    }
    if (month < 6) {
      return summer
    }
    if (month < 9) {
      return fall
    }
    return winter
  }

  /**
   * 获得该月的天数
   * @param year年份
   * @param month月份
   */
  getMonthDays(year, month) {
    // 本月第一天 1-31
    const relativeDate = new Date(year, month, 1)
    // 获得当前月份0-11
    let relativeMonth = relativeDate.getMonth()
    // 获得当前年份4位年
    let relativeYear = relativeDate.getFullYear()

    // 当为12月的时候年份需要加1
    // 月份需要更新为0 也就是下一年的第一个月
    if (relativeMonth === 11) {
      relativeYear++
      relativeMonth = 0
    } else {
      // 否则只是月份增加,以便求的下一月的第一天
      relativeMonth++
    }
    // 下月的第一天
    const nextMonthDayOne = new Date(relativeYear, relativeMonth, 1)
    // 返回得到上月的最后一天,也就是本月总天数
    return new Date(nextMonthDayOne.getTime() - this.millisecond).getDate()
  }

  /**
   * 获得本季度的起止日期
   */
  getCurrentSeason() {
    // 获得本季度开始月份
    const quarterSeasonStartMonth = this.getQuarterSeasonStartMonth(this.currentMonth)
    // 获得本季度结束月份
    const quarterSeasonEndMonth = quarterSeasonStartMonth + 2
    // 获得本季度开始的日期
    const quarterSeasonStartDate = new Date(this.currentYear, quarterSeasonStartMonth, 1)
    // 获得本季度结束的日期
    const quarterSeasonEndDate = new Date(this.currentYear, quarterSeasonEndMonth, this.getMonthDays(this.currentYear, quarterSeasonEndMonth))
    // 返回
    return this.setStartStop(quarterSeasonStartDate, quarterSeasonEndDate)
  }

  /**
   * 得到本年的起止日期
   *
   */
  getCurrentYear() {
    // 本年第一天
    const currentYearFirstDate = new Date(this.currentYear, 0, 1)
    // 本年最后一天
    const currentYearLastDate = new Date(this.currentYear, 11, 31)
    // 返回
    return this.setStartStop(currentYearFirstDate, currentYearLastDate)
  }

  /**
   * 获得上一周的起止日期
   */
  getPreviousWeek() {
    // 减去的天数
    const minusDay = this.week !== 0 ? this.week - 1 : 6
    // 获得当前周的第一天
    const currentWeekDayOne = new Date(this.currentDate.getTime() - (this.millisecond * minusDay))
    // 上周最后一天即本周开始的前一天
    const priorWeekLastDay = new Date(currentWeekDayOne.getTime() - this.millisecond)
    // 上周的第一天
    const priorWeekFirstDay = new Date(priorWeekLastDay.getTime() - (this.millisecond * 6))

    return this.setStartStop(priorWeekFirstDay, priorWeekLastDay)
  }

  /**
   * 返回上一个月的第一天Date
   * @param year 年
   * @param month 月
   */
  getPriorMonthFirstDay(year, month) {
    // 年份为0代表,是本年的第一月,所以不能减
    if (month === 0) {
      month = 11 // 月份为上年的最后月份
      year-- // 年份减1
      return new Date(year, month, 1)
    }
    // 否则,只减去月份
    month--
    return new Date(year, month, 1)
  }

  /**
   * 获得上月的起止日期
   */
  getPreviousMonth() {
    // 获得上一个月的第一天
    const priorMonthFirstDay = this.getPriorMonthFirstDay(this.currentYear, this.currentMonth)
    // 获得上一月的最后一天
    const priorMonthLastDay = new Date(priorMonthFirstDay.getFullYear(), priorMonthFirstDay.getMonth(), this.getMonthDays(priorMonthFirstDay.getFullYear(), priorMonthFirstDay.getMonth()))
    // 返回
    return this.setStartStop(priorMonthFirstDay, priorMonthLastDay)
  }

  /**
   * 得到上季度的起始日期
   * year 这个年应该是运算后得到的当前本季度的年份
   * month 这个应该是运算后得到的当前季度的开始月份
   */
  getPriorSeasonFirstDay(year, month) {
    const spring = 0 // 春
    const summer = 3 // 夏
    const fall = 6 // 秋
    const winter = 9 // 冬
    // 月份从0-11
    const season = this.getQuarterSeasonStartMonth(month)
    switch (season) { // 季度的其实月份
      case spring:
        // 如果是第一季度则应该到去年的冬季
        year--
        month = winter
        break
      case summer:
        month = spring
        break
      case fall:
        month = summer
        break
      case winter:
        month = fall
        break
      default:
        month = null
    }

    return new Date(year, month, 1)
  }

  /**
   * 得到上季度的起止日期
   */
  getPreviousSeason() {
    // 上季度的第一天
    const priorSeasonFirstDay = this.getPriorSeasonFirstDay(this.currentYear, this.currentMonth)
    // 上季度的最后一天
    const priorSeasonLastDay = new Date(priorSeasonFirstDay.getFullYear(), priorSeasonFirstDay.getMonth() + 2, this.getMonthDays(priorSeasonFirstDay.getFullYear(), priorSeasonFirstDay.getMonth() + 2))
    return this.setStartStop(priorSeasonFirstDay, priorSeasonLastDay)
  }

  /**
   * 得到去年的起止日期
   */
  getPreviousYear() {
    const previousYear = this.currentYear - 1
    const priorYearFirstDay = new Date(previousYear, 0, 1)
    const priorYearLastDay = new Date(previousYear, 11, 31)
    return this.setStartStop(priorYearFirstDay, priorYearLastDay)
  }
}

export default new DateRangeUtil()
