import Head from 'components/Head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import PostBody from 'components/PostBody'
import PostHeader from 'components/PostHeader'
import Layout from 'components/Layout'
import type { Navs } from 'components/Header'
import { getAllPosts, getPostBySlug, getSeries } from 'lib/api'
import markdownToHtml from 'lib/markdownToHtml'
import { Post as PostType } from 'types'

export const getStaticPaths = () => {
  const posts = getAllPosts(['slug'])
  return {
    paths: posts.map((post: any) => ({ params: { slug: post.slug } })),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }: { params: { slug: string } }) => {
  const post = getPostBySlug(params.slug, ['title', 'date', 'slug', 'content', 'ogImage', 'coverImage'])
  const { contents: content } = await markdownToHtml(post.content || '')

  const series = getSeries()
  return {
    props: {
      post: {
        ...post,
        content,
      },
      navs: series
        .sort((s1, s2) => s1.index - s2.index)
        .map(serie => ({ label: serie.title, link: `/series/${serie.serie}` })),
    },
  }
}

const Post = ({ post, navs }: { post: PostType; navs: Navs }) => {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout navs={navs}>
      <Head title={post.title} />
      <article className="mb-32">
        <PostHeader title={post.title} coverImage={post.coverImage} date={post.date} />
        <PostBody content={post.content} />
      </article>
    </Layout>
  )
}

export default Post
