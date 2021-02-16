type SerieTheme = 'strategy' | 'methodology' | 'ark-invest' | 'blockchain' | 'slides'

export type Post = {
  slug: string
  title: string
  serie: SerieTheme
  date: string
  coverImage: string
  excerpt: string
  ogImage: {
    url: string
  }
  content: string
}


export type Serie = {
  title: string
  index: number
  serie: SerieTheme
  coverImage: string
  excerpt: string
  ogImage: {
    url: string
  }
  content: string
}

