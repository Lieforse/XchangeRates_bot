const { connectorsHashmap } = require('../../api')

class AbstractExchangeRatesActualizer {
  constructor() {
    this.connectorsHashmap = connectorsHashmap
  }

  defaultError() {
    throw new Error(`Method not implemented for ${this.source.toUpperCase()} source `)
  }

  actualize() {
    this.defaultError()
  }
}

module.exports = AbstractExchangeRatesActualizer
