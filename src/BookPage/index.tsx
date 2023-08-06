import HTMLFlipBook from 'react-pageflip'
import React, { useRef, useState } from 'react'
import './BookPage.css'
import { Link, useParams } from 'react-router-dom'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { Language } from '../services/BookData'
import PageSlider from '../PageSlider/PageSlider'
import HistorySlider from '../HistorySlider/HistorySlider'
import Page from './Page'
import PageCover from './PageCover'
import { useBook } from '../hooks/useBook'
import { IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import GenericError from '../GenericError'

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

const formatBase64Image = (image: string): string => {
  return `data:image/jpeg;base64,${image}`
}

const BookPage = () => {
  const { id } = useParams()
  const [isLoading, error, book] = useBook(id)
  const [lang, setLang] = useState<Language>('english')
  const [fontFamily, setFontFamily] = useState<string>('chillax')

  // Page slider
  const [pageNumber, setPageNumber] = React.useState(0)
  const ref = useRef<any>(null)

  function mapLanguage(value: number): Language {
    switch (value) {
      case 0:
        return 'unown' as Language
      case 50:
        return '15' as Language
      case 100:
        return 'english' as Language
      default:
        return 'image' as Language
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

  if (book === null || isLoading) {
    return (
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true} onClick={() => {}}>
        {isLoading && <CircularProgress color="inherit" />}
        {error !== null && <GenericError />}
      </Backdrop>
    )
  }

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

  const pages = book.content.english.length

  const scrollable = Math.ceil(pages / 2)

  return (
    <>
      <div className="bookPage">
        <div className="header-section">
          <Link to="/">
            <IconButton aria-label="Back" size="large" sx={{ color: 'white' }}>
              <ArrowBackIcon />
            </IconButton>
          </Link>
          <HistorySlider defaultValue={100} onSliderChange={handleSliderChange}></HistorySlider>
        </div>

        <div id="book" style={{ fontFamily: '' }}>
          {/* @ts-ignore */}
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
                  image={imageBase64}
                  content={pageContent}
                  pageNumber={index + 1}
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
    </>
  )
}

export default BookPage
