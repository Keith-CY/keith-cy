import Meta from 'components/Meta'
import Header, {Navs} from 'components/Header'

const Layout = ({ children, navs }: { children: React.ReactNode, navs: Navs }) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen overflow-auto">
        <Header navs={navs}/>
        <main className="container mx-auto px-5">{children}</main>
      </div>
    </>
  )
}

export default Layout
