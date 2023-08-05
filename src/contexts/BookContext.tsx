import { Config } from '../config'
import { BookMetadata } from '../services/BookData'
import { FC, ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { isAbortError } from '../utils/requestUtils'

interface BookContextType {
  bookMetadata: BookMetadata[]
}

const BookContext = createContext<BookContextType>({
  bookMetadata: [],
})

export const useBookContext = () => useContext(BookContext)

export const BookContextProvider: FC<{
  children?: ReactNode
}> = ({ children }) => {
  const [bookMetadata, setBookMetadata] = useState<BookMetadata[]>([])

  useEffect(() => {
    if (bookMetadata.length === 0) {
      const controller = new AbortController()
      const signal = controller.signal

      fetch(`${Config.BackendBaseUrl}/api/books`, { signal })
        .then((response) => response.json())
        .then((data) => setBookMetadata(data))
        .catch((err) => {
          if (!isAbortError(err)) {
            console.error(err)
          }
        })

      return () => controller.abort()
    }
  }, [bookMetadata])

  const contextValue: BookContextType = {
    bookMetadata,
  }

  return <BookContext.Provider value={contextValue}>{children}</BookContext.Provider>
}
