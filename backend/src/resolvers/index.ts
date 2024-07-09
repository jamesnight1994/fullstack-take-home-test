import { booksData } from '../data/books';

export const resolvers = {
  Query: {
    books: (_: any, args: {
      readingLevel: string,
      limit?: number,
      offset?: number
    }) => {
      const { readingLevel, limit = booksData.length, offset = 0 } = args;
      const books = booksData.filter((book => book.readingLevel == readingLevel))
        .slice(offset, offset + limit);

      const total = booksData.filter((book => book.readingLevel == readingLevel)).length;
      return {
        total: total,
        books: books
      }
    },

    total: () => {
      return booksData.length
    },

    searchBooks: (_: any, args: {
      searchTerm: string,
      limit?: number,
      offset?: number
    }) => {
      const { searchTerm, limit = booksData.length, offset = 0 } = args;
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const filteredBooks = booksData.filter(book =>
        book.title.toLowerCase().includes(lowerCaseSearchTerm)
      );
      console.info(filteredBooks)
      return filteredBooks.slice(offset, offset + limit);
    },

    readingLevels: () => {
      const readingLevels = new Set();
      booksData.forEach((book) => readingLevels.add(book.readingLevel));
      return readingLevels;
    }
  },
};
