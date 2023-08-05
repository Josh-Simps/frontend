import { BookData, BookType} from './BookData';
import { createContext, useEffect, useState } from 'react';

export const BookContext = createContext<BookType | null>(null);

export const BookContextData: React.FC = () => {
    const [book, setBooks] = useState<BookData[]>([]);
  
    useEffect(() => {
      fetch('/data.json')
        .then((response) => response.json())
        .then((data) => setBooks(data))
        .catch((error) => console.error('Error fetching data:', error));
    }, []);
  
    const contextValue: BookType = {
      book,
    };
  
    return <BookContext.Provider value={contextValue}>{}</BookContext.Provider>;
  };
