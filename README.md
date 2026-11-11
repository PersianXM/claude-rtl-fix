# rtl-fix — Right-to-left fix for Claude Code

**English** · [فارسی](#فارسی)

When Claude answers in Persian, Arabic or Hebrew, any line that **starts with an English word** (`Claude`, `Python`, `API`, `Git`…) is rendered left-to-right, and the whole line gets scrambled. This happens because the renderer picks a paragraph's direction from its first strong character.

`rtl-fix` is a tiny Claude Code plugin that fixes this. Before each reply is stored and shown, it inserts an invisible Right-to-Left Mark (U+200F) at the start of every line that contains RTL letters, so the line stays right-to-left.

- Works after Markdown prefixes: lists (`-`, `1.`), headings (`##`), blockquotes (`>`), task boxes, and every table cell
- Leaves fenced code blocks and English-only lines untouched
- Runs locally: no network, no file access, no commands, no settings

## Install

At the prompt of a Claude Code terminal session:

```
/plugin install rtl-fix --marketplace PersianXM/claude-rtl-fix
```

From a shell:

```bash
claude plugin install rtl-fix --marketplace PersianXM/claude-rtl-fix
```

In the Claude desktop app: click **+** next to the prompt box → **Plugins** → **Add marketplace** with `PersianXM/claude-rtl-fix` → **Add plugin**.

Answer `y` to add the marketplace, then choose the **user** scope so it works in every session.

## Notes

- The mark is saved in the reply text itself, so text you copy out of a reply carries the invisible U+200F characters.
- It affects Claude Code (CLI and the desktop app's Code tab), not the claude.ai chat.
- Needs a Claude Code build that supports hooks modules (2.1.3xx or newer).

## License

MIT © Ali Rashedi

---

<div dir="rtl">

## فارسی

وقتی Claude به فارسی، عربی یا عبری جواب می‌دهد، هر خطی که **با یک کلمه‌ی انگلیسی شروع شود** چپ‌به‌راست نمایش داده می‌شود و ترتیب کل خط به هم می‌ریزد. دلیلش این است که جهت هر پاراگراف از اولین حرف آن تعیین می‌شود.

افزونه‌ی `rtl-fix` این مشکل را حل می‌کند. پیش از ذخیره و نمایش هر پاسخ، یک نویسه‌ی نامرئی RLM (U+200F) اول هر خطی می‌گذارد که حرف فارسی یا عربی دارد. به این ترتیب جهت خط راست‌به‌چپ می‌ماند.

- بعد از نشانه‌های مارک‌داون هم درست کار می‌کند: فهرست‌ها، تیترها، نقل‌قول‌ها و خانه‌های جدول
- به بلوک‌های کد و خط‌های تمام‌انگلیسی دست نمی‌زند
- کاملاً محلی اجرا می‌شود: به اینترنت وصل نمی‌شود، فایلی نمی‌خواند و دستوری اجرا نمی‌کند

### نصب

در ترمینال:

</div>

```bash
claude plugin install rtl-fix --marketplace PersianXM/claude-rtl-fix
```

<div dir="rtl">

در اپ دسکتاپ Claude: دکمه‌ی **+** کنار کادر پیام ← **Plugins** ← **Add marketplace** و وارد کردن `PersianXM/claude-rtl-fix` ← **Add plugin**.

برای اینکه در همه‌ی جلسه‌ها کار کند، گزینه‌ی **user** را انتخاب کنید.

</div>
