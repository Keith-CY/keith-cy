import DateFormatter from 'components/DateFormatter'
import CoverImage from 'components/CoverImage'
import PostTitle from 'components/PostTitle'

type Props = {
  title: string
  coverImage: string
  date?: string
}

const PostHeader = ({ title, coverImage, date }: Props) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 text-lg">{date ? <DateFormatter dateStr={date} /> : null}</div>
      </div>
    </>
  )
}

export default PostHeader
