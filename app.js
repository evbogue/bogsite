import { h } from './lib/h.js'
import { human } from './lib/human.js'
import { open } from './sbog.js'

const renderer = new marked.Renderer()

renderer.link = function (href, title, text) {
    if (href.length == 44 && !href.startsWith('http')) {
    href  = 'https://bogbook.com/#' + href
    return marked.Renderer.prototype.link.call(this, href, title, text);
  } else {
    return marked.Renderer.prototype.link.call(this, href, title, text);
  }
}

marked.setOptions({
  renderer: renderer
})

const pubkey = 'EVs6toXH1DdpDpHEA5qm1eXS6xtg7+dkNH2t0GjoUH0='

const div = h('a', {href: 'https://bogbook.com/#' + pubkey}, [pubkey])

const container = document.getElementById('container')

container.appendChild(div)

const ws = new WebSocket('wss://bogbook.com')

ws.onopen = async () => {
  ws.send(pubkey)
}

ws.onmessage = async (m) => {
  const obj = JSON.parse(m.data)
  console.log(obj)
  const opened = await open(obj.payload)
  if (opened && obj.payload.substring(0, 44) === pubkey && !document.getElementById('message')) {
    div.textContent = obj.name
    const messageDiv = h('article', {id: 'message', innerHTML: marked(obj.blob)})
    container.insertBefore(h('a', {style: 'float: right', href: 'https://bogbook.com/#' + opened.hash}, [human(new Date(opened.timestamp))]), div)
    container.appendChild(messageDiv)
    container.after(h('div', ['More on ↳ ', h('a', {href: 'https://bogbook.com/#' + pubkey}, ['Bogbook'])]))
  }
}
