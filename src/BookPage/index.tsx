import HTMLFlipBook from 'react-pageflip'
import React, { useEffect, useRef, useState } from 'react'
import './BookPage.css'
import { useNavigate, useParams } from 'react-router-dom'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { useBookContext } from '../contexts/BookContext'
import { Book, Language } from '../services/BookData'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import PageSlider from '../PageSlider/PageSlider'
import HistorySlider from '../HistorySlider/HistorySlider'

export interface BookType {
  title: string
  coverImage: string
  author: string
  publishDate: Date
  blurb: string
  content: {
    15: string[]
    english: string[]
    images: string[]
  }
}

interface CoverType {
  title: string
  coverImage?: string
  author?: string
  publishDate?: Date
  blurb?: string
  fontFamily: string
}

interface PageType {
  img: string
  pageContent: string
  pageNumber: string
  fontFamily: string
}

const PageCover = React.forwardRef<HTMLDivElement, CoverType>((props, ref) => {
  console.log(props.fontFamily)
  return (
    <div className="page page-cover" ref={ref}>
      <div className="page-content" style={{ fontFamily: props.fontFamily }}>
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
      <div className="page-content" style={{ fontFamily: props.fontFamily }}>
        <img src={props.img}></img>
        <h5>{props.pageContent}</h5>

        <div className="page-corner">
          <h5>{props.pageNumber}</h5>
        </div>
      </div>
    </div>
  )
})

const formatBase64Image = (image: string): string => {
  return `data:image/jpeg;base64,${image}`
}

const BookPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const { setCurrentBookId, currentBook } = useBookContext()
  const [lang, setLang] = useState<Language>('english')
  const [fontFamily, setFontFamily] = useState<string>('chillax')

  // Page slider
  const [pageNumber, setPageNumber] = React.useState(0)
  const ref = useRef(null)

  function mapLanguage(value:number): Language{
    switch (value) {
      case 0:
        return "unown" as Language
      case 50:
        return "15" as Language
      case 100:
        return "english" as Language
      default:
        return "image" as Language
    }
  }

  const handleSliderChange = (value: number) => {
    const selectValue = mapLanguage(value)
    setLang(selectValue)
    if (selectValue === 'unown') {
      setFontFamily('unown')
    } else {
      setFontFamily('chillax')
    }
  }

  useEffect(() => {
    setCurrentBookId(id as string)
  }, [id, setCurrentBookId])

  useEffect(() => {
    if (currentBook != null) {
      console.log(currentBook)
      setLoading(false)
    }
  }, [currentBook])

  if (currentBook == null) {
    return (
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} onClick={() => {}}>
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }

  const book = currentBook as Book

  const flipPage = (pageNumber: number, flipBar: boolean) => {
    if (ref.current != null) {
      setPageNumber(pageNumber)
      if (flipBar) {
        ref.current.pageFlip().flip(pageNumber * 2)
      }
    }
  }

  const flip = (num: number) => {
    setPageNumber(num / 2)
  }

  const pages = currentBook.content.english.length

  const scrollable = Math.ceil(pages / 2)

  return (
    <>
      <div className="bookPage">
        <div className="header-section">
          <div id="top-left">
            <button
              onClick={() => {
                navigate('/browser')
              }}
            >
              ←
            </button>
          </div>
          <HistorySlider defaultValue={100} onSliderChange={handleSliderChange}></HistorySlider>

        </div>

        <div id="book" style={{ fontFamily: '' }}>
          <HTMLFlipBook
            width={500}
            height={480}
            size="stretch"
            drawShadow={true}
            ref={ref}
            onFlip={(data) => {
              flip(data.data)
            }}
          >
            <PageCover coverImage={book.coverImage} author={book.author} title={book.title} fontFamily={fontFamily} />

            {book.content[lang === 'unown' ? 'english' : lang].map((pageContent, index) => {
              const imageBase64 = formatBase64Image(book.content['images'][index])

              return (
                <Page
                  key={index}
                  img={imageBase64}
                  pageContent={pageContent}
                  pageNumber={(index + 1).toString()}
                  fontFamily={fontFamily}
                />
              )
            })}
          </HTMLFlipBook>
        </div>
        <div className="pageSlider">
          <PageSlider page={pageNumber} maxPages={scrollable} updatePage={flipPage} />
        </div>
      </div>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} onClick={() => {}}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}

export default BookPage
