module.exports = (subscriptions) => {
  let message = ''
  subscriptions.forEach(({ id, currency, time }) => {
    message += `Id: ${id}\nFrom: ${currency}\nTo: UAH\nTime: ${time}\n==============\n\n`
  })

  return message
}
