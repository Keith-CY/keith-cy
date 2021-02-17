import Head from 'next/head'
import { BLOG_NAME } from 'lib/constants'
const CustomHead = ({ title }: { title?: string }) => (
  <Head>
    <title>{title ? `${title} | ${BLOG_NAME}'s Blog` : `${BLOG_NAME}'s Blog`}</title>
  </Head>
)

export default CustomHead
