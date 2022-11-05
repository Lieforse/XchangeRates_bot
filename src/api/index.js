const { NbuConnector, MonoConnector } = require('./connectors')

const connectorsHashmap = {
  nbu: new NbuConnector(),
  mono: new MonoConnector(),
}

module.exports = {
  connectorsHashmap,
}
