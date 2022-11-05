class BaseConnector {
  defaultError() {
    throw new Error(`Method not implemented for ${this.source.toUpperCase()} source `)
  }

  getAndNormalizeData() {
    this.defaultError()
  }

  fetchData() {
    this.defaultError()
  }

  normalizeData() {
    this.defaultError()
  }

  getCurrencyData() {
    this.defaultError()
  }
}

module.exports = { BaseConnector }

const { NbuConnector } = require('./nbu')
const { MonoConnector } = require('./mono')

module.exports = {
  NbuConnector,
  MonoConnector,
}
