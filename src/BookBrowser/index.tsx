import HTMLFlipBook from "react-pageflip";
import React from "react";
import "./BookBrowser.css";

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
  title: string,
  coverImage?: string,
  author?: string,
  publishDate?: Date,
  blurb?: string,
}

interface PageType {
  img?: string,
  pageContent: string,
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
  );
});

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
  );
});

function BookPage() {
  return (
    <div className="bookPage">
      <div className="header-section">
        <h1>Book Page</h1>

      </div>

      <div id="book">
        <HTMLFlipBook width={500} height={500} size="stretch" drawShadow={true} >
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
  );
}

export default BookPage;