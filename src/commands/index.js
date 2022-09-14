const { start_command, convert_command, subscribe_command, unsubscribe_command } = require('./modules')

const commands = (db, bot) => {
  bot.command('start', (ctx) => start_command(ctx, db))
  bot.command('c', (ctx) => convert_command(bot, db, ctx))
  bot.command('s', (ctx) => subscribe_command(bot, db, ctx))
  bot.command('unsub', (ctx) => unsubscribe_command(bot, db, ctx))
}

module.exports = { commands }
