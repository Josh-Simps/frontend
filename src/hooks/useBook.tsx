import { useEffect, useState } from 'react'
import { Book } from '../services/BookData'
import { Config } from '../config'
import { isAbortError } from '../utils/requestUtils'

export const useBook = (bookId?: string) => {
  const [error, setError] = useState<unknown | null>(null)
  const [book, setBook] = useState<Book | null>(null)

  useEffect(() => {
    if (bookId !== undefined && (book === null || book._id !== bookId)) {
      const controller = new AbortController()
      const signal = controller.signal

      setError(null)
      fetch(`${Config.BackendBaseUrl}/api/books/${bookId}`, { signal })
        .then((response) => response.json())
        .then((data) => setBook(data))
        .catch((err) => {
          if (!isAbortError(err)) {
            setError(err)
          }
        })

      return () => controller.abort()
    }
  }, [book, bookId])

  const isLoading = error === null && book?._id !== bookId

  return [isLoading, error, book] as const
}
