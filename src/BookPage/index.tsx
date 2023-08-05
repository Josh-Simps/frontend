import HTMLFlipBook from 'react-pageflip'
import React from 'react'
import './BookPage.css'

const content =
  ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse rhoncus iaculis vehicula. Mauris mollis orci ut ullamcorper vulputate. Integer sagittis sed mauris non posuere. Nunc consequat, nisi quis iaculis interdum, erat dui viverra dolor, sit amet consectetur orci lectus in est. Fusce id mi ut lorem maximus facilisis eu laoreet tortor. Donec est leo, porttitor a dapibus a, consequat ac tortor. Quisque et massa pulvinar, semper ante id, consequat dui. Morbi at feugiat lorem, sed facilisis nisl. Donec blandit quam dui, quis eleifend dolor posuere sed. Nulla rutrum id magna sit amet lacinia. Cras quis vestibulum ex. Integer ornare massa nibh, sit amet posuere purus sagittis consectetur. Mauris in maximus ligula. Curabitur risus mauris, rutrum vitae orci euismod, hendrerit elementum metus. Cras vehicula, nibh et cursus vestibulum, sapien diam faucibus tortor, tristique dictum erat lorem sit amet nisi. Sed et tincidunt justo, non sollicitudin lorem. Vivamus ut enim faucibus, faucibus quam id, feugiat sem. Sed a sagittis leo. Pellentesque eu semper odio. Maecenas scelerisque laoreet libero, elementum tincidunt elit scelerisque eget. Vestibulum iaculis, ante nec sollicitudin volutpat, augue sem vestibulum lectus, ac dictum nibh ipsum nec ligula. Etiam in urna id erat faucibus pulvinar eget id mi. Donec ac sem nisl. Donec varius massa eu pharetra pretium. Sed lorem orci, tristique id convallis at, efficitur pharetra elit. Suspendisse sagittis nunc eget ullamcorper dapibus. In tincidunt mollis varius. Mauris elementum gravida mi, et rutrum libero rhoncus eget. Duis vel velit dui. Aenean maximus tincidunt enim. Curabitur faucibus lorem vitae ligula tempus, vitae gravida ipsum maximus. Ut efficitur orci vitae purus tincidunt tincidunt. Cras non quam ut nibh rhoncus mollis.'

export interface BookType {
  title: string
  coverImage: string
  author: string
  publishDate: Date
  blurb: string
  originalContent: string
  translatedContent: Record<string, string>
}

interface CoverType {
  title: string
  coverImage?: string
  author?: string
  publishDate?: Date
  blurb?: string
}

interface PageType {
  img?: string
  pageContent: string
  pageNumber: string
}

const PageCover = React.forwardRef<HTMLDivElement, CoverType>((props, ref) => {
  return (
    <div className="page page-cover" ref={ref} data-density="hard">
      <div className="page-content">
        <img src={props.coverImage}></img>
        <h1>{props.title}</h1>
        <h4>Author: {props.author}</h4>
        <h4>{props.blurb}</h4>
      </div>
    </div>
  )
})

const Page = React.forwardRef<HTMLDivElement, PageType>((props, ref) => {
  return (
    <div className="page" ref={ref} data-density="hard">
      <div className="page-content">
        <img src={props.img}></img>
        <h5>{props.pageContent}</h5>

        <div className="pageCorner">
          <h2>Page {props.pageNumber}</h2>
        </div>
      </div>
    </div>
  )
})

function BookPage() {
  return (
    <div className="bookPage">
      <div className="header-section">
        <h1>Book Page</h1>
      </div>

      <div id="book">
        <HTMLFlipBook width={500} height={500} size="stretch" drawShadow={true}>
          <PageCover title="Hello"></PageCover>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content} pageNumber="1"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content} pageNumber="1"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content} pageNumber="1"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content} pageNumber="1"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content} pageNumber="1"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content} pageNumber="1"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content} pageNumber="1"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content} pageNumber="1"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content} pageNumber="1"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content} pageNumber="1"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content} pageNumber="1"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content} pageNumber="1"></Page>
        </HTMLFlipBook>
      </div>
    </div>
  )
}

export default BookPage
