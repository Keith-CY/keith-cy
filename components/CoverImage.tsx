import Link from 'next/link'

const CoverImage = ({ title, src, slug = '' }: Partial<Record<'title' | 'src' | 'slug', string>>) => {
  const image = (
    <img
      loading="lazy"
      src={src}
      alt={`Cover Image for ${title}`}
      className={slug ? 'shadow-small hover:shadow-medium transition-shadow duration-200' : 'shadow-small'}
    />
  )

  return (
    <div className="sm:mx-0 flex justify-center">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

export default CoverImage
