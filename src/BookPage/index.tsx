import HTMLFlipBook from "react-pageflip";
import React from "react";
import "./BookPage.css";
import PageSlider from "../PageSlider/PageSlider";

const content =
  " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse rhoncus iaculis vehicula. Mauris mollis orci ut ullamcorper vulputate. Integer sagittis sed mauris non posuere. Nunc consequat, nisi quis iaculis interdum, erat dui viverra dolor, sit amet consectetur orci lectus in est. Fusce id mi ut lorem maximus facilisis eu laoreet tortor. Donec est leo, porttitor a dapibus a, consequat ac tortor. Quisque et massa pulvinar, semper ante id, consequat dui. Morbi at feugiat lorem, sed facilisis nisl. Donec blandit quam dui, quis eleifend dolor posuere sed. Nulla rutrum id magna sit amet lacinia. Cras quis vestibulum ex. Integer ornare massa nibh, sit amet posuere purus sagittis consectetur. Mauris in maximus ligula. Curabitur risus mauris, rutrum vitae orci euismod, hendrerit elementum metus. Cras vehicula, nibh et cursus vestibulum, sapien diam faucibus tortor, tristique dictum erat lorem sit amet nisi. Sed et tincidunt justo, non sollicitudin lorem. Vivamus ut enim faucibus, faucibus quam id, feugiat sem. Sed a sagittis leo. Pellentesque eu semper odio. Maecenas scelerisque laoreet libero, elementum tincidunt elit scelerisque eget. Vestibulum iaculis, ante nec sollicitudin volutpat, augue sem vestibulum lectus, ac dictum nibh ipsum nec ligula. Etiam in urna id erat faucibus pulvinar eget id mi. Donec ac sem nisl. Donec varius massa eu pharetra pretium. Sed lorem orci, tristique id convallis at, efficitur pharetra elit. Suspendisse sagittis nunc eget ullamcorper dapibus. In tincidunt mollis varius. Mauris elementum gravida mi, et rutrum libero rhoncus eget. Duis vel velit dui. Aenean maximus tincidunt enim. Curabitur faucibus lorem vitae ligula tempus, vitae gravida ipsum maximus. Ut efficitur orci vitae purus tincidunt tincidunt. Cras non quam ut nibh rhoncus mollis.";
const content2 =
  "It was a bright cold day in April, and the clocks were striking thirteen. Winston Smith, his chin nuzzled into his breast in an effort to escape the vile wind, slipped quickly through the glass doors of Victory Mansions, though not quickly enough to prevent a swirl of gritty dust from entering along with him. The hallway smelt of boiled cabbage and old rag mats. At one end of it a coloured poster, too large for indoor display, had been tacked to the wall. It depicted simply an enormous face, more than a metre wide: the face of a man of about forty-five, with a heavy black moustache and ruggedly handsome features. Winston made for the stairs. It was no use trying the lift. Even at the best of times it was seldom working, and at present the electric current was cut off during daylight hours. It was part of the economy drive in preparation for Hate Week. The flat was seven flights up, and Winston, who was thirty-nine and had a varicose ulcer above his right ankle, went slowly, resting several times on the way. On each landing, opposite the lift-shaft, the poster with the enormous face gazed from the wall. It was one of those pictures which are so contrived that the eyes follow you about when";
export interface BookType {
  title: string;
  coverImage: string;
  author: string;
  publishDate: Date;
  blurb: string;
  originalContent: string;
  translatedContent: Record<string, string>;
}

interface CoverType {
  title: string;
  coverImage?: string;
  author?: string;
  publishDate?: Date;
  blurb?: string;
}

interface PageType {
  img?: string;
  pageContent: string;
  pageNumber: string;
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

        <div className="page-corner">
          <h5>Page {props.pageNumber}</h5>
        </div>
      </div>
    </div>
  );
});

function BookPage() {
  const [pageNumber, setPageNumber] = React.useState(0);
  const ref = React.useRef(null);


  const flipPage = (pageNumber : number, flipBar : boolean) => {
    if (ref.current != null) {
      setPageNumber(pageNumber)
      if (flipBar) {
        ref.current.pageFlip().flip(pageNumber * 2)
      }
    }
  }

  const flip = (num : number) => { 
    setPageNumber(num/ 2)
  }
  
  const pages = 12 //Set page number based on query?

  const scrollable = Math.ceil((pages/2))

  return (
    <div className="bookPage">
      <div className="header-section">
        <h1>Book Page</h1>
      </div>


      <div id="book">
        <HTMLFlipBook width={500} height={480} size="stretch" drawShadow={true} ref={ref} onFlip={data => {flip(data.data)}}>
          <PageCover title="Hello"></PageCover>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content2} pageNumber="1"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content2} pageNumber="2"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content2} pageNumber="3"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content2} pageNumber="4"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content2} pageNumber="5"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content2} pageNumber="6"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content2} pageNumber="7"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content2} pageNumber="8"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content2} pageNumber="9"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content2} pageNumber="10"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content2} pageNumber="11"></Page>
          <Page img="https://i.imgur.com/5yQqB1T.jpg" pageContent={content2} pageNumber="12"></Page>
        </HTMLFlipBook>
      </div>

      <div className="pageSlider">
        <PageSlider page={pageNumber} maxPages={scrollable} updatePage={flipPage}/>
      </div>
    </div>
  );
}

export default BookPage;
