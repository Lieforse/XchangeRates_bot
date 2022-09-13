module.exports = (command) => {
  const parsedString = command.replace('/s ', '').toUpperCase()
  const [from, to, time] = parsedString.split(' ')

  return {
    from,
    to,
    time,
  }
}
