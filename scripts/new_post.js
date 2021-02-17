const fs = require('fs')
const path = require('path')

const title = process.argv[2]

if (!title) {
  console.error('Please enter a title')
  process.exit(0)
}

const postDir = path.join(__dirname, '..', '_posts')

const allPost = fs.readdirSync(postDir)

if (allPost.includes(`${title}.md`)) {
  console.warn(`${title}.md exists`)
  process.exit(0)
}

let tpl = fs.readFileSync(path.join(__dirname, 'tpl.md'), 'utf-8')

const now = new Date().toISOString()
tpl = tpl.replace(`date: ''`, `date: '${now}'`)
tpl = tpl.replace(`title: ''`, `title: '${title}'`)
fs.writeFileSync(path.join(postDir, `${title.toLowerCase()}.md`), tpl)
