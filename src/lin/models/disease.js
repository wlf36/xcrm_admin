/* eslint-disable class-methods-use-this */
import {
  get,
  post,
  put,
  _delete,
} from '../utils/http'


class Disease {
  async addDisease(info) {
    const res = await post('cms/disease/', info)
    return res
  }

  async getDisease(id) {
    const res = await get(`cms/disease/${id}`)
    return res
  }

  async editDisease(id, info) {
    const res = await put(`cms/disease/${id}`, info)
    return res
  }

  async delectDisease(id) {
    const res = await _delete(`cms/disease/${id}`)
    return res
  }

  async getDiseases() {
    const res = await get('cms/disease/')
    return res
  }
}

export default new Disease()
