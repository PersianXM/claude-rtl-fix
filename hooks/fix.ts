// Hebrew, Arabic and Persian letters (U+0590-U+08FF, U+FB1D-U+FDFF, U+FE70-U+FEFE),
// built from code points so the source holds no invisible or RTL characters.
const ch = (n: number) => String.fromCharCode(n)
const RTL = new RegExp(`[${ch(0x590)}-${ch(0x8ff)}${ch(0xfb1d)}-${ch(0xfdff)}${ch(0xfe70)}-${ch(0xfefe)}]`)
const RLM = ch(0x200f) // Right-to-Left Mark

// Markdown prefix a line may start with: indentation, blockquote marks,
// heading hashes, list bullets / numbers, task-list boxes.
const PREFIX = /^(\s*(?:>\s*)*(?:#{1,6}\s+)?(?:(?:[-*+]|\d+[.)])\s+)?(?:\[[ xX]\]\s+)?)/

function fixLine(line: string): string {
  if (!RTL.test(line)) return line
  // Table row: put an RLM at the start of every cell.
  if (/^\s*\|.*\|\s*$/.test(line)) {
    return line.replace(new RegExp(`\\|(\\s*)(?!${RLM})(?=[^|\\s\\-:])`, 'g'), `|$1${RLM}`)
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
