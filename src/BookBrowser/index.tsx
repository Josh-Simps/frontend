import React from "react";
import "./BookBrowser.css";

export interface BrowserProp { 
  title: String,
  blurb: String
}

export interface BookProp {
  title: String,
  coverImage?: String,
  author: String
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
        <img src={props.coverImage}></img>
        <h4>{props.author}</h4>
      </div>
    </div>
  );
});


const BrowserMain = React.forwardRef<HTMLDivElement, BookProp>((props, ref) => {
  return (
    <div className="bookBrowser">
      <BrowserHeader title={"Welcome Back!"} blurb={"What would you like to read today?"} bookList={[]}>
      </BrowserHeader>
      <div className="shelf">
        <Book title={"book title"} author={"book author"}></Book>
        <Book title={"book title"} author={"book author"}></Book>
        <Book title={"book title"} author={"book author"}></Book>
        <Book title={"book title"} author={"book author"}></Book>
        <Book title={"book title"} author={"book author"}></Book>
        <Book title={"book title"} author={"book author"}></Book>
        <Book title={"book title"} author={"book author"}></Book>
        <Book title={"book title"} author={"book author"}></Book>
        <Book title={"book title"} author={"book author"}></Book>
        <Book title={"book title"} author={"book author"}></Book>
        <Book title={"book title"} author={"book author"}></Book>
        <Book title={"book title"} author={"book author"}></Book>
      </div>
    </div>
  );
});

export default BrowserMain;