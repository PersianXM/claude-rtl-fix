// Persian / Arabic script letters.
const RTL = /[֐-ࣿיִ-﷿ﹰ-﻿]/
const RLM = '‏'

// Markdown prefix a line may start with: indentation, blockquote marks,
// heading hashes, list bullets / numbers, task-list boxes.
const PREFIX = /^(\s*(?:>\s*)*(?:#{1,6}\s+)?(?:(?:[-*+]|\d+[.)])\s+)?(?:\[[ xX]\]\s+)?)/

function fixLine(line: string): string {
  if (!RTL.test(line)) return line
  // Table row: put an RLM at the start of every cell.
  if (/^\s*\|.*\|\s*$/.test(line)) {
    return line.replace(/\|(\s*)(?!‏)(?=[^|\s-:])/g, `|$1${RLM}`)
  }
  const m = PREFIX.exec(line)
  const head = m ? m[1] : ''
  const rest = line.slice(head.length)
  if (rest.startsWith(RLM) || rest.length === 0) return line
  return head + RLM + rest
}

/** Adds an RLM to each line holding RTL letters, outside fenced code and inline-only lines. */
export function fixText(text: string): string {
  if (!RTL.test(text)) return text
  let inFence = false
  return text
    .split('\n')
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) {
        inFence = !inFence
        return line
      }
      return inFence ? line : fixLine(line)
    })
    .join('\n')
}
