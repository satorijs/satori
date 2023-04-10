import { defineProperty, segment, Universal } from '@satorijs/satori'
import { ParsedMail } from 'mailparser'
import { INode, parse, SyntaxKind } from 'html5parser'
import { MailBot } from './bot'

export async function adaptMessage(
  bot: MailBot,
  mail: ParsedMail,
  message: Universal.Message = {},
): Promise<Universal.Message> {
  message.subtype = 'private'
  message.messageId = mail.messageId
  message.userId = mail.from.value[0].address
  message.channelId = `private:${message.userId}`
  message.guildId= message.userId
  message.timestamp = mail.date.getTime()
  message.author = {
    userId: mail.from.value[0].address,
    nickname: mail.from.value[0].name,
  }
  let content = ''
  if (!mail.html) {
    content = segment.escape(mail.text)
  } else {
    function visit(nodes: INode[]) {
      for (const node of nodes) {
        if (node.type === SyntaxKind.Text) {
          content += segment.escape(decodeHE(node.value).trim() || ' ')
        } else {
          switch (node.name) {
            case 'a': {
              const href = node.attributeMap.href?.value.value || '#'
              content += `<a href="${href}">`
              visit(node.body)
              content += '</a>'
              break
            }
            case 'strong':
            case 'b': {
              content += '<b>'
              visit(node.body)
              content += '</b>'
              break
            }
            case 'br': {
              content += '\n'
              break
            }
            case 'code': {
              content += '<code>'
              visit(node.body)
              content += '</code>'
              break
            }
            case 's':
            case 'del': {
              content += '<s>'
              visit(node.body)
              content += '</s>'
              break
            }
            case 'i':
            case 'em': {
              content += '<i>'
              visit(node.body)
              content += '</i>'
              break
            }
            case 'p': {
              content += '<p>'
              visit(node.body)
              content += '</p>'
              break
            }
            case 'sub': {
              content += '<sub>'
              visit(node.body)
              content += '</sub>'
              break
            }
            case 'u': {
              content += '<u>'
              visit(node.body)
              content += '</u>'
              break
            }
            case 'img': {
              const src = node.attributeMap.src?.value.value
              const alt = node.attributeMap.src?.value.value
              if (!src) {
                if (alt) content += alt
                break
              }
              if (src.match(/^(data|https?):/)) {
                content += `<image url="${src}"/>`
                break
              }
              break
            }
            // ignore
            case 'head':
            case 'script':
            case 'style':
            case 'meta':
              break
            default:
              if (node.body) visit(node.body)
          }
        }
      }
    }
    visit(parse(mail.html, { setAttributeMap: true }))
  }
  content = content.trim()
  message.content = content
  message.elements ||= segment.parse(content)
  return message
}

export async function dispatchSession(bot: MailBot, mail: ParsedMail) {
  const session = bot.session()
  session.type = 'message'
  if (!await adaptMessage(bot, mail, session)) {
    return null
  }
  defineProperty(session, 'mail', mail)
  bot.dispatch(session)
}

// this is not a full list
const entities = {
  nbsp: ' ',
  cent: '¢',
  pound: '£',
  yen: '¥',
  euro: '€',
  copy: '©',
  reg: '®',
  lt: '<',
  gt: '>',
  quot: '"',
  amp: '&',
  apos: '\''
}

function decodeHE(text: string) {
  const regex = /&(([a-z0-9]+)|(#[0-9]{1,6})|(#x[0-9a-fA-F]{1,6}));/ig
  return text.replace(regex, (_1, _2, name: string, dec: string, hex: string) => {
    if (name) {
      if (name in entities) {
        return entities[name]
      } else {
        return text
      }
    } else if (dec) {
      return String.fromCharCode(+dec.substring(1))
    } else if (hex) {
      return String.fromCharCode(parseInt(hex.substring(2), 16))
    }
  })
}
