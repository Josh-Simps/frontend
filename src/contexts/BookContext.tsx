import { Config } from '../config'
import { BookMetadata } from '../services/BookData'
import { FC, ReactNode, createContext, useEffect, useState } from 'react'

interface BookContextType {
  bookMetadata: BookMetadata[]
}

const BookContext = createContext<BookContextType>({
  bookMetadata: [],
})

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
          if (err instanceof DOMException && err.name === 'AbortError') return
          console.error(err)
        })

      return () => controller.abort()
    }
  }, [bookMetadata])

  const contextValue: BookContextType = {
    bookMetadata,
  }

  return <BookContext.Provider value={contextValue}>{children}</BookContext.Provider>
}
