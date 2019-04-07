/* eslint-disable class-methods-use-this */
import {
  get, post, put, _delete,
} from '../utils/http'


class Depart {
  async addDepart(info) {
    const res = await post('cms/depart/', info)
    return res
  }

  async getDepart(id) {
    const res = await get(`cms/depart/${id}`)
    return res
  }

  async editDepart(id, info) {
    const res = await put(`cms/depart/${id}`, info)
    return res
  }

  async delectDepart(id) {
    const res = await _delete(`cms/depart/${id}`)
    return res
  }

  async getDeparts() {
    const res = await get('cms/depart/')
    return res
  }
}

export default new Depart()
