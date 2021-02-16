import Head from 'components/Head'
import MoreStories from 'components/MoreStories'
import HeroPost from 'components/HeroPost'
import Layout from 'components/Layout'
import { getAllPosts, getSeries } from 'lib/api'
import {Post } from 'types'
import { Navs } from 'components/Header'

const Index = ({ allPosts, navs }: { allPosts: Array<Post>, navs: Navs}) => {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)

  return (
    <Layout navs={navs}>
      <Head />
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts.length && <MoreStories posts={morePosts} />}
    </Layout>
  )
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts(['title', 'date', 'slug', 'coverImage', 'except'])
  const series = getSeries()
  return {
    props: { allPosts, navs: series.sort((s1, s2) => s1.index - s2.index).map(serie => ({label: serie.title, link: `/series/${serie.serie}`}))},
  }
}
export default Index
