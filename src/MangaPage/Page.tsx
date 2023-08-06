import { forwardRef } from 'react'

interface PageProps {
  image: string
  pageNumber: string
}

const Page = forwardRef<HTMLDivElement, PageProps>(({ image, pageNumber }, ref) => {
  return (
    <div className="manga-page" ref={ref} data-density="hard">
      <div className="manga-page-content">
        <img src={image}></img>
        <div className="manga-page-corner">
          <h5>{pageNumber}</h5>
        </div>
      </div>
    </div>
  )
})

export default Page
