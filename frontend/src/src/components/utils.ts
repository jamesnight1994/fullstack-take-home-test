import { BookProps, BookType } from "./Book";



export const pages = [
  { path: '/', title: 'Home(Reading List)' },
  { path: '/library', title: 'Library' },
];


export const getBookList = (key: string): BookType[] => {
  const bookList: BookType[] = JSON.parse(localStorage.getItem(key) as string) ?? [];
  return bookList;
}

export const addBookToList = (key: string, item: BookType) => {
  // Get the existing array from localStorage
  const existingArrayJson = localStorage.getItem(key);

  // Parse the existing array, or initialize it as an empty array if it doesn't exist
  let existingArray: BookType[] = existingArrayJson ? JSON.parse(existingArrayJson) : [];

  // Check if the item already exists in the array
  const itemExists = existingArray.some(existingItem => JSON.stringify(existingItem) === JSON.stringify(item));

  // If the item does not exist, add the new item to the array
  if (!itemExists) {
    existingArray.push(item);

    // Convert the updated array back to JSON
    const updatedArrayJson = JSON.stringify(existingArray);

    // Store the updated array back in localStorage
    localStorage.setItem(key, updatedArrayJson);
  }else {
    throw new Error("Book already exists in reading list")
  }
}


export const bookExistsInList = (key: string, book: BookType): boolean => {
  // Get the existing array from localStorage
  const existingArrayJson = localStorage.getItem(key);

  // Parse the existing array, or initialize it as an empty array if it doesn't exist
  let existingArray: BookType[] = existingArrayJson ? JSON.parse(existingArrayJson) : [];

  // Check if the item already exists in the array
  const itemExists = existingArray.some(enlistedBook => {
    return enlistedBook.title === book.title
  });

  return itemExists;
}

export const removeBookFromList = (key: string, book: BookType): boolean => {
  // Get the existing array from localStorage
  const existingArrayJson = localStorage.getItem(key);

  // Parse the existing array, or initialize it as an empty array if it doesn't exist
  let existingArray: BookType[] = existingArrayJson ? JSON.parse(existingArrayJson) : [];

  const index = existingArray.findIndex((enlistedBook) => enlistedBook.title === book.title);

  if (index > -1) {
    existingArray.splice(index, 1);
 }

  localStorage.setItem(key,JSON.stringify(existingArray));
  return true

}