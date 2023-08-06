import HTMLFlipBook from 'react-pageflip'
import React, { useRef, useState } from 'react'
import './BookPage.css'
import { Link, useParams } from 'react-router-dom'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { Language } from '../services/BookData'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import PageSlider from '../PageSlider/PageSlider'
import Page from './Page'
import PageCover from './PageCover'
import { useBook } from '../hooks/useBook'
import { Alert, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

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
  const ref = useRef(null)

  const handleChange = (event: SelectChangeEvent) => {
    const selectValue = event.target.value as Language
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
        {error !== null && <Alert severity="error">There was an error loading the book sorry!</Alert>}
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
            <IconButton aria-label="Back" size="large">
              <ArrowBackIcon />
            </IconButton>
          </Link>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Language</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={lang}
              onChange={handleChange}
              label="Language"
            >
              <MenuItem value={'english'}>English</MenuItem>
              <MenuItem value={'15'}>15th Century English</MenuItem>
              <MenuItem value={'unown'}>Symbols</MenuItem>
            </Select>
          </FormControl>
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
                  image={imageBase64}
                  content={pageContent}
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
    </>
  )
}

export default BookPage
