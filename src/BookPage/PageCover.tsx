import { forwardRef } from 'react'

interface CoverProps {
  coverImage: string
  title: string
  author: string
  fontFamily: string
}

const PageCover = forwardRef<HTMLDivElement, CoverProps>(({ coverImage, title, author, fontFamily }, ref) => {
  return (
    <div className="page page-cover" ref={ref}>
      <div className="page-content" style={{ fontFamily }}>
        <img src={coverImage}></img>
        <h1 style={{ fontFamily }}>{title}</h1>
        <h3>{author}</h3>
      </div>
    </div>
  )
})

export default PageCover
