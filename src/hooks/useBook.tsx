import { useEffect, useState } from 'react'
import { Book } from '../services/BookData'
import { Config } from '../config'
import { isAbortError } from '../utils/requestUtils'
import { useBookContext } from '../contexts/BookContext'

export const useBook = (bookId?: string) => {
  const { getBook, insertBook } = useBookContext()
  const [error, setError] = useState<unknown | null>(null)
  const [book, setBook] = useState<Book | null>(null)

  useEffect(() => {
    if (bookId !== undefined && (book === null || book._id !== bookId)) {
      setError(null)

      const cachedBook = getBook(bookId)
      if (cachedBook) {
        setBook(cachedBook)
        return
      }

      const controller = new AbortController()
      const signal = controller.signal

      fetch(`${Config.BackendBaseUrl}/api/books/${bookId}`, { signal })
        .then((response) => response.json())
        .then((data) => {
          setBook(data)
          insertBook(data)
        })
        .catch((err) => {
          if (!isAbortError(err)) {
            setError(err)
          }
        })

      return () => controller.abort()
    }
  }, [book, bookId, getBook, insertBook])

  const isLoading = error === null && book?._id !== bookId

  return [isLoading, error, book] as const
}
