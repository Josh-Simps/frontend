import HTMLFlipBook from 'react-pageflip'
import React, { useEffect, useRef, useState } from 'react'
import './MangaPage.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { Book, Language } from '../services/BookData'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'  
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PageSlider from '../PageSlider/PageSlider'
import Page from './Page'
import currentBookJson from './mock.json'
import { IconButton } from '@mui/material'
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

const formatBase64Image = (image: string): string => {
  if (image.startsWith('data:image/jpeg;base64') || image.startsWith('data:image/png;base64')) {
    return image
  }
  return `data:image/jpeg;base64,${image}`
}

const MangaPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  const [currentBook] = useState<Book>(currentBookJson)
  const [lang, setLang] = useState<Language>('english')

  // Page slider
  const [pageNumber, setPageNumber] = React.useState(0)
  const ref = useRef(null)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  const handleChange = (event: SelectChangeEvent) => {
    const selectValue = event.target.value as Language
    setLang(selectValue)
  }

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
  }

  if (loading) {
    return (
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true} onClick={() => {}}>
        {loading && <CircularProgress color="inherit" />}
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
      <div className="mangaPage">
        <div className="manga-header-section" style={{marginBottom: "0vh"}}>
          <div id="top-left">
            <Link to="/">
              <IconButton aria-label="Back" size="large" sx={{ color: '#FD943D', height: "55px", backgroundColor: "#111"}}>
                <ArrowBackIcon />
              </IconButton>
            </Link>
           
          </div>
          <div style={{backgroundColor: "rgba(0,0,0,0.8)", padding: "2vh 7vw 0 7vw", borderRadius: "10px"}}>
            <HistorySlider defaultValue={100} onSliderChange={handleSliderChange}></HistorySlider>
          </div>
        </div>

        <div id="book">
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
            {book.content[lang === 'unown' ? 'english' : lang].map((pageContent, index) => {
              const imageBase64 = formatBase64Image(pageContent)

              return (
                <Page key={index} image={imageBase64} pageNumber={(index === 0 ? '' : index.toString()).toString()} />
              )
            })}
          </HTMLFlipBook>
        </div>
        <div className="manga-pageSlider">
          <PageSlider page={pageNumber} maxPages={scrollable} updatePage={flipPage} />
        </div>
      </div>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} onClick={() => {}}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}

export default MangaPage
