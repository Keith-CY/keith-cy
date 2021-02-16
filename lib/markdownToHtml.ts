import remark from 'remark'
import html from 'remark-html'

const markdownToHtml = (markdown: string) => remark().use(html).process(markdown)
export default markdownToHtml
