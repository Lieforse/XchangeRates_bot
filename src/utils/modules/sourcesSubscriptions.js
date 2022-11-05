const {
  exchangeRates: { availableSources },
  telegram: {
    emojis: { check },
  },
} = require('../../../configs')

const createReplyButtons = (subscribedSources) => {
  const replyButtons = Object.entries(availableSources).map(([key, name]) => {
    const isSubscribed = subscribedSources.find((item) => item === key)

    return {
      text: isSubscribed ? `${check} ${name}` : name,
      callback_data: createCallbackData(key),
    }
  })

  return replyButtons
}

const createCallbackData = (source) => `manage_source_${source}`

module.exports = {
  createReplyButtons,
  createCallbackData,
}
