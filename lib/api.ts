import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { Post, Serie } from 'types'

const postsDirectory = join(process.cwd(), '_posts')

export const getPostBySlug = (slug: string, fields: Array<string>): Post => {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items: Record<string, string> = {}

  fields.forEach(field => {
    switch (field) {
      case 'slug': {
        items.slug = realSlug
        break
      }
      case 'content': {
        items.content = content
        break
      }
      default:
        {
          // ignore
        }
        if (data[field]) {
          items[field] = data[field]
        }
    }
  })
  return items as any
}

export const getAllPosts = (fields: Array<string> = []): Array<Post> => {
  const slugs = fs.readdirSync(postsDirectory)
  const posts = slugs.map(slug => getPostBySlug(slug, fields)).sort((p1: any, p2: any) => (p1.date > p2.date ? -1 : 1))
  return posts
}

export const getPostsBySerie = (serie: string): Array<Post> => {
  return getAllPosts(['title', 'slug', 'serie', 'excerpt']).filter(post => post.serie === serie)
}

const seriesDirectory = join(process.cwd(), '_series')

export const getSeries = (): Array<Serie> => {
  const series = fs.readdirSync(seriesDirectory)
  return series.map(serie => {
    const fileContent = fs.readFileSync(join(seriesDirectory, serie), 'utf8')
    const { data, content } = matter(fileContent)

    return {
      ...data,
      serie: serie.replace(/\.md$/, ''),
      content
    } as any
  })
}
