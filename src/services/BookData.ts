export interface BookMetadata {
  _id: string
  title: string
  image: string
  author: string
  publishDate: string
}

export interface BookData extends BookMetadata {
  blurb: string
  content: Content
}

export interface Content {
  english: string[]
  '15': string[]
  images: string[]
}

export type BookType = {
  book: BookData[]
}
