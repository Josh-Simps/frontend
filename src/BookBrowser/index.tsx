import React from 'react'
import './BookBrowser.css'
import { useBookContext } from '../contexts/BookContext'
import { useNavigate } from 'react-router-dom'
import narutoMetadata from './mock.json'

export interface BrowserProp {
  title: string
  blurb: string
}

export interface BookProp {
  title: string
  coverImage?: string
  author: string
  onClick: () => void
}

const BrowserHeader = React.forwardRef<HTMLDivElement, BrowserProp>((props, ref) => {
  return (
    <div ref={ref} className="header">
      <div>
        <h1>{props.title}</h1>
        <h4>{props.blurb}</h4>
      </div>
    </div>
  )
})

const Book = React.forwardRef<HTMLDivElement, BookProp>((props, ref) => {
  return (
    <div className="book" ref={ref} data-density="hard">
      <div>
        <img className="book-image" src={props.coverImage} onClick={props.onClick}></img>
        <h1>{props.title}</h1>
        <h4>{props.author}</h4>
      </div>
    </div>
  )
})

const BrowserMain = () => {
  const naviate = useNavigate()
  const bookMetadata = useBookContext()
  return (
    <div className="bookBrowser">
      <BrowserHeader title={'Welcome Back!'} blurb={'What would you like to read today?'} />
      <div className="shelf">
        {bookMetadata.bookMetadata.length === 0 ? (
          <h1 style={{ textAlign: 'center' }}>Loading...</h1>
        ) : (
          <>
            {bookMetadata.bookMetadata.concat(narutoMetadata).map((metadata) => (
              <Book
                key={metadata._id}
                title={metadata.title}
                coverImage={metadata.coverImage}
                author={metadata.author}
                onClick={() => {
                  if (metadata._id === 'naruto') {
                    naviate(`/manga`)
                  } else {
                    naviate(`/book/${metadata._id}`)
                  }
                }}
              />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default BrowserMain
