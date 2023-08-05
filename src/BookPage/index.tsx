import HTMLFlipBook from 'react-pageflip'
import React, { useEffect, useState } from 'react'
import './BookPage.css'
import { useParams } from 'react-router-dom'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { useBookContext } from '../contexts/BookContext'
import { Book, Language } from '../services/BookData'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

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
}

interface PageType {
  img: string
  pageContent: string
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

const formatBase64Image = (image: string): string => {
  return `data:image/jpeg;base64,${image}`
}

const BookPage = (props) => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const { setCurrentBookId, currentBook } = useBookContext()
  const [lang, setLang] = useState<Language>('english')
  console.log('id', id)

  const handleChange = (event: SelectChangeEvent) => {
    setLang(event.target.value as Language)
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

  return (
    <>
      <div className="bookPage">
        <div className="header-section">
          <div id="top-left">
            <button>←</button>
          </div>
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
            </Select>
          </FormControl>
        </div>

        <div id="book">
          <HTMLFlipBook width={500} height={480} size="stretch" drawShadow={true}>
            <PageCover coverImage={book.coverImage} author={book.author} title={book.title}></PageCover>

            {book.content[lang].map((pageContent, index) => {
              const imageBase64 = formatBase64Image(book.content['images'][index])

              return (
                <Page
                  key={index}
                  img={imageBase64}
                  pageContent={pageContent}
                  pageNumber={(index + 1).toString()}
                ></Page>
              )
            })}
          </HTMLFlipBook>
        </div>
      </div>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} onClick={() => {}}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}

export default BookPage
