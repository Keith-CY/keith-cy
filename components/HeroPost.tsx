import Link from 'next/link'
import DateFormatter from 'components/DateFormatter'
import CoverImage from 'components/CoverImage'

type HeroPostProps = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  slug: string
}
const HeroPost = ({ title, coverImage, date, excerpt,  slug }: HeroPostProps) => (
  <section>
    <div className="mb-8 md:mb-16">
      <CoverImage title={title} src={coverImage} slug={slug} />
    </div>
    <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
      <div>
        <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
          <Link as={`/posts/${slug}`} href="/posts/[slug]">
            <a className="hover:underline">{title}</a>
          </Link>
        </h3>
        <div className="mb-4 md:mb-0 text-lg">
          <DateFormatter dateStr={date} />
        </div>
      </div>
      <div>
        <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      </div>
    </div>
  </section>
)

export default HeroPost
