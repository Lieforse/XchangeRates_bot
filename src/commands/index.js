const { start_command } = require('./modules/start_command')

const commands = (bot, { models }) => {
  bot.command('start', (ctx) => start_command(ctx, models))
}

module.exports = { commands }
