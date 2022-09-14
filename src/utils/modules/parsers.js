const convertCommand = (command) => {
  const parsedString = command.replace('/c ', '').toUpperCase()
  const [from, to, value] = parsedString.split(' ')

  return {
    from,
    to,
    amount: parseFloat(value.replace(',', '.')),
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
  const [from, to, time] = parsedString.split(' ')

  return {
    from,
    to,
    time,
  }
}

module.exports = { convertCommand, unsubscribeCommand, subscribeCommand }
