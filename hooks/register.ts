import type { Register } from 'claude-code'
import { fixText } from './fix'

export const register: Register = (on) => {
  on('session.append', { door: 'response' }, ($, e, next) => {
    const content = e.message.content
    if (!Array.isArray(content)) return next(e)
    let changed = false
    const fixed = content.map((block: any) => {
      if (block && block.type === 'text' && typeof block.text === 'string') {
        const text = fixText(block.text)
        if (text !== block.text) {
          changed = true
          return { ...block, text }
        }
      }
      return block
    })
    if (!changed) return next(e)
    return next({ ...e, message: { ...e.message, content: fixed } as typeof e.message })
  }).catch(($, e, next) => next(e))
}
