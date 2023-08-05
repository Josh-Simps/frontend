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
      fetch(`${Config.BackendBaseUrl}/api/books`)
        .then((response) => response.json())
        .then((data) => setBookMetadata(data))
        .catch(console.error)
    }
  }, [bookMetadata])

  const contextValue: BookContextType = {
    bookMetadata,
  }

  return <BookContext.Provider value={contextValue}>{children}</BookContext.Provider>
}
