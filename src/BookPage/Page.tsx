import { forwardRef } from 'react'

interface PageProps {
  image: string
  content: string
  pageNumber: string
  fontFamily: string
}

const Page = forwardRef<HTMLDivElement, PageProps>(({ image, content, pageNumber, fontFamily }, ref) => {
  return (
    <div className="page" ref={ref} data-density="hard">
      <div className="page-content" style={{ fontFamily }}>
        <img src={image}></img>
        <h5>{content}</h5>

        <div className="page-corner">
          <h5>{pageNumber}</h5>
        </div>
      </div>
    </div>
  )
})

export default Page
