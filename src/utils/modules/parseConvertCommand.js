module.exports = (command) => {
  const parsedString = command.replace('/c ', '').toUpperCase()
  const [from, to, value] = parsedString.split(' ')

  return {
    from,
    to,
    amount: parseFloat(value.replace(',', '.')),
  }
}
