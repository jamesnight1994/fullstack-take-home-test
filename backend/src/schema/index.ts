export const typeDefs = `
  type Book {
    title: String
    author: String
    coverPhotoURL: String
    readingLevel: String
  }

  type BookResponse {
    total: Int
    books: [Book]
  }


  type Query {
    books(readingLevel: String,limit: Int, offset: Int): BookResponse
    total: Int
    searchBooks(searchTerm: String!, limit: Int, offset: Int): [Book]
    readingLevels: [String]
  }
`;
