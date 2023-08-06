import { Config } from '../config'
import { Book, BookMetadata } from '../services/BookData'
import { FC, ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react'
import { handleResponseError } from '../utils/requestUtils'

interface BookContextType {
  bookMetadata: BookMetadata[]
  insertBook(book: Book): void
  getBook(bookId: string): Book | null
}

const BookContext = createContext<BookContextType>({
  bookMetadata: [],
  insertBook: () => {},
  getBook: () => null,
})

export const useBookContext = () => useContext(BookContext)

export const BookContextProvider: FC<{
  children?: ReactNode
}> = ({ children }) => {
  const [bookMetadata, setBookMetadata] = useState<BookMetadata[]>([])
  const [books, setBooks] = useState<Record<string, Book>>({})

  useEffect(() => {
    if (bookMetadata.length === 0) {
      const controller = new AbortController()
      const signal = controller.signal

      fetch(`${Config.BackendBaseUrl}/api/books`, { signal })
        .then((response) => response.json())
        .then((data) => setBookMetadata(data))
        .catch(handleResponseError)

      return () => controller.abort()
    }
  }, [bookMetadata])

  const getBook = useCallback(
    (bookId: string) => {
      return books[bookId] ?? null
    },
    [books]
  )

  const insertBook = useCallback((book: Book) => {
    setBooks((books) => ({ ...books, [book._id]: book }))
  }, [])

  const contextValue: BookContextType = {
    bookMetadata,
    getBook,
    insertBook,
  }

  return <BookContext.Provider value={contextValue}>{children}</BookContext.Provider>
}
