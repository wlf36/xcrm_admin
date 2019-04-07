/* eslint-disable class-methods-use-this */
import {
  get,
  post,
  put,
  _delete,
} from '../utils/http'


class Source {
  async addSource(info) {
    const res = await post('cms/source/', info)
    return res
  }

  async getSource(id) {
    const res = await get(`cms/source/${id}`)
    return res
  }

  async editSource(id, info) {
    const res = await put(`cms/source/${id}`, info)
    return res
  }

  async delectSource(id) {
    const res = await _delete(`cms/source/${id}`)
    return res
  }

  async getSources() {
    const res = await get('cms/source/')
    return res
  }
}

export default new Source()