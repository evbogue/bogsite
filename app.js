import { h } from 'https://esm.sh/gh/evbogue/bogbookv4@02f96a104e/lib/h.js'
import {embed} from 'https://esm.sh/gh/evbogue/bog-embed@e413bc1f06/mod.js'
const el = h('div')
document.body.insertBefore(el, document.body.firstChild)
embed('EvEscFEThxeGbGnbMeDL0kHVhTZ/sJz1hN1e8qjZo8c=', el)

const input = h('input', {placeholder: 'Your phone or email please'})
const textarea = h('textarea', {placeholder: 'Send a message to my phone'})
const button = h('button', { onclick: () => {
  if (textarea.value && input.value) {
    fetch('https://ntfy.sh/evbogue', {
      method: 'POST',
      body: input.value + ' | ' + textarea.value
    })
    const got = document.getElementById('phonebuzz')

    got.replaceWith(h('div', ['Sent! I received a message: "' + input.value + ' | ' + textarea.value + '"']))
  } else {alert('Fill out all fields plz')}
}}, ['Send urgent message'])
document.body.appendChild(h('div', {id: 'phonebuzz'}, [input, textarea, button]))

