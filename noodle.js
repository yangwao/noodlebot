// https://core.telegram.org/bots
// http://telegraf.js.org/#/?id=context
const CWD = process.cwd()
const config = require(CWD + '/config.json')
const env = require(CWD + '/env.json')
const pino = require('pino')
global.l = pino(config.pino)
// const uuid = require('uuid')
// const mdb = require('./mongodb.js')

const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const session = require('telegraf/session')

const bot = new Telegraf(env.token)

// bot.use(log())
bot.use(Telegraf.log())
bot.use(session())
l.info(`${config.bot.noodlebot.username} loaded at ${Date.now()} ${new Date()}`)
bot.start((ctx) => {
  l.info(`${Date.now()} started: ${ctx.from.id}`)
  return ctx.reply(`Hello, I'm the ${config.bot.noodlebot.username}! Try to write /help`)
})

bot.catch((err) => {
  l.error('Ooops', err)
})

bot.command('help', async (ctx) => {
  if (ctx.chat.type === 'private') {
    return ctx.reply(`
~ Hello ~`)
  }
})

bot.hears('Hello', async (ctx) => {
  if (ctx.from) {
    return ctx.reply(`Hello ${ctx.from.first_name}`)
  }
})

bot.startPolling()
