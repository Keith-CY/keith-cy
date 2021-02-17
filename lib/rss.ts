import { BLOG_URL, BLOG_NAME } from 'lib/constants'
import markdownToHtml from 'lib/markdownToHtml'
import { Post } from 'types'

export const generateRssItem = async (post: Post) => {
  const content = await markdownToHtml(post.content ?? '')

  return `
    <item>
      <guid>${BLOG_URL}/posts/${post.slug}</guid>
      <title>${post.title}</title>
      <description>${post.excerpt}</description>
      <link>${BLOG_URL}/posts/${post.slug}</link>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <content:encoded><![CDATA[$${content}]]></content:encoded>
    </item>
  `
}

export const generateRss = async (posts: Array<Post>) => {
  const itemList = await Promise.all(posts.map(generateRssItem))
  return `
    <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/" version="2.0">
      <channel>
        <title>${BLOG_NAME}</title>
        <link>${BLOG_URL}</link>
        <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
        <atom:link href="${BLOG_URL}" rel="self" type="application/rss+xml" />
        ${itemList.join('')}
      </channel>
    </rss>
  `
}
