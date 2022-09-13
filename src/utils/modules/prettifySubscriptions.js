module.exports = (subscriptions) => {
  let message = ''
  subscriptions.forEach(({ currency, time }) => {
    message += `From: ${currency}\nTo: UAH\nTime: ${time}\n==============\n\n`
  })

  return message
}
