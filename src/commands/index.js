const { start_command } = require('./modules/start_command')

const commands = ({ models }, bot) => {
  bot.command('start', (ctx) => start_command(ctx, models))
}

module.exports = { commands }
