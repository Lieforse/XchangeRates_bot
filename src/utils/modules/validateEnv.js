const { isEqual } = require('lodash')
const { requiredEnvValues } = require('../../../configs')

module.exports = (env) => {
  const requiredValues = requiredEnvValues.sort()
  const envValues = Object.keys(env).sort()

  return isEqual(envValues, requiredValues)
}
