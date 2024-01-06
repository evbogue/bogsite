import nacl from './lib/nacl-fast-es.js'
import { decode, encode } from './lib/base64.js'

export async function open (msg) {
  const opened = new TextDecoder().decode(nacl.sign.open(decode(msg.substring(44)), decode(msg.substring(0, 44))))

  const obj = {
    timestamp: parseInt(opened.substring(0, 13)),
    author: opened.substring(13, 57),
    hash : opened.substring(145),
    previous: opened.substring(101, 145),
    data: opened.substring(57, 101),
    raw: msg
  }

  return obj
}

