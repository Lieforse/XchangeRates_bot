module.exports = (value, decimals = 2) => Number(`${Math.trunc(`${value}e${decimals}`)}e-${decimals}`).toFixed(decimals)
