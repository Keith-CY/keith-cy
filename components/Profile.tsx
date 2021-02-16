import Link from 'next/link'

const profile = {
  name: 'Keith CY',
  desc: 'Newbie in Society',
  networks: [
    { type: 'github', link: 'https://github.com/keith-cy' },
    { type: 'email', link: 'mailto:keithwhisper@gmail.com' },
    { type: 'linkedin', link: 'https://www.linkedin.com/in/chen-yu-644b61ba' },
  ],
}
const Profile = () => (
  <div>
    <img
      className="rounded-full p-5"
      src="https://avatars.githubusercontent.com/u/7271329?s=460&u=faa0b88984bc6338cf0c33ba049c18933823a111&v=4"
      alt="avatar"
    />
    <div className="text-center font-semibold">{profile.name}</div>
    <div className="text-center">{profile.desc}</div>
    <div className="text-center">
      {profile.networks.map(n => (
        <Link key={n.type} href={n.link}>
          <a title={n.link} className="no-underline mx-1 cursor-pointer">
            <i key={n.type} className={`iconfont icon-${n.type}`} />
          </a>
        </Link>
      ))}
    </div>
  </div>
)

export default Profile
