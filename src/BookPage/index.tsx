import HTMLFlipBook from "react-pageflip";
import React from "react";
import "./BookPage.css";
import image from "../assets/image.json";
import image2 from "../assets/image2.json"

const content2 = "It was a bright cold day in April, and the clocks were striking thirteen. Winston Smith, his chin nuzzled into his breast in an effort to escape the vile wind, slipped quickly through the glass doors of Victory Mansions, though not quickly enough to prevent a swirl of gritty dust from entering along with him. The hallway smelt of boiled cabbage and old rag mats. At one end of it a coloured poster, too large for indoor display, had been tacked to the wall. It depicted simply an enormous face, more than a metre wide: the face of a man of about forty-five, with a heavy black moustache and ruggedly handsome features. Winston made for the stairs. It was no use trying the lift. Even at the best of times it was seldom working, and at present the electric current was cut off during daylight hours. It was part of the economy drive in preparation for Hate Week."

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
  img: string,
  pageContent: string,
  pageNumber: string
}

const PageCover = React.forwardRef<HTMLDivElement, CoverType>((props, ref) => {
  return (
    <div className="page page-cover" ref={ref}>
      <div className="page-content">
        <img src={props.coverImage}></img>
        <h1>{props.title}</h1>
        <h3>{props.author}</h3>
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

        <div className="page-corner">
          <h5>{props.pageNumber}</h5>
        </div>
      </div>
    </div>
  )
})

function BookPage(props) {
  return (
    <div className="bookPage">
      <div className="header-section">

        <h1>Title {props.title}</h1>
        <h1>Switch Bar</h1>

      </div>

      <div id="book">
        <HTMLFlipBook width={500} height={480} size="stretch" drawShadow={true} >
          <PageCover coverImage={image.value} author="George Orwell" title="1984"></PageCover>
          <Page img={image2.value} pageContent={content2} pageNumber="1"></Page>
          <Page img={image2.value} pageContent={content2} pageNumber="1"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content2} pageNumber="1"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content2} pageNumber="1"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content2} pageNumber="1"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content2} pageNumber="1"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content2} pageNumber="1"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content2} pageNumber="1"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content2} pageNumber="1"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content2} pageNumber="1"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content2} pageNumber="1"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content2} pageNumber="1"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content2} pageNumber="1"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content2} pageNumber="1"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content2} pageNumber="1"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content2} pageNumber="1"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content2} pageNumber="1"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content2} pageNumber="1"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content2} pageNumber="1"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content2} pageNumber="1"></Page>
        </HTMLFlipBook>
      </div>
    </div>
  )
}

export default BookPage
