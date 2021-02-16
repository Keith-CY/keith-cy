import Link from 'next/link'
import { BLOG_NAME } from 'lib/constants'
export type Navs = Array<Record<'label' | 'link', string>>

const Header = ({navs = []}: {navs: Navs}) => {
  return (
    <div className="flex font-bold content-between mb-20 mx-20 mt-8">
      <h2 className="text-2xl md:text-4xl md:tracking-tighter flex-grow">
        <Link href="/">
          <a>{BLOG_NAME}</a>
        </Link>
        .
      </h2>
      <div className="flex text-xl items-center gap-5">
        {navs.map(nav => (
          <Link href={nav.link} key={nav.label}>
            <a className="no-underline hover:underline">{nav.label}</a>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Header
