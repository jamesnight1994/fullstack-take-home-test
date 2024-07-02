export const typeDefs = `
  type Book {
    title: String
    author: String
    coverPhotoURL: String
    readingLevel: String
  }

  type BookResponse {
    count: Int
    books: [Book]
  }


  type Query {
    books(limit: Int, offset: Int): [Book]
    total: Int
    searchBooks(searchTerm: String!, limit: Int, offset: Int): [Book]
  }
`;
