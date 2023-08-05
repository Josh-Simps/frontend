export interface BookData {
    id: number,
    title: string;
    image: string;
    author: string;
    publishDate: string;
    blurb: string;
    content: Content;
}

export interface Content {
    english: string[];
    "15": string[];
    images: string[];
}

export type BookType = {
    book: BookData[];
  };