export default {
  // Define Default Axios Params Serializer
  paramsSerializer (params) {
    const Qs = require('qs')
    return Qs.stringify(params, { arrayFormat: 'repeat' })
  }
}
