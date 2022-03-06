const { start_command, convert_command } = require('./modules')

const commands = (db, bot) => {
  bot.command('start', (ctx) => start_command(ctx, db))
  bot.command('c', (ctx) => convert_command(bot, db, ctx))
}

module.exports = { commands }
