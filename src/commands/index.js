const { convertCommand } = require('./modules/convert_command')
const { start_command } = require('./modules/start_command')

const commands = (db, bot) => {
  bot.command('start', (ctx) => start_command(ctx, db))
  bot.command('convert', (ctx) => convertCommand(bot, db, ctx))
}

module.exports = { commands }
