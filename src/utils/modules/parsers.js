const convertCommand = (command) => {
  const parsedString = command.replace('/c ', '').toUpperCase()
  const [base, quote, value, source] = parsedString.split(' ')

  return {
    base,
    quote,
    amount: parseFloat(value.replace(',', '.')),
    source: source.toLowerCase() || 'mono',
  }
}

const unsubscribeCommand = (command) => {
  const id = parseInt(command.replace('/unsub ', ''), 10)

  return {
    id,
  }
}

const subscribeCommand = (command) => {
  const parsedString = command.replace('/s ', '').toUpperCase()
  const [base, quote, time] = parsedString.split(' ')

  return {
    base,
    quote,
    time,
  }
}

module.exports = { convertCommand, unsubscribeCommand, subscribeCommand }
