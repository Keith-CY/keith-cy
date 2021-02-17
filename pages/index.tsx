import fs from 'fs'
import {join} from 'path'
import Link from 'next/link'
import Head from 'components/Head'
import Layout from 'components/Layout'
import { getAllPosts, getSeries } from 'lib/api'
import { Post } from 'types'
import { Navs } from 'components/Header'
import Profile from 'components/Profile'
import DateFormatter from 'components/DateFormatter'
import { generateRss } from 'lib/rss'

const HERO_POST_INDEX = 0

const Index = ({ postList, navs }: { postList: Array<Post>; navs: Navs }) => {
  return (
    <Layout navs={navs}>
      <Head />
      <div className="grid grid-cols-2 lg:grid-cols-5 lg:divide-x lg:divide-gray-200">
        <section className="hidden lg:block">
          <Profile />
        </section>
        {postList.map((post, idx) => (
          <section
            className={idx === HERO_POST_INDEX ? 'flex flex-col p-5 row-span-2 col-span-2' : 'flex flex-col p-5 hover:shadow-xl transition-shadow duration-500'}
          >
            <img src={post.coverImage} alt={post.title} />
            <Link key={post.slug} href={`posts/${post.slug}`}>
              <h2 className="font-bold text-xl tracking-wide mt-5 mb-5 cursor-pointer"> {post.title} </h2>
            </Link>
            {idx === HERO_POST_INDEX ? (
              <span className="text-base tracking-tight text-gray-700">{post.excerpt}</span>
            ) : null}
            <DateFormatter dateStr={post.date} />
          </section>
        ))}
      </div>
    </Layout>
  )
}

const buildRssFeed = async (allPosts: Array<Post>) => {
  const rss = await generateRss(allPosts)
  fs.writeFileSync(join(process.cwd(), 'public', 'rss.xml'), rss)
}
export const getStaticProps = async () => {
  const allPosts = getAllPosts(['title', 'date', 'slug', 'coverImage', 'excerpt'])

  await buildRssFeed(allPosts)

  const postList = allPosts.slice(0, 6)
  const series = getSeries()
  return {
    props: {
      postList,
      navs: series
        .sort((s1, s2) => s1.index - s2.index)
        .map(serie => ({ label: serie.title, link: `/series/${serie.serie}` })),
    },
  }
}

export default Index
