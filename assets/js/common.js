export default {
  // Define Default Axios Params Serializer
  paramsSerializer (params) {
    const Qs = require('qs')
    return Qs.stringify(params, { arrayFormat: 'repeat' })
  },

  removeDuplicatesFromArray (arr) {
    if(arr && arr.length > 0) {
      const uniqueKeys = Object.keys(arr[0])
      return arr.filter((v,i,a)=>a.findIndex(v2=>uniqueKeys.every(k=>v2[k] ===v[k]))===i)
    }
  }
}
