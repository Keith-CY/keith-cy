import Link from 'next/link'
import type { Navs } from 'components/Header'
import Head from 'components/Head'
import Layout from 'components/Layout'
import { getPostsBySerie, getSeries } from 'lib/api'
import { Post as PostType, Serie as SerieType } from 'types'
import markdownToHtml from 'lib/markdownToHtml'
import PostHeader from 'components/PostHeader'
import PostBody from 'components/PostBody'
export const getStaticPaths = () => {
  const series = getSeries()
  return {
    paths: series.map(s => ({ params: { serie: s.serie } })),
    fallback: false,
  }
}
export const getStaticProps = async ({ params }: { params: { serie: string } }) => {
  const series = getSeries()
  const serie = series.find(s => s.serie === params.serie)
  if (!serie) {
    throw new Error(`Serie ${serie} is not found`)
  }
  const posts = getPostsBySerie(serie.serie)
  const { contents: content } = await markdownToHtml(serie.content ?? '')
  return {
    props: {
      serie: {
        ...serie,
        content,
      },
      posts,
      navs: series.sort((s1, s2) => s1.index - s2.index).map(s => ({ label: s.title, link: `/series/${s.serie}` })),
    },
  }
}

const Post = ({ post }: { post: PostType }) => {
  return (
    <div className="flex flex-col">
      <Link href={`/posts/${post.slug}`}>
        <a>{post.title}</a>
      </Link>
      <span className="text-sm text-gray-700">{post.excerpt}</span>
    </div>
  )
}

const Serie = ({ serie, posts, navs }: { serie: SerieType; posts: Array<PostType>; navs: Navs }) => {
  return (
    <Layout navs={navs}>
      <Head title={serie.title} />
      <article className="mb-32">
        <PostHeader title={serie.title} coverImage={serie.coverImage} />
        <PostBody content={serie.content} />
        <section className="max-w-xl mx-auto">
          <ol className="list-decimal">
            {posts.map(post => (
              <li key={post.slug} className="mb-5">
                <Post post={post} />
              </li>
            ))}
          </ol>
        </section>
      </article>
    </Layout>
  )
}

export default Serie
