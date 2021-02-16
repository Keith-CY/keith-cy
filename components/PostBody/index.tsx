import styles from './styles.module.css'

const PostBody = ({ content }: { content: string }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className={styles.markdown} dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export default PostBody
