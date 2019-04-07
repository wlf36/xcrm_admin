/* eslint-disable class-methods-use-this */
import {
  get,
  post,
  put,
  _delete,
} from '../utils/http'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Customer {
  // constructor() {}

  // 类中的方法可以代表一个用户行为
  async addCustomer(info) {
    const res = await post('cms/customer/', info)
    return res
  }

  // 在这里通过 async await 语法糖让代码同步执行
  // 1. await 一定要搭配 async 来使用
  // 2. await 后面跟的是一个 Promise 对象
  async getCustomer(id) {
    const res = await get(`cms/customer/${id}`)
    return res
  }

  async editCustomer(id, info) {
    const res = await put(`cms/customer/${id}`, info)
    return res
  }

  async updateVisit(id) {
    const res = await put(`cms/customer/updatevisit/${id}`)
    return res
  }

  async updateReask(id) {
    const res = await put(`cms/customer/updatereask/${id}`)
    return res
  }

  async delectCustomer(id) {
    const res = await _delete(`cms/customer/${id}`)
    return res
  }

  async getCustomers({
    count,
    page,
    keyword,
    keymeta,
    status,
    start,
    end,
  }) {
    const res = await get('cms/customer/', {
      count,
      page,
      keyword,
      keymeta,
      status,
      start,
      end,
    })
    return res
  }

  async exportCustomers({
    status,
    start,
    end,
  }) {
    const res = await get('cms/customer/export', {
      status,
      start,
      end,
    })
    return res
  }

  async statisticsCustomers(date) {
    const res = await post('cms/customer/statistics', date)
    return res
  }

  async totalByDate() {
    const res = await get('cms/customer/totalbydate')
    return res
  }

  async updateReaskUser(data) {
    console.log(data)
    const res = await put('cms/customer/reask', data)
    return res
  }
}

export default new Customer()
