import request from './request'

export default {
  list: async () => {
    return await request.get('items')
  }
}