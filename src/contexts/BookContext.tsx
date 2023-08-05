import { Config } from '../config'
import { Book, BookMetadata } from '../services/BookData'
import { FC, ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react'
import { handleResponseError, isAbortError } from '../utils/requestUtils'

interface BookContextType {
  bookMetadata: BookMetadata[]
  currentBook: Book | null
  setCurrentBookId(id: string): void
}

const BookContext = createContext<BookContextType>({
  bookMetadata: [],
  currentBook: null,
  setCurrentBookId: () => {},
})

export const useBookContext = () => useContext(BookContext)

export const BookContextProvider: FC<{
  children?: ReactNode
}> = ({ children }) => {
  const [bookMetadata, setBookMetadata] = useState<BookMetadata[]>([])
  const [currentBookId, setCurrentBookId] = useState<string | null>(null)
  const [currentBook, setCurrentBook] = useState<Book | null>(null)

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

  useEffect(() => {
    if (currentBookId !== null) {
      const controller = new AbortController()
      const signal = controller.signal

      fetch(`${Config.BackendBaseUrl}/api/books/${currentBookId}`, { signal })
        .then((response) => response.json())
        .then((data) => setCurrentBook(data))
        .catch(handleResponseError)

      return () => controller.abort()
    }
  }, [currentBookId])

  const handleSetCurrentId = useCallback((id: string): void => {
    setCurrentBook(null)
    setCurrentBookId(id)
  }, [])

  const contextValue: BookContextType = {
    bookMetadata,
    currentBook,
    setCurrentBookId: handleSetCurrentId,
  }

  return <BookContext.Provider value={contextValue}>{children}</BookContext.Provider>
}
