import { booksData } from '../data/books';

export const resolvers = {
  Query: {
    books: (_: any, args: { limit?: number; offset?: number }) => {
      const { limit = booksData.length, offset = 0 } = args;
      return booksData.slice(offset, offset + limit);
    },

    total: () => {
      return booksData.length
    },
    searchBooks: (_: any, args: { searchTerm: string, limit?: number, offset?: number }) => {
      const { searchTerm, limit = booksData.length, offset = 0 } = args;
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const filteredBooks = booksData.filter(book =>
        book.title.toLowerCase().includes(lowerCaseSearchTerm) 
      );
      console.info(filteredBooks)
      return filteredBooks.slice(offset, offset + limit);
    }
  },
};
