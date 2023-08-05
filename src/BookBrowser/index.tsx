import React from "react";
import "./BookBrowser.css";
import { useBookContext } from "../contexts/BookContext";

export interface BrowserProp { 
  title: string,
  blurb: string
}

export interface BookProp {
  title: string,
  coverImage?: string,
  author: string
}

const BrowserHeader = React.forwardRef<HTMLDivElement, BrowserProp>((props, ref) => {
  return (
    <div ref={ref}>
      <div>
        <h1>{props.title}</h1>
        <h4>{props.blurb}</h4>
      </div>
    </div>
  );
});


const Book = React.forwardRef<HTMLDivElement, BookProp>((props, ref) => {
  return (
    <div className="book" ref={ref} data-density="hard">
      <div>
        <h1>{props.title}</h1>
        <img src={props.coverImage}></img>/
        <h4>{props.author}</h4>
      </div>
    </div>
  );
});


const BrowserMain = React.forwardRef<HTMLDivElement, BookProp>((props, ref) => {
  const bookMetadata = useBookContext();
  return (
    <div className="bookBrowser">
      <BrowserHeader title={"Welcome Back!"} blurb={"What would you like to read today?"}/>
      <div className="shelf">
        {bookMetadata.bookMetadata.map(metadata => <Book key={metadata._id} title={metadata.title} coverImage={metadata.coverImage} author={metadata.author} />)}
      </div>
    </div>
  );
});

export default BrowserMain;