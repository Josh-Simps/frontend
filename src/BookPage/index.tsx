import HTMLFlipBook from "react-pageflip";
import React from "react";
import "./BookPage.css";

interface CoverType {
  title: string,
  img?: string
}

const PageCover = React.forwardRef<HTMLDivElement, CoverType>((props, ref) => {
  return (
    <div className="page page-cover" ref={ref} data-density="hard">
      <div className="page-content">
        <img src={props.img}></img>
        <h1>{props.title}</h1>
        <h4></h4>
      </div>
    </div>
  );
});

function BookPage() {
  return (
    <div>
      <h1>Book Page</h1>

      <div id="book">
        <HTMLFlipBook width={300} height={500} size="stretch" minWidth={100}>
          <PageCover title="Hello"></PageCover>
          <div className="demoPage">Page 1</div>
          <div className="demoPage">Page 2</div>
          <div className="demoPage">Page 3</div>
          <div className="demoPage">Page 4</div>
        </HTMLFlipBook>
      </div>
    </div>
  );
}

export default BookPage;