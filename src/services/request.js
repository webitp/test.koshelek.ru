import axios from 'axios'

import config from '../../vue.config'

export default axios.create({
  baseURL: config.axios.baseURL
})