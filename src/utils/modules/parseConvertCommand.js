module.exports = (command) => {
  const parsedString = command.replace('/convert ', '').replace('to ', '').toUpperCase()
  const [from, to, value] = parsedString.split(' ')

  return {
    from,
    to,
    value,
  }
}
